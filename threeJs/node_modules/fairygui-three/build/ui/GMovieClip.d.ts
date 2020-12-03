import { GObject } from "./GObject";
import { ByteBuffer } from "../utils/ByteBuffer";
export declare class GMovieClip extends GObject {
    private _movieClip;
    constructor();
    get color(): number;
    set color(value: number);
    protected createDisplayObject(): void;
    get playing(): boolean;
    set playing(value: boolean);
    get frame(): number;
    set frame(value: number);
    get timeScale(): number;
    set timeScale(value: number);
    rewind(): void;
    syncStatus(anotherMc: GMovieClip): void;
    advance(timeInMiniseconds: number): void;
    setPlaySettings(start?: number, end?: number, times?: number, endAt?: number): void;
    getProp(index: number): any;
    setProp(index: number, value: any): void;
    constructFromResource(): void;
    setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
}
