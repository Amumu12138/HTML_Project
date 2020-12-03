import { BaseFont } from "./BaseFont";
export declare class FontManager {
    static fonts: {
        [index: string]: BaseFont;
    };
    static packageFontGetter: (name: string) => BaseFont;
    static registerFont(font: BaseFont): void;
    static unregisterFont(font: BaseFont): void;
    static getFont(name: string): BaseFont;
}
