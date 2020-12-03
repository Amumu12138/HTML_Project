import { Vector2 } from "three";
var s_vec2 = new Vector2();
export class ShapeHitTest {
    constructor(obj) {
        this.shape = obj;
    }
    hitTest(contentRect, x, y) {
        if (!this.shape.graphics)
            return false;
        if (this.shape.parent) {
            let p = this.shape.parent["$owner"];
            if (p) {
                p.transformPoint(x, y, this.shape.obj3D, s_vec2);
                x = s_vec2.x;
                y = s_vec2.y;
            }
        }
        let ht = this.shape.graphics.meshFactory;
        if (!('hitTest' in ht))
            return false;
        return ht.hitTest(contentRect, x, y);
    }
}
