import { Object3D, Vector2, NormalBlending, NoBlending, AdditiveBlending, MultiplyBlending, SubtractiveBlending } from "three";
import { DisplayObject } from "../core/DisplayObject";
import { Stage } from "../core/Stage";
import { GearAnimation } from "../gears/GearAnimation";
import { GearColor } from "../gears/GearColor";
import { GearDisplay } from "../gears/GearDisplay";
import { GearDisplay2 } from "../gears/GearDisplay2";
import { GearFontSize } from "../gears/GearFontSize";
import { GearIcon } from "../gears/GearIcon";
import { GearLook } from "../gears/GearLook";
import { GearSize } from "../gears/GearSize";
import { GearText } from "../gears/GearText";
import { GearXY } from "../gears/GearXY";
import { Rect } from "../utils/Rect";
import { Timers } from "../utils/Timers";
import { ObjectPropID, RelationType } from "./FieldTypes";
import { GGroup } from "./GGroup";
import { Relations } from "./Relations";
import { UIConfig } from "./UIConfig";
export class GObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._alpha = 1;
        this._visible = true;
        this._touchable = true;
        this._scaleX = 1;
        this._scaleY = 1;
        this._skewX = 0;
        this._skewY = 0;
        this._pivotX = 0;
        this._pivotY = 0;
        this._sortingOrder = 0;
        this._internalVisible = true;
        this.minWidth = 0;
        this.minHeight = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.sourceWidth = 0;
        this.sourceHeight = 0;
        this.initWidth = 0;
        this.initHeight = 0;
        this._width = 0;
        this._height = 0;
        this._rawWidth = 0;
        this._rawHeight = 0;
        this._sizePercentInGroup = 0;
        //drag support
        //-------------------------------------------------------------------
        this._dragStartPos = new Vector2();
        this._dragTesting = false;
        this._id = "" + gInstanceCounter++;
        this._name = "";
        this.createDisplayObject();
        this._displayObject["$owner"] = this;
        this._relations = new Relations(this);
        this._gears = new Array(10);
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this.setPosition(value, this._y);
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this.setPosition(this._x, value);
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this.setPosition(this._x, this._y, value);
    }
    setPosition(xv, yv, zv) {
        if (this._x != xv || this._y != yv) {
            var dx = xv - this._x;
            var dy = yv - this._y;
            this._x = xv;
            this._y = yv;
            if (zv != null)
                this._z = zv;
            this.handlePositionChanged();
            if (this instanceof GGroup)
                this.moveChildren(dx, dy);
            this.updateGear(1);
            if (this._parent && !("setVirtual" in this._parent) /*not list*/) {
                this._parent.setBoundsChangedFlag();
                if (this._group)
                    this._group.setBoundsChangedFlag(true);
                this.dispatchEvent("pos_changed");
            }
            if (GObject.draggingObject == this && !s_dragging)
                this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        }
    }
    get xMin() {
        return this._pivotAsAnchor ? (this._x - this._width * this._pivotX) : this._x;
    }
    set xMin(value) {
        if (this._pivotAsAnchor)
            this.setPosition(value + this._width * this._pivotX, this._y);
        else
            this.setPosition(value, this._y);
    }
    get yMin() {
        return this._pivotAsAnchor ? (this._y - this._height * this._pivotY) : this._y;
    }
    set yMin(value) {
        if (this._pivotAsAnchor)
            this.setPosition(this._x, value + this._height * this._pivotY);
        else
            this.setPosition(this._x, value);
    }
    center(restraint) {
        var r;
        if (this._parent)
            r = this.parent;
        else
            r = Decls.GRoot.inst;
        this.setPosition(Math.floor((r.width - this.width) / 2), Math.floor((r.height - this.height) / 2));
        if (restraint) {
            this.addRelation(r, RelationType.Center_Center);
            this.addRelation(r, RelationType.Middle_Middle);
        }
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this.setSize(value, this._rawHeight);
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this.setSize(this._rawWidth, value);
    }
    setSize(wv, hv, ignorePivot) {
        if (this._rawWidth != wv || this._rawHeight != hv) {
            this._rawWidth = wv;
            this._rawHeight = hv;
            if (wv < this.minWidth)
                wv = this.minWidth;
            if (hv < this.minHeight)
                hv = this.minHeight;
            if (this.maxWidth > 0 && wv > this.maxWidth)
                wv = this.maxWidth;
            if (this.maxHeight > 0 && hv > this.maxHeight)
                hv = this.maxHeight;
            var dWidth = wv - this._width;
            var dHeight = hv - this._height;
            this._width = wv;
            this._height = hv;
            this.handleSizeChanged();
            if (this._pivotX != 0 || this._pivotY != 0) {
                if (!this._pivotAsAnchor) {
                    if (!ignorePivot)
                        this.setPosition(this.x - this._pivotX * dWidth, this.y - this._pivotY * dHeight);
                    else
                        this.handlePositionChanged();
                }
                else
                    this.handlePositionChanged();
            }
            if (this instanceof GGroup)
                this.resizeChildren(dWidth, dHeight);
            this.updateGear(2);
            if (this._parent) {
                this._relations.onOwnerSizeChanged(dWidth, dHeight, this._pivotAsAnchor || !ignorePivot);
                this._parent.setBoundsChangedFlag();
                if (this._group)
                    this._group.setBoundsChangedFlag();
            }
            this.dispatchEvent("size_changed");
        }
    }
    setSizeDirectly(wv, hv) {
        this._rawWidth = wv;
        this._rawHeight = hv;
        if (wv < 0)
            wv = 0;
        if (hv < 0)
            hv = 0;
        this._width = wv;
        this._height = hv;
    }
    makeFullScreen() {
        this.setSize(Decls.GRoot.inst.width, Decls.GRoot.inst.height);
    }
    get actualWidth() {
        return this.width * Math.abs(this._scaleX);
    }
    get actualHeight() {
        return this.height * Math.abs(this._scaleY);
    }
    get scaleX() {
        return this._scaleX;
    }
    set scaleX(value) {
        this.setScale(value, this._scaleY);
    }
    get scaleY() {
        return this._scaleY;
    }
    set scaleY(value) {
        this.setScale(this._scaleX, value);
    }
    setScale(sx, sy) {
        if (this._scaleX != sx || this._scaleY != sy) {
            this._scaleX = sx;
            this._scaleY = sy;
            this.handleScaleChanged();
            this.updateGear(2);
        }
    }
    get skewX() {
        return this._skewX;
    }
    set skewX(value) {
        this.setSkew(value, this._skewY);
    }
    get skewY() {
        return this._skewY;
    }
    set skewY(value) {
        this.setSkew(this._skewX, value);
    }
    setSkew(sx, sy) {
        if (this._skewX != sx || this._skewY != sy) {
            this._skewX = sx;
            this._skewY = sy;
            //todo skew
        }
    }
    get pivotX() {
        return this._pivotX;
    }
    set pivotX(value) {
        this.setPivot(value, this._pivotY);
    }
    get pivotY() {
        return this._pivotY;
    }
    set pivotY(value) {
        this.setPivot(this._pivotX, value);
    }
    setPivot(xv, yv, asAnchor) {
        asAnchor = asAnchor || false;
        if (this._pivotX != xv || this._pivotY != yv || this._pivotAsAnchor != asAnchor) {
            this._pivotX = xv;
            this._pivotY = yv;
            this._pivotAsAnchor = asAnchor;
            this._displayObject.setPivot(xv, yv);
            this.handlePositionChanged();
        }
    }
    get pivotAsAnchor() {
        return this._pivotAsAnchor;
    }
    get touchable() {
        return this._touchable;
    }
    set touchable(value) {
        if (this._touchable != value) {
            this._touchable = value;
            this.updateGear(3);
            this._displayObject.touchable = this._touchable;
        }
    }
    get grayed() {
        return this._grayed;
    }
    set grayed(value) {
        if (this._grayed != value) {
            this._grayed = value;
            this.handleGrayedChanged();
            this.updateGear(3);
        }
    }
    get enabled() {
        return !this._grayed && this._touchable;
    }
    set enabled(value) {
        this.grayed = !value;
        this.touchable = value;
    }
    get rotation() {
        return this._displayObject.rotation;
    }
    set rotation(value) {
        if (this._displayObject.rotation != value) {
            this._displayObject.rotation = value;
            this.updateGear(3);
        }
    }
    get rotationX() {
        return this._displayObject.rotationX;
    }
    set rotationX(value) {
        this._displayObject.rotationX = value;
    }
    get rotationY() {
        return this._displayObject.rotationY;
    }
    set rotationY(value) {
        this._displayObject.rotationY = value;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        if (this._alpha != value) {
            this._alpha = value;
            this.handleAlphaChanged();
            this.updateGear(3);
        }
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        if (this._visible != value) {
            this._visible = value;
            this.handleVisibleChanged();
            if (this._parent)
                this._parent.setBoundsChangedFlag();
            if (this._group && this._group.excludeInvisibles)
                this._group.setBoundsChangedFlag();
        }
    }
    get internalVisible() {
        return this._internalVisible && (!this._group || this._group.internalVisible);
    }
    get internalVisible2() {
        return this._visible && (!this._group || this._group.internalVisible2);
    }
    get internalVisible3() {
        return this._internalVisible && this._visible;
    }
    get sortingOrder() {
        return this._sortingOrder;
    }
    set sortingOrder(value) {
        if (value < 0)
            value = 0;
        if (this._sortingOrder != value) {
            var old = this._sortingOrder;
            this._sortingOrder = value;
            if (this._parent)
                this._parent.childSortingOrderChanged(this, old, this._sortingOrder);
        }
    }
    get tooltips() {
        return this._tooltips;
    }
    set tooltips(value) {
        if (this._tooltips) {
            this.off("roll_over", this.__rollOver, this);
            this.off("roll_out", this.__rollOut, this);
        }
        this._tooltips = value;
        if (this._tooltips) {
            this.on("roll_over", this.__rollOver, this);
            this.on("roll_out", this.__rollOut, this);
        }
    }
    __rollOver() {
        Timers.callDelay(100, this.__doShowTooltips, this);
    }
    __doShowTooltips() {
        Decls.GRoot.findFor(this).showTooltips(this._tooltips);
    }
    __rollOut() {
        Timers.remove(this.__doShowTooltips, this);
        Decls.GRoot.findFor(this).hideTooltips();
    }
    get blendMode() {
        return this._displayObject.blendMode;
    }
    set blendMode(value) {
        this._displayObject.blendMode = value;
    }
    get onStage() {
        return this._displayObject.stage != null;
    }
    get resourceURL() {
        if (this.packageItem)
            return "ui://" + this.packageItem.owner.id + this.packageItem.id;
        else
            return null;
    }
    set group(value) {
        if (this._group != value) {
            if (this._group)
                this._group.setBoundsChangedFlag();
            this._group = value;
            if (this._group)
                this._group.setBoundsChangedFlag();
        }
    }
    get group() {
        return this._group;
    }
    getGear(index) {
        var gear = this._gears[index];
        if (gear == null)
            this._gears[index] = gear = createGear(this, index);
        return gear;
    }
    updateGear(index) {
        if (this._underConstruct || this._gearLocked)
            return;
        var gear = this._gears[index];
        if (gear && gear.controller)
            gear.updateState();
    }
    checkGearController(index, c) {
        return this._gears[index] && this._gears[index].controller == c;
    }
    updateGearFromRelations(index, dx, dy) {
        if (this._gears[index])
            this._gears[index].updateFromRelations(dx, dy);
    }
    addDisplayLock() {
        var gearDisplay = (this._gears[0]);
        if (gearDisplay && gearDisplay.controller) {
            var ret = gearDisplay.addLock();
            this.checkGearDisplay();
            return ret;
        }
        else
            return 0;
    }
    releaseDisplayLock(token) {
        var gearDisplay = (this._gears[0]);
        if (gearDisplay && gearDisplay.controller) {
            gearDisplay.releaseLock(token);
            this.checkGearDisplay();
        }
    }
    checkGearDisplay() {
        if (this._handlingController)
            return;
        var connected = this._gears[0] == null || (this._gears[0]).connected;
        if (this._gears[8])
            connected = this._gears[8].evaluate(connected);
        if (connected != this._internalVisible) {
            this._internalVisible = connected;
            if (this._parent) {
                this._parent.childStateChanged(this);
                if (this._group && this._group.excludeInvisibles)
                    this._group.setBoundsChangedFlag();
            }
        }
    }
    get relations() {
        return this._relations;
    }
    addRelation(target, relationType, usePercent) {
        this._relations.add(target, relationType, usePercent);
    }
    removeRelation(target, relationType) {
        this._relations.remove(target, relationType);
    }
    get displayObject() {
        return this._displayObject;
    }
    get obj3D() {
        return this._displayObject.obj3D;
    }
    get parent() {
        return this._parent;
    }
    set parent(val) {
        this._parent = val;
    }
    removeFromParent() {
        if (this._parent)
            this._parent.removeChild(this);
    }
    get asCom() {
        return this;
    }
    get text() {
        return null;
    }
    set text(value) {
    }
    get icon() {
        return null;
    }
    set icon(value) {
    }
    get treeNode() {
        return this._treeNode;
    }
    get isDisposed() {
        return this._displayObject == null;
    }
    dispose() {
        this.removeFromParent();
        this._relations.dispose();
        this._displayObject.dispose();
        this._displayObject = null;
        for (var i = 0; i < 10; i++) {
            var gear = this._gears[i];
            if (gear)
                gear.dispose();
        }
    }
    on(type, callback, target, capture) {
        this._displayObject.on(type, callback, target, capture);
    }
    off(type, callback, target, capture) {
        this._displayObject.off(type, callback, target, capture);
    }
    offAll(type) {
        this._displayObject.offAll(type);
    }
    hasListener(type, callback, target, capture) {
        return this._displayObject.hasListener(type, callback, target, capture);
    }
    dispatchEvent(type, data) {
        return this._displayObject.dispatchEvent(type, data);
    }
    onClick(listener, target) {
        this.on("click", listener, target);
    }
    offClick(listener, target) {
        this.off("click", listener, target);
    }
    hasClickListener() {
        return this.hasListener("click");
    }
    get draggable() {
        return this._draggable;
    }
    set draggable(value) {
        if (this._draggable != value) {
            this._draggable = value;
            this.initDrag();
        }
    }
    get dragBounds() {
        return this._dragBounds;
    }
    set dragBounds(value) {
        this._dragBounds = value;
    }
    startDrag(touchId) {
        if (this._displayObject.stage == null)
            return;
        if (touchId == null)
            touchId = -1;
        this.dragBegin(touchId);
    }
    stopDrag() {
        this.dragEnd();
    }
    get dragging() {
        return GObject.draggingObject == this;
    }
    localToGlobal(ax, ay, result) {
        ax = ax || 0;
        ay = ay || 0;
        if (this._pivotAsAnchor) {
            ax += this._pivotX * this._width;
            ay += this._pivotY * this._height;
        }
        return this._displayObject.localToGlobal(ax, ay, result);
    }
    globalToLocal(ax, ay, result) {
        ax = ax || 0;
        ay = ay || 0;
        result = this._displayObject.globalToLocal(ax, ay, result);
        if (this._pivotAsAnchor) {
            result.x -= this._pivotX * this._width;
            result.y -= this._pivotY * this._height;
        }
        return result;
    }
    localToRoot(ax, ay, result) {
        let r = Decls.GRoot.findFor(this);
        let pt = this.localToGlobal(ax, ay, result);
        return r.globalToLocal(pt.x, pt.y, pt);
    }
    rootToLocal(ax, ay, result) {
        let r = Decls.GRoot.findFor(this);
        let pt = r.localToGlobal(ax, ay, result);
        return this.globalToLocal(pt.x, pt.y, pt);
    }
    localToGlobalRect(ax, ay, aWidth, aHeight, result) {
        if (!result)
            result = new Rect();
        var pt = this.localToGlobal(ax, ay, s_vec2);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.localToGlobal(ax + aWidth, ay + aHeight, s_vec2);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
    }
    globalToLocalRect(ax, ay, aWidth, aHeight, result) {
        if (!result)
            result = new Rect();
        var pt = this.globalToLocal(ax, ay, s_vec2);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.globalToLocal(ax + aWidth, ay + aHeight, s_vec2);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
    }
    handleControllerChanged(c) {
        this._handlingController = true;
        for (var i = 0; i < 10; i++) {
            var gear = this._gears[i];
            if (gear && gear.controller == c)
                gear.apply();
        }
        this._handlingController = false;
        this.checkGearDisplay();
    }
    createDisplayObject() {
        this._displayObject = new DisplayObject();
    }
    handlePositionChanged() {
        var xv = this._x;
        var yv = this._y;
        if (!this._pivotAsAnchor) {
            xv += this._pivotX * this._width;
            yv += this._pivotY * this._height;
        }
        this._displayObject.setPosition(xv, yv, this._z, true);
    }
    handleSizeChanged() {
        this._displayObject.setSize(this._width, this._height);
    }
    handleScaleChanged() {
        this._displayObject.setScale(this._scaleX, this._scaleY);
    }
    handleGrayedChanged() {
        if (this._displayObject.graphics)
            this._displayObject.graphics.grayed = this._grayed;
    }
    handleAlphaChanged() {
        this._displayObject.alpha = this._alpha;
    }
    handleVisibleChanged() {
        this._displayObject.visible = this.internalVisible2;
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Text:
                return this.text;
            case ObjectPropID.Icon:
                return this.icon;
            case ObjectPropID.Color:
                return null;
            case ObjectPropID.OutlineColor:
                return null;
            case ObjectPropID.Playing:
                return false;
            case ObjectPropID.Frame:
                return 0;
            case ObjectPropID.DeltaTime:
                return 0;
            case ObjectPropID.TimeScale:
                return 1;
            case ObjectPropID.FontSize:
                return 0;
            case ObjectPropID.Selected:
                return false;
            default:
                return undefined;
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Text:
                this.text = value;
                break;
            case ObjectPropID.Icon:
                this.icon = value;
                break;
        }
    }
    constructFromResource() {
    }
    setup_beforeAdd(buffer, beginPos) {
        buffer.seek(beginPos, 0);
        buffer.skip(5);
        var f1;
        var f2;
        this._id = buffer.readS();
        this._name = buffer.readS();
        f1 = buffer.readInt();
        f2 = buffer.readInt();
        this.setPosition(f1, f2);
        if (buffer.readBool()) {
            this.initWidth = buffer.readInt();
            this.initHeight = buffer.readInt();
            this.setSize(this.initWidth, this.initHeight, true);
        }
        if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setScale(f1, f2);
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setSkew(f1, f2);
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
        }
        f1 = buffer.readFloat();
        if (f1 != 1)
            this.alpha = f1;
        f1 = buffer.readFloat();
        if (f1 != 0)
            this.rotation = f1;
        if (!buffer.readBool())
            this.visible = false;
        if (!buffer.readBool())
            this.touchable = false;
        if (buffer.readBool())
            this.grayed = true;
        var bm = buffer.readByte();
        this.blendMode = BlendModeTranslate[bm] || NormalBlending;
        var filter = buffer.readByte();
        if (filter == 1) {
            //todo set filter
            // ToolSet.setColorFilter(this._displayObject,
            //     [buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()]);
        }
        var str = buffer.readS();
        if (str != null)
            this.data = str;
    }
    setup_afterAdd(buffer, beginPos) {
        buffer.seek(beginPos, 1);
        var str = buffer.readS();
        if (str)
            this.tooltips = str;
        var groupId = buffer.readShort();
        if (groupId >= 0)
            this.group = this.parent.getChildAt(groupId);
        buffer.seek(beginPos, 2);
        var cnt = buffer.readShort();
        for (var i = 0; i < cnt; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var gear = this.getGear(buffer.readByte());
            gear.setup(buffer);
            buffer.pos = nextPos;
        }
    }
    initDrag() {
        if (this._draggable) {
            this.on("touch_begin", this.__touchBegin, this);
            this.on("touch_move", this.__touchMove, this);
            this.on("touch_end", this.__touchEnd, this);
        }
        else {
            this.off("touch_begin", this.__touchBegin, this);
            this.off("touch_move", this.__touchMove, this);
            this.off("touch_end", this.__touchEnd, this);
        }
    }
    dragBegin(touchId) {
        if (GObject.draggingObject) {
            let tmp = GObject.draggingObject;
            GObject.draggingObject.stopDrag();
            GObject.draggingObject = null;
            tmp.dispatchEvent("drag_end");
        }
        this.on("touch_move", this.__touchMove, this);
        this.on("touch_end", this.__touchEnd, this);
        Stage.getTouchPos(touchId, sGlobalDragStart);
        this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        this._dragTesting = false;
        GObject.draggingObject = this;
        Stage.addTouchMonitor(touchId, this._displayObject);
    }
    dragEnd() {
        if (GObject.draggingObject == this) {
            this._dragTesting = false;
            GObject.draggingObject = null;
        }
    }
    __touchBegin(evt) {
        if (this._dragStartPos == null)
            this._dragStartPos = new Vector2();
        this._dragStartPos.set(evt.input.x, evt.input.y);
        this._dragTesting = true;
        evt.captureTouch();
    }
    __touchMove(evt) {
        if (this._dragTesting && GObject.draggingObject != this) {
            let sensitivity;
            if (Stage.touchScreen)
                sensitivity = UIConfig.touchDragSensitivity;
            else
                sensitivity = UIConfig.clickDragSensitivity;
            if (this._dragStartPos
                && Math.abs(this._dragStartPos.x - evt.input.x) < sensitivity
                && Math.abs(this._dragStartPos.y - evt.input.y) < sensitivity)
                return;
            this._dragTesting = false;
            if (!this.dispatchEvent("drag_start", evt.input.touchId))
                this.dragBegin(evt.input.touchId);
        }
        if (GObject.draggingObject == this) {
            let xx = evt.input.x - sGlobalDragStart.x + sGlobalRect.x;
            let yy = evt.input.y - sGlobalDragStart.y + sGlobalRect.y;
            if (this._dragBounds) {
                let rect = Decls.GRoot.findFor(this).localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, s_rect);
                if (xx < rect.x)
                    xx = rect.x;
                else if (xx + sGlobalRect.width > rect.xMax) {
                    xx = rect.xMax - sGlobalRect.width;
                    if (xx < rect.x)
                        xx = rect.x;
                }
                if (yy < rect.y)
                    yy = rect.y;
                else if (yy + sGlobalRect.height > rect.yMax) {
                    yy = rect.yMax - sGlobalRect.height;
                    if (yy < rect.y)
                        yy = rect.y;
                }
            }
            let pt = this.parent.globalToLocal(xx, yy, s_vec2);
            s_dragging = true;
            this.setPosition(Math.round(pt.x), Math.round(pt.y));
            s_dragging = false;
            this.dispatchEvent("drag_move");
        }
    }
    __touchEnd() {
        if (GObject.draggingObject == this) {
            GObject.draggingObject = null;
            this.dispatchEvent("drag_end");
        }
    }
    static cast(obj) {
        let dobj;
        if (obj instanceof Object3D) {
            dobj = obj["$owner"];
            if (!dobj)
                return null;
        }
        else
            dobj = obj;
        return dobj['$owner'];
    }
}
let GearClasses = [
    GearDisplay, GearXY, GearSize, GearLook, GearColor,
    GearAnimation, GearText, GearIcon, GearDisplay2, GearFontSize
];
function createGear(owner, index) {
    let ret = new (GearClasses[index])();
    ret._owner = owner;
    return ret;
}
var s_vec2 = new Vector2();
var s_rect = new Rect();
var sGlobalDragStart = new Vector2();
var sGlobalRect = new Rect();
var s_dragging;
const BlendModeTranslate = {
    0: NormalBlending,
    1: NoBlending,
    2: AdditiveBlending,
    3: MultiplyBlending,
    4: SubtractiveBlending,
};
export var Decls = {};
export var gInstanceCounter = 0;
export var constructingDepth = { n: 0 };
