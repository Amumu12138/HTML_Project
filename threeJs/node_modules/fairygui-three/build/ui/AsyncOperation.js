import { ObjectType, PackageItemType } from "./FieldTypes";
import { constructingDepth } from "./GObject";
import { UIConfig } from "./UIConfig";
import { UIObjectFactory } from "./UIObjectFactory";
import { UIPackage } from "./UIPackage";
import { Timers } from "../utils/Timers";
export class AsyncOperation {
    constructor() {
        this._itemList = new Array();
        this._objectPool = [];
    }
    createObject(pkgName, resName) {
        var pkg = UIPackage.getByName(pkgName);
        if (pkg) {
            var pi = pkg.getItemByName(resName);
            if (!pi)
                throw new Error("resource not found: " + resName);
            this.internalCreateObject(pi);
        }
        else
            throw new Error("package not found: " + pkgName);
    }
    createObjectFromURL(url) {
        var pi = UIPackage.getItemByURL(url);
        if (pi)
            this.internalCreateObject(pi);
        else
            throw new Error("resource not found: " + url);
    }
    cancel() {
        Timers.remove(this.run, this);
        this._itemList.length = 0;
        if (this._objectPool.length > 0) {
            var cnt = this._objectPool.length;
            for (var i = 0; i < cnt; i++) {
                this._objectPool[i].dispose();
            }
            this._objectPool.length = 0;
        }
    }
    internalCreateObject(item) {
        this._itemList.length = 0;
        this._objectPool.length = 0;
        var di = new DisplayListItem(item, ObjectType.Component);
        di.childCount = this.collectComponentChildren(item);
        this._itemList.push(di);
        this._index = 0;
        Timers.addUpdate(this.run, this);
    }
    collectComponentChildren(item) {
        var buffer = item.rawData;
        buffer.seek(0, 2);
        var di;
        var pi;
        var i;
        var dataLen;
        var curPos;
        var pkg;
        var dcnt = buffer.readShort();
        for (i = 0; i < dcnt; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.pos;
            buffer.seek(curPos, 0);
            var type = buffer.readByte();
            var src = buffer.readS();
            var pkgId = buffer.readS();
            buffer.pos = curPos;
            if (src != null) {
                if (pkgId != null)
                    pkg = UIPackage.getById(pkgId);
                else
                    pkg = item.owner;
                pi = pkg != null ? pkg.getItemById(src) : null;
                di = new DisplayListItem(pi, type);
                if (pi != null && pi.type == PackageItemType.Component)
                    di.childCount = this.collectComponentChildren(pi);
            }
            else {
                di = new DisplayListItem(null, type);
                if (type == ObjectType.List) //list
                    di.listItemCount = this.collectListChildren(buffer);
            }
            this._itemList.push(di);
            buffer.pos = curPos + dataLen;
        }
        return dcnt;
    }
    collectListChildren(buffer) {
        buffer.seek(buffer.pos, 8);
        var listItemCount = 0;
        var i;
        var nextPos;
        var url;
        var pi;
        var di;
        var defaultItem = buffer.readS();
        var itemCount = buffer.readShort();
        for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            url = buffer.readS();
            if (url == null)
                url = defaultItem;
            if (url) {
                pi = UIPackage.getItemByURL(url);
                if (pi != null) {
                    di = new DisplayListItem(pi, pi.objectType);
                    if (pi.type == PackageItemType.Component)
                        di.childCount = this.collectComponentChildren(pi);
                    this._itemList.push(di);
                    listItemCount++;
                }
            }
            buffer.pos = nextPos;
        }
        return listItemCount;
    }
    run() {
        var obj;
        var di;
        var poolStart;
        var k;
        var t = performance.now();
        var frameTime = UIConfig.frameTimeForAsyncUIConstruction;
        var totalItems = this._itemList.length;
        while (this._index < totalItems) {
            di = this._itemList[this._index];
            if (di.packageItem != null) {
                obj = UIObjectFactory.newObject(di.packageItem);
                this._objectPool.push(obj);
                constructingDepth.n++;
                if (di.packageItem.type == PackageItemType.Component) {
                    poolStart = this._objectPool.length - di.childCount - 1;
                    obj.constructFromResource2(this._objectPool, poolStart);
                    this._objectPool.splice(poolStart, di.childCount);
                }
                else {
                    obj.constructFromResource();
                }
                constructingDepth.n--;
            }
            else {
                obj = UIObjectFactory.newObject(di.type);
                this._objectPool.push(obj);
                if (di.type == ObjectType.List && di.listItemCount > 0) {
                    poolStart = this._objectPool.length - di.listItemCount - 1;
                    for (k = 0; k < di.listItemCount; k++) //把他们都放到pool里，这样GList在创建时就不需要创建对象了
                        obj.itemPool.returnObject(this._objectPool[k + poolStart]);
                    this._objectPool.splice(poolStart, di.listItemCount);
                }
            }
            this._index++;
            if ((this._index % 5 == 0) && performance.now() - t >= frameTime)
                return;
        }
        Timers.remove(this.run, this);
        var result = this._objectPool[0];
        this._itemList.length = 0;
        this._objectPool.length = 0;
        if (this.callback != null)
            this.callback(result);
    }
}
class DisplayListItem {
    constructor(packageItem, type) {
        this.packageItem = packageItem;
        this.type = type;
    }
}
