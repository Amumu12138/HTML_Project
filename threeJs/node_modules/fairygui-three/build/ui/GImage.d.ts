import { GObject } from "./GObject";
import { ByteBuffer } from "../utils/ByteBuffer";
export declare class GImage extends GObject {
    private _image;
    private _contentItem;
    constructor();
    get color(): number;
    set color(value: number);
    get flip(): number;
    set flip(value: number);
    get fillMethod(): number;
    set fillMethod(value: number);
    get fillOrigin(): number;
    set fillOrigin(value: number);
    get fillClockwise(): boolean;
    set fillClockwise(value: boolean);
    get fillAmount(): number;
    set fillAmount(value: number);
    protected createDisplayObject(): void;
    protected handleSizeChanged(): void;
    constructFromResource(): void;
    getProp(index: number): any;
    setProp(index: number, value: any): void;
    setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
}
