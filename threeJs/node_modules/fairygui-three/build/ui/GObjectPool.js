import { UIPackage } from "./UIPackage";
export class GObjectPool {
    constructor() {
        this._count = 0;
        this._pool = {};
    }
    clear() {
        for (var i1 in this._pool) {
            var arr = this._pool[i1];
            arr.forEach(obj => obj.dispose());
        }
        this._pool = {};
        this._count = 0;
    }
    get count() {
        return this._count;
    }
    getObject(url) {
        url = UIPackage.normalizeURL(url);
        if (url == null)
            return null;
        var arr = this._pool[url];
        if (arr && arr.length > 0) {
            this._count--;
            return arr.shift();
        }
        return UIPackage.createObjectFromURL(url);
    }
    returnObject(obj) {
        var url = obj.resourceURL;
        if (!url)
            return;
        var arr = this._pool[url];
        if (!arr) {
            arr = [];
            this._pool[url] = arr;
        }
        this._count++;
        arr.push(obj);
    }
}
