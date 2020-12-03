import { Color } from "three";
export class Color4 extends Color {
    constructor(rgb, a) {
        super(rgb || 0);
        this.a = a != null ? a : 1;
    }
}
