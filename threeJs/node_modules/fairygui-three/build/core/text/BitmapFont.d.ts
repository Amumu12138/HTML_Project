import { BaseFont, GlyphInfo } from "./BaseFont";
import { TextFormat } from "./TextFormat";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { NTexture } from "../NTexture";
import { Vector2 } from "three";
export declare class BitmapFont implements BaseFont {
    name: string;
    version: number;
    mainTexture: NTexture;
    size: number;
    glyphs: {
        [index: string]: BMGlyph;
    };
    resizable: boolean;
    hasChannel: boolean;
    tint: boolean;
    private _color;
    private _scale;
    private _glyph;
    constructor();
    setFormat(format: TextFormat, fontSizeScale: number): void;
    prepareCharacters(text: string): void;
    getGlyph(ch: string, ret: GlyphInfo): boolean;
    drawGlyph(x: number, y: number, vb: VertexBuffer): number;
    drawLine(x: number, y: number, width: number, fontSize: number, type: number, vb: VertexBuffer): number;
    getLineHeight(size: number): number;
}
export declare class BMGlyph {
    x: number;
    y: number;
    width: number;
    height: number;
    advance: number;
    lineHeight: number;
    channel: number;
    uv: Array<Vector2>;
}
