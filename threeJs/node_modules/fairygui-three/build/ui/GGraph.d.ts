import { GObject } from "./GObject";
import { ByteBuffer } from "../utils/ByteBuffer";
import { Shape } from "../core/Shape";
export declare class GGraph extends GObject {
    private _shape;
    constructor();
    get shape(): Shape;
    get color(): number;
    set color(value: number);
    protected createDisplayObject(): void;
    getProp(index: number): any;
    setProp(index: number, value: any): void;
    setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
}
