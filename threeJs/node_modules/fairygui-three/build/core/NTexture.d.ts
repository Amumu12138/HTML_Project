import { Rect } from "../utils/Rect";
import { Texture, Vector2 } from "three";
export declare class NTexture {
    uvRect: Rect;
    rotated: boolean;
    region: Rect;
    offset: Vector2;
    originalSize: Vector2;
    private _root;
    private _nativeTexture;
    constructor(texture?: Texture, xScale?: number, yScale?: number);
    createSubTexture(region: Rect, rotated?: boolean, offset?: Vector2, originalSize?: Vector2): NTexture;
    get width(): number;
    get height(): number;
    get nativeTexture(): Texture;
    getDrawRect(drawRect: Rect): Rect;
    getUV(uv: Array<Vector2>): void;
    get root(): NTexture;
    reload(nativeTexture: Texture): void;
    dispose(): void;
}
export declare const EmptyTexture: NTexture;
