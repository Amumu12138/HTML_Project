import { DynamicFont } from "./DynamicFont";
export class FontManager {
    static registerFont(font) {
        this.fonts[font.name] = font;
    }
    static unregisterFont(font) {
        this.fonts[font.name] = undefined;
    }
    static getFont(name) {
        if (this.packageFontGetter && name.startsWith("ui://")) {
            let font = this.packageFontGetter(name);
            if (font)
                return font;
        }
        let font = this.fonts[name];
        if (!font) {
            font = new DynamicFont();
            font.name = name;
            this.fonts[name] = font;
        }
        return font;
    }
}
FontManager.fonts = {};
