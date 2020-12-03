import { Vector2 } from "three";
export class TextFormat {
    constructor() {
        this.size = 0;
        this.color = 0;
        this.lineSpacing = 0;
        this.letterSpacing = 0;
        this.outline = 0;
        this.outlineColor = 0;
        this.shadowOffset = new Vector2();
        this.shadowColor = 0;
    }
    copy(source) {
        this.size = source.size;
        this.font = source.font;
        this.color = source.color;
        this.lineSpacing = source.lineSpacing;
        this.letterSpacing = source.letterSpacing;
        this.bold = source.bold;
        this.underline = source.underline;
        this.italic = source.italic;
        this.strikethrough = source.strikethrough;
        this.align = source.align;
        this.outline = source.outline;
        this.outlineColor = source.outlineColor;
        this.shadowOffset.copy(source.shadowOffset);
        this.shadowColor = source.shadowColor;
    }
    equalStyle(aFormat) {
        return this.size == aFormat.size && this.color == aFormat.color
            && this.bold == aFormat.bold && this.underline == aFormat.underline
            && this.italic == aFormat.italic
            && this.strikethrough == aFormat.strikethrough
            && this.align == aFormat.align;
    }
}
