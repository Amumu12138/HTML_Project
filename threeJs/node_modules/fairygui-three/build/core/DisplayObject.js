import { Matrix4, NormalBlending, Object3D, Plane, Quaternion, Vector2, Vector3, Vector4 } from "three";
import { EventDispatcher } from "../event/EventDispatcher";
import { Rect } from "../utils/Rect";
import { broadcastEvent, screenToWorld, Stage, UILayer, worldToScreen } from "./Stage";
export class DisplayObject extends EventDispatcher {
    constructor() {
        super();
        this._obj3D = new Object3D();
        this._obj3D["isGroup"] = true;
        this._obj3D["$owner"] = this;
        this._obj3D.layers.set(UILayer);
        this._pos = this._obj3D.position;
        this._rot = this._obj3D.rotation;
        this._pivot = new Vector2();
        this._pivotOffset = new Vector3();
        this._contentRect = new Rect();
        this._alpha = 1;
        this._touchable = true;
    }
    get obj3D() {
        return this._obj3D;
    }
    get name() {
        return this._obj3D.name;
    }
    set name(value) {
        this._obj3D.name = value;
    }
    get x() {
        return this._pos.x;
    }
    set x(value) {
        this.setPosition(value, -this._pos.y, this._pos.z);
    }
    get y() {
        return -this._pos.y;
    }
    set y(value) {
        this.setPosition(this._pos.x, value, this._pos.z);
    }
    get z() {
        return this._pos.z;
    }
    set z(value) {
        this.setPosition(this._pos.x, -this._pos.y, value);
    }
    setPosition(x, y, z, isPivot) {
        z = z || 0;
        if (isPivot) {
            x -= this._pivotOffset.x;
            y += this._pivotOffset.y;
            z -= this._pivotOffset.z;
        }
        this._matrixDirty = true;
        this._pos.set(x, -y, z);
    }
    get width() {
        this.ensureSizeCorrect();
        return this._contentRect.width;
    }
    set width(value) {
        if (this._contentRect.width != value) {
            this._contentRect.width = value;
            this.onSizeChanged();
        }
    }
    get height() {
        this.ensureSizeCorrect();
        return this._contentRect.height;
    }
    set height(value) {
        if (this._contentRect.height != value) {
            this._contentRect.height = value;
            this.onSizeChanged();
        }
    }
    setSize(wv, hv) {
        if (wv != this._contentRect.width || hv != this._contentRect.height) {
            this._contentRect.width = wv;
            this._contentRect.height = hv;
            this.onSizeChanged();
        }
    }
    ensureSizeCorrect() {
    }
    onSizeChanged() {
        this.applyPivot();
        if (this._graphics)
            this._graphics.setDrawRect(this._contentRect);
    }
    get pivotX() {
        return this._pivot.x;
    }
    set pivotX(value) {
        this.setPivot(value, this._pivot.y);
    }
    get pivotY() {
        return this._pivot.y;
    }
    set pivotY(value) {
        this.setPosition(this._pivot.x, value);
    }
    setPivot(xv, yv) {
        if (this._pivot.x != xv || this._pivot.y != yv) {
            let dpx = (xv - this._pivot.x) * this._contentRect.width;
            let dpy = (this._pivot.y - yv) * this._contentRect.height;
            s_v3.copy(this._pivotOffset);
            this._pivot.set(xv, yv);
            this.updatePivotOffset();
            this._pos.x += s_v3.x - this._pivotOffset.x + dpx;
            this._pos.y += s_v3.y - this._pivotOffset.y + dpy;
            this._pos.y += s_v3.z - this._pivotOffset.z;
            this._matrixDirty = true;
        }
    }
    updatePivotOffset() {
        let px = this._pivot.x * this._contentRect.width;
        let py = this._pivot.y * this._contentRect.height;
        s_quaternion.setFromEuler(this._rot);
        s_mat.compose(s_v3_2, s_quaternion, this._obj3D.scale);
        this._pivotOffset.set(px, -py, 0);
        this._pivotOffset.applyMatrix4(s_mat);
    }
    applyPivot() {
        if (this._pivot.x != 0 || this._pivot.y != 0) {
            s_v3.copy(this._pivotOffset);
            this.updatePivotOffset();
            this._pos.x += s_v3.x - this._pivotOffset.x;
            this._pos.y += s_v3.y - this._pivotOffset.y;
            this._matrixDirty = true;
        }
    }
    get scaleX() {
        return this._obj3D.scale.x;
    }
    set scaleX(value) {
        this.setScale(value, this._obj3D.scale.y);
    }
    get scaleY() {
        return this._obj3D.scale.y;
    }
    set scaleY(value) {
        this.setScale(this._obj3D.scale.x, value);
    }
    setScale(xv, yv) {
        this._obj3D.scale.set(xv, yv, xv);
        this.applyPivot();
        this._matrixDirty = true;
    }
    get rotationX() {
        return this._rot.x * 180 / Math.PI;
    }
    set rotationX(value) {
        this._rot.x = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }
    get rotationY() {
        return this._rot.y * 180 / Math.PI;
    }
    set rotationY(value) {
        this._rot.y = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }
    get rotation() {
        return -this._rot.z * 180 / Math.PI;
    }
    set rotation(value) {
        this._rot.z = -value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }
    get parent() {
        return this._obj3D.parent;
    }
    get stage() {
        let t = this._obj3D;
        while (t.parent)
            t = t.parent;
        return t["isScene"];
    }
    get graphics() {
        return this._graphics;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
    }
    get touchable() {
        return this._touchable;
    }
    set touchable(value) {
        this._touchable = value;
    }
    get visible() {
        return this._obj3D.visible;
    }
    set visible(value) {
        this._obj3D.visible = value;
    }
    get color() {
        return this._graphics ? this._graphics.color : 0;
    }
    set color(value) {
        if (this._graphics)
            this._graphics.color = value;
    }
    get blendMode() {
        return this._graphics ? this._graphics.material.blending : NormalBlending;
    }
    set blendMode(value) {
        if (this._graphics)
            this._graphics.material.blending = value;
    }
    setLayer(layer) {
        this._obj3D.traverse(obj => obj.layers.set(layer));
    }
    validateMatrix() {
        this._obj3D.traverseAncestors(e => {
            let dobj = e["$owner"];
            if (dobj && dobj._matrixDirty) {
                dobj._matrixDirty = false;
                dobj._obj3D.updateMatrixWorld(true);
            }
        });
        if (this._matrixDirty) {
            this._matrixDirty = false;
            this._obj3D.updateMatrixWorld(true);
        }
    }
    _getRenderCamera() {
        let p = this._obj3D;
        while (p) {
            let dobj = p["$owner"];
            if (dobj && dobj.camera)
                return dobj.camera;
            p = p.parent;
        }
        return Stage.camera;
    }
    worldToLocal(pt, direction, validate) {
        if (validate)
            this.validateMatrix();
        pt = this._obj3D.worldToLocal(pt);
        if (pt.z != 0) {
            s_dir.copy(direction || s_forward);
            s_dir.applyQuaternion(this._obj3D.getWorldQuaternion(s_quaternion).inverse()).normalize();
            let distOnLine = -pt.dot(s_forward) / s_dir.dot(s_forward);
            pt.add(s_dir.multiplyScalar(distOnLine));
        }
        pt.y = -pt.y;
        return pt;
    }
    localToWorld(pt, validate) {
        if (validate)
            this.validateMatrix();
        pt.y = -pt.y;
        pt = this._obj3D.localToWorld(pt);
        return pt;
    }
    globalToLocal(x, y, result) {
        if (!Stage.disableMatrixValidation)
            this.validateMatrix();
        screenToWorld(this._getRenderCamera(), x, y, s_v3, s_dir);
        this.worldToLocal(s_v3, s_dir);
        if (!result)
            result = new Vector2();
        result.set(s_v3.x, s_v3.y);
        return result;
    }
    localToGlobal(x, y, result) {
        if (!Stage.disableMatrixValidation)
            this.validateMatrix();
        s_v3.set(x, -y, 0);
        this._obj3D.localToWorld(s_v3);
        if (!result)
            result = new Vector2();
        worldToScreen(this._getRenderCamera(), s_v3, result);
        return result;
    }
    getBounds(targetSpace, result) {
        this.ensureSizeCorrect();
        if (!result)
            result = new Rect();
        if (targetSpace == this._obj3D) // optimization
            result.copy(this._contentRect);
        else if (targetSpace == this._obj3D.parent && this._rot.z == 0)
            result.set(this._pos.x, -this._pos.y, this._contentRect.width * this._obj3D.scale.x, this._contentRect.height * this._obj3D.scale.y);
        else
            result = this.transformRect(this._contentRect, targetSpace, result);
        return result;
    }
    transformPoint(x, y, targetSpace, result) {
        if (!result)
            result = new Vector2();
        if (targetSpace == this._obj3D)
            result.set(x, y);
        else {
            if (!Stage.disableMatrixValidation)
                this.validateMatrix();
            s_v3.set(x, -y, 0);
            this._obj3D.localToWorld(s_v3);
            if (targetSpace)
                targetSpace.worldToLocal(s_v3);
            result.set(s_v3.x, -s_v3.y);
        }
        return result;
    }
    transformRect(rect, targetSpace, result) {
        if (!result)
            result = new Rect();
        if (targetSpace == this._obj3D) {
            result.copy(rect);
            return result;
        }
        if (targetSpace && targetSpace == this._obj3D.parent && this._rot.z == 0) {
            let scale = this._obj3D.scale;
            result.set((this._pos.x + rect.x) * scale.x, (this.y + rect.y) * scale.y, rect.width * scale.x, rect.height * scale.y);
        }
        else {
            s_v4.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            if (!Stage.disableMatrixValidation)
                this.validateMatrix();
            this.transformRectPoint(rect.x, rect.y, targetSpace);
            this.transformRectPoint(rect.xMax, rect.y, targetSpace);
            this.transformRectPoint(rect.x, rect.yMax, targetSpace);
            this.transformRectPoint(rect.xMax, rect.yMax, targetSpace);
            result.setMinMax(s_v4.x, s_v4.y, s_v4.z, s_v4.w);
        }
        return result;
    }
    transformRectPoint(x, y, targetSpace) {
        s_v3.set(x, y, 0);
        this.localToWorld(s_v3);
        if (targetSpace)
            targetSpace.worldToLocal(s_v3);
        if (s_v4.x > s_v3.x)
            s_v4.x = s_v3.x;
        if (s_v4.z < s_v3.x)
            s_v4.z = s_v3.x;
        if (s_v4.y > s_v3.y)
            s_v4.y = s_v3.y;
        if (s_v4.w < s_v3.y)
            s_v4.w = s_v3.y;
    }
    addChild(child) {
        this.addChildAt(child, Number.POSITIVE_INFINITY);
    }
    addChildAt(child, index) {
        if (child._obj3D.parent) {
            let i = child._obj3D.parent.children.indexOf(child._obj3D);
            child._obj3D.parent.children.splice(i, 1);
        }
        if (index >= this._obj3D.children.length)
            this._obj3D.children.push(child._obj3D);
        else
            this._obj3D.children.splice(index, 0, child._obj3D);
        child._obj3D.parent = this._obj3D;
        child._obj3D.layers.mask = this._obj3D.layers.mask;
        if (this.stage)
            broadcastEvent(child.obj3D, "added_to_stage");
    }
    removeChild(child) {
        let index = this._obj3D.children.indexOf(child._obj3D);
        if (index == -1)
            throw 'not a child';
        this.removeChildAt(index);
    }
    removeChildAt(index) {
        let child = this._obj3D.children[index];
        if (this.stage)
            broadcastEvent(child, "removed_from_stage");
        this._obj3D.children.splice(index, 1);
        child.parent = null;
    }
    setChildIndex(child, index) {
        let oldIndex = this._obj3D.children.indexOf(child._obj3D);
        if (oldIndex == index)
            return;
        if (oldIndex == -1)
            throw 'Not a child';
        this._obj3D.children.splice(oldIndex, 1);
        if (index >= this._obj3D.children.length)
            this._obj3D.children.push(child._obj3D);
        else
            this._obj3D.children.splice(index, 0, child._obj3D);
    }
    getIndex(child) {
        return this._obj3D.children.indexOf(child._obj3D);
    }
    get numChildren() {
        return this._obj3D.children.length;
    }
    get clipRect() {
        return this._clipRect;
    }
    set clipRect(value) {
        this._clipRect = value;
    }
    update(clipPlanes, alpha) {
        if (this._clipRect) {
            this.transformRect(this._clipRect, null, s_rect);
            if (clipPlanes) {
                s_rect2.setMinMax(-clipPlanes[0].constant, -clipPlanes[3].constant, clipPlanes[1].constant, clipPlanes[2].constant);
                s_rect.intersection(s_rect2);
            }
            if (!this._clipPlanes) {
                this._clipPlanes = [
                    new Plane(new Vector3(1, 0, 0)),
                    new Plane(new Vector3(-1, 0, 0)),
                    new Plane(new Vector3(0, -1, 0)),
                    new Plane(new Vector3(0, 1, 0))
                ];
            }
            clipPlanes = this._clipPlanes;
            clipPlanes[0].constant = -s_rect.x;
            clipPlanes[1].constant = s_rect.xMax;
            clipPlanes[2].constant = s_rect.yMax;
            clipPlanes[3].constant = -s_rect.y;
        }
        if (this._graphics)
            this._graphics.update(clipPlanes, this._alpha * alpha);
    }
    hitTest(context) {
        if (this._obj3D.scale.x == 0 || this._obj3D.scale.y == 0)
            return null;
        let backupRay;
        if (this.camera) {
            backupRay = context.ray;
            context.camera = this.camera;
        }
        let target;
        let pt = context.getLocal(this);
        let lx = pt.x;
        let ly = pt.y;
        if (this.hitArea) {
            if (!this.hitArea.hitTest(this._contentRect, lx, ly))
                return null;
        }
        else {
            if (this._clipRect && !this._clipRect.contains(lx, ly))
                return null;
        }
        if (this.mask) {
            let tmp = this.mask.visible ? this.mask.hitTest(context) : null;
            if (!this.reversedMask && !tmp || this.reversedMask && tmp)
                return null;
        }
        target = traverseHitTest(this._obj3D, context, this.mask);
        if (!target && this.opaque && (this.hitArea || this._contentRect.contains(lx, ly)))
            target = this;
        if (backupRay)
            context.ray = backupRay;
        return target;
    }
    dispose() {
    }
}
var s_v3 = new Vector3();
var s_v3_2 = new Vector3();
var s_v4 = new Vector4();
var s_rect = new Rect();
var s_rect2 = new Rect();
var s_mat = new Matrix4();
var s_quaternion = new Quaternion();
var s_dir = new Vector3();
const s_forward = new Vector3(0, 0, 1);
export function traverseUpdate(p, clippingPlanes, alpha) {
    let children = p.children;
    let cnt = children.length;
    let dobj = p["$owner"];
    if (dobj) {
        if (dobj._clipRect)
            clippingPlanes = dobj._clipPlanes;
        alpha *= dobj.alpha;
    }
    for (let i = 0; i < cnt; i++) {
        let child = children[i];
        dobj = child["$owner"];
        if (dobj)
            dobj.update(clippingPlanes, alpha);
        if (child.children.length > 0)
            traverseUpdate(child, clippingPlanes, alpha);
    }
}
export function traverseHitTest(p, context, mask) {
    let count = p.children.length;
    for (let i = count - 1; i >= 0; --i) // front to back!
     {
        let child = p.children[i];
        if (!child.visible)
            continue;
        let dobj = child["$owner"];
        if (dobj) {
            if (dobj == mask || dobj._touchDisabled)
                continue;
            if (!context.forTouch || dobj._touchable) {
                let target = dobj.hitTest(context);
                if (target)
                    return target;
            }
        }
        if (child.children.length > 0) {
            let target = traverseHitTest(child, context);
            if (target)
                return target;
        }
    }
}
