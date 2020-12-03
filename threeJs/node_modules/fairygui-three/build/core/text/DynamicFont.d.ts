import { NTexture } from "../NTexture";
import { TextFormat } from "./TextFormat";
import { GlyphInfo } from "./BaseFont";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { Texture } from "three";
import { Rect } from "../../utils/Rect";
import { Color4 } from "../../utils/Color";
declare type OutlineGlyph = {
    uvRect: Rect;
    vertRect: Rect;
    chl?: number;
    ver: number;
};
declare type Glyph = {
    uvRect?: Rect;
    vertRect?: Rect;
    advance?: number;
    sourceRect?: Rect;
    chl?: number;
    baseline?: number;
    ver: number;
    outlines?: {
        [index: number]: OutlineGlyph;
    };
};
export declare class DynamicFont {
    version: number;
    mainTexture: NTexture;
    isDynamic: boolean;
    keepCrisp: boolean;
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _texture: Texture;
    protected _packers: Array<BinPacker>;
    protected _glyphs: {
        [index: number]: Glyph;
    };
    protected _name: string;
    protected _format: TextFormat;
    protected _size: number;
    protected _glyph: Glyph;
    protected _color: Color4;
    protected _outlineColor: Color4;
    protected _scale: number;
    protected eSpan: HTMLSpanElement;
    protected eBlock: HTMLDivElement;
    constructor();
    get name(): string;
    set name(value: string);
    private createTexture;
    private clearTexture;
    protected rebuild(): void;
    setFormat(format: TextFormat, fontSizeScale: number): void;
    prepareCharacters(text: string): void;
    protected getGlyphsOf(ch: string, size: number): Glyph;
    protected prepareChar(ch: string, size: number, glyph: Glyph): Glyph;
    protected prepareOutline(ch: string, glyph: Glyph, size: number, outline: number): void;
    protected measureChar(ch: string, size: number): Glyph;
    protected addNode(w: number, h: number): Node;
    getGlyph(ch: string, ret: GlyphInfo): boolean;
    drawGlyph(x: number, y: number, vb: VertexBuffer): number;
    drawLine(x: number, y: number, width: number, fontSize: number, type: number, vb: VertexBuffer): number;
    getLineHeight(size: number): number;
    getBaseline(ch: string, font: string, size: number): number;
}
declare type Node = {
    x: number;
    y: number;
    z?: number;
};
declare class BinPacker {
    full?: boolean;
    private _root;
    init(w: number, h: number): void;
    add(w: number, h: number): Node;
    private findNode;
    private splitNode;
}
export {};
