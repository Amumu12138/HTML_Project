import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { Vector2 } from "three";
var s_rect = new Rect();
var c_white = new Color4(0xFFFFFF, 1);
export class BitmapFont {
    constructor() {
        this.version = 0;
        this.size = 0;
        this.glyphs = {};
        this._color = new Color4();
    }
    setFormat(format, fontSizeScale) {
        if (this.resizable)
            this._scale = format.size / this.size * fontSizeScale;
        else
            this._scale = fontSizeScale;
        this._color.setHex(format.color);
    }
    prepareCharacters(text) {
    }
    getGlyph(ch, ret) {
        if (ch == ' ') {
            ret.width = Math.round(this.size * this._scale / 2);
            ret.height = Math.round(this.size * this._scale);
            ret.baseline = ret.height;
            this._glyph = null;
            return true;
        }
        else if (this._glyph = this.glyphs[ch]) {
            ret.width = Math.round(this._glyph.advance * this._scale);
            ret.height = Math.round(this._glyph.lineHeight * this._scale);
            ret.baseline = ret.height;
            return true;
        }
        else {
            ret.width = 0;
            ret.height = 0;
            ret.baseline = 0;
            return false;
        }
    }
    drawGlyph(x, y, vb) {
        if (!this._glyph)
            return 0;
        let tx = x + this._glyph.x * this._scale;
        let ty = -y - this._glyph.y * this._scale;
        let bx = x + (this._glyph.x + this._glyph.width) * this._scale;
        let by = -y - (this._glyph.y + this._glyph.height) * this._scale;
        s_rect.setMinMax(tx, by, bx, ty);
        vb.addQuad(s_rect, this._glyph.uv, this.tint ? this._color : c_white);
        vb.addTriangles(-4);
        return 4;
    }
    drawLine(x, y, width, fontSize, type, vb) {
        return 0;
    }
    getLineHeight(size) {
        for (var key in this.glyphs) {
            let glyph = this.glyphs[key];
            if (this.resizable)
                return Math.round(glyph.lineHeight * size / this.size);
            else
                return glyph.lineHeight;
        }
        return 0;
    }
}
export class BMGlyph {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.advance = 0;
        this.lineHeight = 0;
        this.channel = 0;
        this.uv = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
    }
}
