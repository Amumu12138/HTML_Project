import { Vector2 } from "three";
import { DisplayObject } from "../core/DisplayObject";
import { Rect } from "../utils/Rect";
import { Timers } from "../utils/Timers";
import { clamp } from "../utils/ToolSet";
import { Controller } from "./Controller";
import { ChildrenRenderOrder, ObjectType, OverflowType } from "./FieldTypes";
import { GGroup } from "./GGroup";
import { GObject } from "./GObject";
import { Margin } from "./Margin";
import { ScrollPane } from "./ScrollPane";
import { Transition } from "./Transition";
import { TranslationHelper } from "./TranslationHelper";
import { UIPackage, Decls } from "./UIPackage";
import { PixelHitTest } from "../core/hittest/PixelHitTest";
import { ShapeHitTest } from "../core/hittest/ShapeHitTest";
export class GComponent extends GObject {
    constructor() {
        super();
        this._sortingChildCount = 0;
        this._children = [];
        this._controllers = [];
        this._transitions = [];
        this._margin = new Margin();
        this._alignOffset = new Vector2();
        this._childrenRenderOrder = 0;
        this._apexIndex = 0;
    }
    createDisplayObject() {
        super.createDisplayObject();
        this._container = new DisplayObject();
        this._displayObject = this._container;
    }
    dispose() {
        var i;
        var cnt;
        cnt = this._transitions.length;
        for (i = 0; i < cnt; ++i) {
            var trans = this._transitions[i];
            trans.dispose();
        }
        cnt = this._controllers.length;
        for (i = 0; i < cnt; ++i) {
            var cc = this._controllers[i];
            cc.dispose();
        }
        if (this.scrollPane)
            this.scrollPane.dispose();
        cnt = this._children.length;
        for (i = cnt - 1; i >= 0; --i) {
            var obj = this._children[i];
            obj.parent = null; //avoid removeFromParent call
            obj.dispose();
        }
        this._boundsChanged = false;
        super.dispose();
    }
    get displayListContainer() {
        return this._container;
    }
    addChild(child) {
        this.addChildAt(child, this._children.length);
        return child;
    }
    addChildAt(child, index) {
        if (!child)
            throw "child is null";
        if (index >= 0 && index <= this._children.length) {
            if (child.parent == this) {
                this.setChildIndex(child, index);
            }
            else {
                child.removeFromParent();
                child.parent = this;
                var cnt = this._children.length;
                if (child.sortingOrder != 0) {
                    this._sortingChildCount++;
                    index = this.getInsertPosForSortingChild(child);
                }
                else if (this._sortingChildCount > 0) {
                    if (index > (cnt - this._sortingChildCount))
                        index = cnt - this._sortingChildCount;
                }
                if (index == cnt)
                    this._children.push(child);
                else
                    this._children.splice(index, 0, child);
                this.childStateChanged(child);
                this.setBoundsChangedFlag();
            }
            return child;
        }
        else {
            throw "Invalid child index";
        }
    }
    getInsertPosForSortingChild(target) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; i++) {
            var child = this._children[i];
            if (child == target)
                continue;
            if (target.sortingOrder < child.sortingOrder)
                break;
        }
        return i;
    }
    removeChild(child, dispose) {
        var childIndex = this._children.indexOf(child);
        if (childIndex != -1) {
            this.removeChildAt(childIndex, dispose);
        }
        return child;
    }
    removeChildAt(index, dispose) {
        if (index >= 0 && index < this._children.length) {
            var child = this._children[index];
            child.parent = null;
            if (child.sortingOrder != 0)
                this._sortingChildCount--;
            this._children.splice(index, 1);
            child.group = null;
            if (child.displayObject.parent) {
                this._container.removeChild(child.displayObject);
                if (this._childrenRenderOrder == ChildrenRenderOrder.Arch)
                    Timers.callLater(this.buildNativeDisplayList, this);
            }
            if (dispose)
                child.dispose();
            this.setBoundsChangedFlag();
            return child;
        }
        else {
            throw "Invalid child index";
        }
    }
    removeChildren(beginIndex, endIndex, dispose) {
        beginIndex = beginIndex || 0;
        if (endIndex == null)
            endIndex = -1;
        if (endIndex < 0 || endIndex >= this._children.length)
            endIndex = this._children.length - 1;
        for (var i = beginIndex; i <= endIndex; ++i)
            this.removeChildAt(beginIndex, dispose);
    }
    getChildAt(index) {
        if (index >= 0 && index < this._children.length)
            return this._children[index];
        else
            throw "Invalid child index";
    }
    getChild(name) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            if (this._children[i].name == name)
                return this._children[i];
        }
        return null;
    }
    getChildByPath(path) {
        var arr = path.split(".");
        var cnt = arr.length;
        var gcom = this;
        var obj;
        for (var i = 0; i < cnt; ++i) {
            obj = gcom.getChild(arr[i]);
            if (!obj)
                break;
            if (i != cnt - 1) {
                if (!(obj instanceof GComponent)) {
                    obj = null;
                    break;
                }
                else
                    gcom = obj;
            }
        }
        return obj;
    }
    getVisibleChild(name) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (child.internalVisible && child.internalVisible2 && child.name == name)
                return child;
        }
        return null;
    }
    getChildInGroup(name, group) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (child.group == group && child.name == name)
                return child;
        }
        return null;
    }
    getChildById(id) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            if (this._children[i]._id == id)
                return this._children[i];
        }
        return null;
    }
    getChildIndex(child) {
        return this._children.indexOf(child);
    }
    setChildIndex(child, index) {
        var oldIndex = this._children.indexOf(child);
        if (oldIndex == -1)
            throw "Not a child of this container";
        if (child.sortingOrder != 0) //no effect
            return;
        var cnt = this._children.length;
        if (this._sortingChildCount > 0) {
            if (index > (cnt - this._sortingChildCount - 1))
                index = cnt - this._sortingChildCount - 1;
        }
        this._setChildIndex(child, oldIndex, index);
    }
    setChildIndexBefore(child, index) {
        var oldIndex = this._children.indexOf(child);
        if (oldIndex == -1)
            throw "Not a child of this container";
        if (child.sortingOrder != 0) //no effect
            return oldIndex;
        var cnt = this._children.length;
        if (this._sortingChildCount > 0) {
            if (index > (cnt - this._sortingChildCount - 1))
                index = cnt - this._sortingChildCount - 1;
        }
        if (oldIndex < index)
            return this._setChildIndex(child, oldIndex, index - 1);
        else
            return this._setChildIndex(child, oldIndex, index);
    }
    _setChildIndex(child, oldIndex, index) {
        var cnt = this._children.length;
        if (index > cnt)
            index = cnt;
        if (oldIndex == index)
            return oldIndex;
        this._children.splice(oldIndex, 1);
        this._children.splice(index, 0, child);
        if (child.displayObject.parent) {
            var displayIndex = 0;
            var g;
            var i;
            if (this._childrenRenderOrder == ChildrenRenderOrder.Ascent) {
                for (i = 0; i < index; i++) {
                    g = this._children[i];
                    if (g.displayObject.parent)
                        displayIndex++;
                }
                if (displayIndex == this._container.numChildren)
                    displayIndex--;
                this._container.setChildIndex(child.displayObject, displayIndex);
            }
            else if (this._childrenRenderOrder == ChildrenRenderOrder.Descent) {
                for (i = cnt - 1; i > index; i--) {
                    g = this._children[i];
                    if (g.displayObject.parent)
                        displayIndex++;
                }
                if (displayIndex == this._container.numChildren)
                    displayIndex--;
                this._container.setChildIndex(child.displayObject, displayIndex);
            }
            else {
                Timers.callLater(this.buildNativeDisplayList, this);
            }
            this.setBoundsChangedFlag();
        }
        return index;
    }
    swapChildren(child1, child2) {
        var index1 = this._children.indexOf(child1);
        var index2 = this._children.indexOf(child2);
        if (index1 == -1 || index2 == -1)
            throw "Not a child of this container";
        this.swapChildrenAt(index1, index2);
    }
    swapChildrenAt(index1, index2) {
        var child1 = this._children[index1];
        var child2 = this._children[index2];
        this.setChildIndex(child1, index2);
        this.setChildIndex(child2, index1);
    }
    get numChildren() {
        return this._children.length;
    }
    isAncestorOf(child) {
        if (child == null)
            return false;
        var p = child.parent;
        while (p) {
            if (p == this)
                return true;
            p = p.parent;
        }
        return false;
    }
    addController(controller) {
        this._controllers.push(controller);
        controller.parent = this;
        this.applyController(controller);
    }
    getControllerAt(index) {
        return this._controllers[index];
    }
    getController(name) {
        var cnt = this._controllers.length;
        for (var i = 0; i < cnt; ++i) {
            var c = this._controllers[i];
            if (c.name == name)
                return c;
        }
        return null;
    }
    removeController(c) {
        var index = this._controllers.indexOf(c);
        if (index == -1)
            throw new Error("controller not exists");
        c.parent = null;
        this._controllers.splice(index, 1);
        var length = this._children.length;
        for (var i = 0; i < length; i++) {
            var child = this._children[i];
            child.handleControllerChanged(c);
        }
    }
    get controllers() {
        return this._controllers;
    }
    childStateChanged(child) {
        if (this._buildingDisplayList)
            return;
        var cnt = this._children.length;
        if (child instanceof GGroup) {
            for (let i = 0; i < cnt; i++) {
                let g = this._children[i];
                if (g.group == child)
                    this.childStateChanged(g);
            }
            return;
        }
        if (child.internalVisible /*&& child.displayObject != this._displayObject.mask*/) {
            if (!child.displayObject.parent) {
                var index = 0;
                if (this._childrenRenderOrder == ChildrenRenderOrder.Ascent) {
                    for (let i = 0; i < cnt; i++) {
                        let g = this._children[i];
                        if (g == child)
                            break;
                        if (g.displayObject.parent)
                            index++;
                    }
                    this._container.addChildAt(child.displayObject, index);
                }
                else if (this._childrenRenderOrder == ChildrenRenderOrder.Descent) {
                    for (let i = cnt - 1; i >= 0; i--) {
                        let g = this._children[i];
                        if (g == child)
                            break;
                        if (g.displayObject.parent)
                            index++;
                    }
                    this._container.addChildAt(child.displayObject, index);
                }
                else {
                    this._container.addChild(child.displayObject);
                    Timers.callLater(this.buildNativeDisplayList, this);
                }
            }
        }
        else {
            if (child.displayObject.parent) {
                this._container.removeChild(child.displayObject);
                if (this._childrenRenderOrder == ChildrenRenderOrder.Arch)
                    Timers.callLater(this.buildNativeDisplayList, this);
            }
        }
    }
    buildNativeDisplayList() {
        if (!this._displayObject)
            return;
        var cnt = this._children.length;
        if (cnt == 0)
            return;
        switch (this._childrenRenderOrder) {
            case ChildrenRenderOrder.Ascent:
                {
                    for (let i = 0; i < cnt; i++) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                }
                break;
            case ChildrenRenderOrder.Descent:
                {
                    for (let i = cnt - 1; i >= 0; i--) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                }
                break;
            case ChildrenRenderOrder.Arch:
                {
                    var apex = clamp(this._apexIndex, 0, cnt);
                    for (let i = 0; i < apex; i++) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                    for (let i = cnt - 1; i >= apex; i--) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                }
                break;
        }
    }
    applyController(c) {
        this._applyingController = c;
        var child;
        var length = this._children.length;
        for (var i = 0; i < length; i++) {
            child = this._children[i];
            child.handleControllerChanged(c);
        }
        this._applyingController = null;
        c.runActions();
    }
    applyAllControllers() {
        var cnt = this._controllers.length;
        for (var i = 0; i < cnt; ++i) {
            this.applyController(this._controllers[i]);
        }
    }
    adjustRadioGroupDepth(obj, c) {
        var cnt = this._children.length;
        var myIndex = -1, maxIndex = -1;
        for (let i = 0; i < cnt; i++) {
            let child = this._children[i];
            if (child == obj) {
                myIndex = i;
            }
            else if (("relatedController" in child) /*is button*/ && child.relatedController == c) {
                if (i > maxIndex)
                    maxIndex = i;
            }
        }
        if (myIndex < maxIndex) {
            //如果正在applyingController，此时修改显示列表是危险的，但真正排除危险只能用显示列表的副本去做，这样性能可能损耗较大，
            //这里取个巧，让可能漏过的child补一下handleControllerChanged，反正重复执行是无害的。
            if (this._applyingController)
                this._children[maxIndex].handleControllerChanged(this._applyingController);
            this.swapChildrenAt(myIndex, maxIndex);
        }
    }
    getTransitionAt(index) {
        return this._transitions[index];
    }
    getTransition(transName) {
        var cnt = this._transitions.length;
        for (var i = 0; i < cnt; ++i) {
            var trans = this._transitions[i];
            if (trans.name == transName)
                return trans;
        }
        return null;
    }
    isChildInView(child) {
        if (this._displayObject.clipRect) {
            return child.x + child.width >= 0 && child.x <= this.width
                && child.y + child.height >= 0 && child.y <= this.height;
        }
        else if (this._scrollPane) {
            return this._scrollPane.isChildInView(child);
        }
        else
            return true;
    }
    getFirstChildInView() {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (this.isChildInView(child))
                return i;
        }
        return -1;
    }
    get scrollPane() {
        return this._scrollPane;
    }
    get opaque() {
        return this._displayObject.opaque;
    }
    set opaque(value) {
        this._displayObject.opaque = value;
    }
    get margin() {
        return this._margin;
    }
    set margin(value) {
        this._margin.copy(value);
        if (this._displayObject.clipRect) {
            this._container.setPosition(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y);
        }
        this.handleSizeChanged();
    }
    get childrenRenderOrder() {
        return this._childrenRenderOrder;
    }
    set childrenRenderOrder(value) {
        if (this._childrenRenderOrder != value) {
            this._childrenRenderOrder = value;
            this.buildNativeDisplayList();
        }
    }
    get apexIndex() {
        return this._apexIndex;
    }
    set apexIndex(value) {
        if (this._apexIndex != value) {
            this._apexIndex = value;
            if (this._childrenRenderOrder == ChildrenRenderOrder.Arch)
                this.buildNativeDisplayList();
        }
    }
    get baseUserData() {
        var buffer = this.packageItem.rawData;
        buffer.seek(0, 4);
        return buffer.readS();
    }
    updateMask() {
        var rect = this._displayObject.clipRect;
        if (rect == null)
            rect = new Rect();
        rect.x = this._margin.left;
        rect.y = this._margin.top;
        rect.width = this._width - this._margin.right;
        rect.height = this._height - this._margin.bottom;
        this._displayObject.clipRect = rect;
    }
    setupScroll(buffer) {
        if (this._displayObject == this._container) {
            this._container = new DisplayObject();
            this._displayObject.addChild(this._container);
        }
        this._scrollPane = new ScrollPane(this);
        this._scrollPane.setup(buffer);
    }
    setupOverflow(overflow) {
        if (overflow == OverflowType.Hidden) {
            if (this._displayObject == this._container) {
                this._container = new DisplayObject();
                this._displayObject.addChild(this._container);
            }
            this.updateMask();
            this._container.setPosition(this._margin.left, this._margin.top);
        }
        else if (this._margin.left != 0 || this._margin.top != 0) {
            if (this._displayObject == this._container) {
                this._container = new DisplayObject();
                this._displayObject.addChild(this._container);
            }
            this._container.setPosition(this._margin.left, this._margin.top);
        }
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (this._scrollPane)
            this._scrollPane.onOwnerSizeChanged();
        else if (this._displayObject.clipRect)
            this.updateMask();
    }
    handleGrayedChanged() {
        var c = this.getController("grayed");
        if (c) {
            c.selectedIndex = this.grayed ? 1 : 0;
            return;
        }
        var v = this.grayed;
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            this._children[i].grayed = v;
        }
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._scrollPane)
            this._scrollPane.handleControllerChanged(c);
    }
    setBoundsChangedFlag() {
        if (!this._scrollPane && !this._trackBounds)
            return;
        if (!this._boundsChanged) {
            this._boundsChanged = true;
            Timers.callLater(this.__render, this);
        }
    }
    __render() {
        if (this._boundsChanged) {
            this.updateBounds();
        }
    }
    ensureBoundsCorrect() {
        if (this._boundsChanged)
            this.updateBounds();
    }
    updateBounds() {
        var ax = 0, ay = 0, aw = 0, ah = 0;
        var len = this._children.length;
        if (len > 0) {
            ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
            var ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
            var tmp = 0;
            var i1 = 0;
            for (i1 = 0; i1 < len; i1++) {
                var child = this._children[i1];
                tmp = child.x;
                if (tmp < ax)
                    ax = tmp;
                tmp = child.y;
                if (tmp < ay)
                    ay = tmp;
                tmp = child.x + child.actualWidth;
                if (tmp > ar)
                    ar = tmp;
                tmp = child.y + child.actualHeight;
                if (tmp > ab)
                    ab = tmp;
            }
            aw = ar - ax;
            ah = ab - ay;
        }
        this.setBounds(ax, ay, aw, ah);
    }
    setBounds(ax, ay, aw, ah) {
        this._boundsChanged = false;
        if (this._scrollPane)
            this._scrollPane.setContentSize(Math.round(ax + aw), Math.round(ay + ah));
    }
    get viewWidth() {
        if (this._scrollPane)
            return this._scrollPane.viewWidth;
        else
            return this.width - this._margin.left - this._margin.right;
    }
    set viewWidth(value) {
        if (this._scrollPane)
            this._scrollPane.viewWidth = value;
        else
            this.width = value + this._margin.left + this._margin.right;
    }
    get viewHeight() {
        if (this._scrollPane)
            return this._scrollPane.viewHeight;
        else
            return this.height - this._margin.top - this._margin.bottom;
    }
    set viewHeight(value) {
        if (this._scrollPane)
            this._scrollPane.viewHeight = value;
        else
            this.height = value + this._margin.top + this._margin.bottom;
    }
    getSnappingPosition(xValue, yValue, resultPoint) {
        return this.getSnappingPositionWithDir(xValue, yValue, 0, 0, resultPoint);
    }
    /**
     * dir正数表示右移或者下移，负数表示左移或者上移
     */
    getSnappingPositionWithDir(xValue, yValue, xDir, yDir, resultPoint) {
        if (!resultPoint)
            resultPoint = new Vector2();
        var cnt = this._children.length;
        if (cnt == 0) {
            resultPoint.x = 0;
            resultPoint.y = 0;
            return resultPoint;
        }
        this.ensureBoundsCorrect();
        var obj = null;
        var prev = null;
        var i = 0;
        if (yValue != 0) {
            for (; i < cnt; i++) {
                obj = this._children[i];
                if (yValue < obj.y) {
                    if (i == 0) {
                        yValue = 0;
                        break;
                    }
                    else {
                        prev = this._children[i - 1];
                        if (yValue < prev.y + prev.actualHeight / 2) //top half part
                            yValue = prev.y;
                        else //bottom half part
                            yValue = obj.y;
                        break;
                    }
                }
            }
            if (i == cnt)
                yValue = obj.y;
        }
        if (xValue != 0) {
            if (i > 0)
                i--;
            for (; i < cnt; i++) {
                obj = this._children[i];
                if (xValue < obj.x) {
                    if (i == 0) {
                        xValue = 0;
                        break;
                    }
                    else {
                        prev = this._children[i - 1];
                        if (xValue < prev.x + prev.actualWidth / 2) //top half part
                            xValue = prev.x;
                        else //bottom half part
                            xValue = obj.x;
                        break;
                    }
                }
            }
            if (i == cnt)
                xValue = obj.x;
        }
        resultPoint.x = xValue;
        resultPoint.y = yValue;
        return resultPoint;
    }
    childSortingOrderChanged(child, oldValue, newValue) {
        if (newValue == 0) {
            this._sortingChildCount--;
            this.setChildIndex(child, this._children.length);
        }
        else {
            if (oldValue == 0)
                this._sortingChildCount++;
            var oldIndex = this._children.indexOf(child);
            var index = this.getInsertPosForSortingChild(child);
            if (oldIndex < index)
                this._setChildIndex(child, oldIndex, index - 1);
            else
                this._setChildIndex(child, oldIndex, index);
        }
    }
    constructFromResource() {
        this.constructFromResource2(null, 0);
    }
    constructFromResource2(objectPool, poolIndex) {
        var contentItem = this.packageItem.getBranch();
        if (!contentItem.decoded) {
            contentItem.decoded = true;
            TranslationHelper.translateComponent(contentItem);
        }
        var i;
        var dataLen;
        var curPos;
        var nextPos;
        var f1;
        var f2;
        var i1;
        var i2;
        var buffer = contentItem.rawData;
        buffer.seek(0, 0);
        this._underConstruct = true;
        this.sourceWidth = buffer.readInt();
        this.sourceHeight = buffer.readInt();
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;
        this.setSize(this.sourceWidth, this.sourceHeight);
        if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
        }
        if (buffer.readBool()) {
            this._margin.top = buffer.readInt();
            this._margin.bottom = buffer.readInt();
            this._margin.left = buffer.readInt();
            this._margin.right = buffer.readInt();
        }
        var overflow = buffer.readByte();
        if (overflow == OverflowType.Scroll) {
            var savedPos = buffer.pos;
            buffer.seek(0, 7);
            this.setupScroll(buffer);
            buffer.pos = savedPos;
        }
        else
            this.setupOverflow(overflow);
        if (buffer.readBool())
            buffer.skip(8);
        this._buildingDisplayList = true;
        buffer.seek(0, 1);
        var controllerCount = buffer.readShort();
        for (i = 0; i < controllerCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var controller = new Controller();
            this._controllers.push(controller);
            controller.parent = this;
            controller.setup(buffer);
            buffer.pos = nextPos;
        }
        buffer.seek(0, 2);
        var child;
        var childCount = buffer.readShort();
        for (i = 0; i < childCount; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.pos;
            if (objectPool)
                child = objectPool[poolIndex + i];
            else {
                buffer.seek(curPos, 0);
                var type = buffer.readByte();
                var src = buffer.readS();
                var pkgId = buffer.readS();
                var pi;
                if (src) {
                    var pkg;
                    if (pkgId)
                        pkg = UIPackage.getById(pkgId);
                    else
                        pkg = contentItem.owner;
                    pi = pkg ? pkg.getItemById(src) : null;
                }
                else
                    pi = null;
                if (pi) {
                    child = Decls.UIObjectFactory.newObject(pi);
                    child.constructFromResource();
                }
                else
                    child = Decls.UIObjectFactory.newObject(type);
            }
            child._underConstruct = true;
            child.setup_beforeAdd(buffer, curPos);
            child.parent = this;
            this._children.push(child);
            buffer.pos = curPos + dataLen;
        }
        buffer.seek(0, 3);
        this.relations.setup(buffer, true);
        buffer.seek(0, 2);
        buffer.skip(2);
        for (i = 0; i < childCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            buffer.seek(buffer.pos, 3);
            this._children[i].relations.setup(buffer, false);
            buffer.pos = nextPos;
        }
        buffer.seek(0, 2);
        buffer.skip(2);
        for (i = 0; i < childCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            child = this._children[i];
            child.setup_afterAdd(buffer, buffer.pos);
            child._underConstruct = false;
            buffer.pos = nextPos;
        }
        buffer.seek(0, 4);
        buffer.skip(2); //customData
        this.opaque = buffer.readBool();
        var maskId = buffer.readShort();
        if (maskId != -1) {
            buffer.readBool();
            //todo setMask(this.getChildAt(maskId).displayObject, buffer.readBool())
        }
        var hitTestId = buffer.readS();
        i1 = buffer.readInt();
        i2 = buffer.readInt();
        if (hitTestId) {
            pi = contentItem.owner.getItemById(hitTestId);
            if (pi && pi.pixelHitTestData)
                this._displayObject.hitArea = new PixelHitTest(pi.pixelHitTestData, i1, i2, this.sourceWidth, this.sourceHeight);
        }
        else if (i1 != 0 && i2 != -1) {
            this._displayObject.hitArea = new ShapeHitTest(this.getChildAt(i2).displayObject);
        }
        buffer.seek(0, 5);
        var transitionCount = buffer.readShort();
        for (i = 0; i < transitionCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var trans = new Transition(this);
            trans.setup(buffer);
            this._transitions.push(trans);
            buffer.pos = nextPos;
        }
        if (this._transitions.length > 0) {
            this.on("added_to_stage", () => { this._transitions.forEach(e => e.onOwnerAddedToStage()); });
            this.on("removed_from_stage", () => { this._transitions.forEach(e => e.onOwnerRemovedFromStage()); });
        }
        this.applyAllControllers();
        this._buildingDisplayList = false;
        this._underConstruct = false;
        this.buildNativeDisplayList();
        this.setBoundsChangedFlag();
        if (contentItem.objectType != ObjectType.Component)
            this.constructExtension(buffer);
        this.onConstruct();
    }
    constructExtension(buffer) {
    }
    onConstruct() {
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        buffer.seek(beginPos, 4);
        var pageController = buffer.readShort();
        if (pageController != -1 && this._scrollPane)
            this._scrollPane.pageController = this._parent.getControllerAt(pageController);
        var cnt;
        var i;
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++) {
            var cc = this.getController(buffer.readS());
            var pageId = buffer.readS();
            if (cc)
                cc.selectedPageId = pageId;
        }
        if (buffer.version >= 2) {
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
                var target = buffer.readS();
                var propertyId = buffer.readShort();
                var value = buffer.readS();
                var obj = this.getChildByPath(target);
                if (obj)
                    obj.setProp(propertyId, value);
            }
        }
    }
}
