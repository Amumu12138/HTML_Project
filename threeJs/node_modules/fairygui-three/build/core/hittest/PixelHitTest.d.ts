import { ByteBuffer } from "../../utils/ByteBuffer";
import { Rect } from "../../utils/Rect";
import { IHitTest } from "./IHitTest";
export declare class PixelHitTestData {
    pixelWidth: number;
    scale: number;
    pixels: Uint8Array;
    load(ba: ByteBuffer): void;
}
export declare class PixelHitTest implements IHitTest {
    offsetX: number;
    offsetY: number;
    sourceWidth: number;
    sourceHeight: number;
    private _data;
    constructor(data: PixelHitTestData, offsetX: number, offsetY: number, sourceWidth: number, sourceHeight: number);
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
