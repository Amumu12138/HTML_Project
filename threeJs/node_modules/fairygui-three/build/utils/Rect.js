import { Vector2 } from "three";
export class Rect {
    constructor(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }
    set(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    setMinMax(xMin, yMin, xMax, yMax) {
        this.x = xMin;
        this.y = yMin;
        this.width = xMax - xMin;
        this.height = yMax - yMin;
    }
    get position() {
        return new Vector2(this.x, this.y);
    }
    get size() {
        return new Vector2(this.width, this.height);
    }
    get xMin() {
        return this.x;
    }
    set xMin(value) {
        let d = value - this.x;
        this.x = value;
        this.width -= d;
    }
    get xMax() {
        return this.x + this.width;
    }
    set xMax(value) {
        this.width = value - this.x;
    }
    get yMin() {
        return this.y;
    }
    set yMin(value) {
        let d = value - this.y;
        this.y = value;
        this.height -= d;
    }
    get yMax() {
        return this.y + this.height;
    }
    set yMax(value) {
        this.height = value - this.y;
    }
    intersection(another) {
        if (this.width == 0 || this.height == 0 || another.width == 0 || another.height == 0)
            return new Rect(0, 0, 0, 0);
        let left = this.x > another.x ? this.x : another.x;
        let right = this.xMax < another.xMax ? this.xMax : another.xMax;
        let top = this.y > another.y ? this.y : another.y;
        let bottom = this.yMax < another.yMax ? this.yMax : another.yMax;
        if (left > right || top > bottom)
            this.set(0, 0, 0, 0);
        else
            this.setMinMax(left, top, right, bottom);
        return this;
    }
    union(another) {
        if (another.width == 0 || another.height == 0)
            return this;
        if (this.width == 0 || this.height == 0) {
            this.copy(another);
            return this;
        }
        let x = Math.min(this.x, another.x);
        let y = Math.min(this.y, another.y);
        this.setMinMax(x, y, Math.max(this.xMax, another.xMax), Math.max(this.yMax, another.yMax));
        return this;
    }
    extend(x, y) {
        this.x -= x;
        this.y -= y;
        this.width += x * 2;
        this.height += y * 2;
    }
    contains(x, y) {
        if (x instanceof Vector2) {
            y = x.y;
            x = x.x;
        }
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
    }
    copy(source) {
        this.set(source.x, source.y, source.width, source.height);
    }
    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}
