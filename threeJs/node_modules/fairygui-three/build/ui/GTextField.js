import { InputTextField } from "../core/text/InputTextField";
import { TextField } from "../core/text/TextField";
import { AutoSizeType, ObjectPropID } from "./FieldTypes";
import { GObject } from "./GObject";
import { UIConfig } from "./UIConfig";
import { defaultParser } from "../utils/UBBParser";
import { XMLUtils } from "../utils/xml/XMLUtils";
export class GTextField extends GObject {
    constructor() {
        super();
        let tf = this._textField.textFormat;
        tf.font = UIConfig.defaultFont;
        tf.size = 12;
        tf.lineSpacing = 3;
        this._textField.applyFormat();
        this._text = "";
        this._textField.autoSize = AutoSizeType.Both;
        this._textField.wordWrap = false;
    }
    createDisplayObject() {
        this._displayObject = this._textField = new TextField();
    }
    get text() {
        if (this._displayObject instanceof InputTextField)
            this._text = this._textField.text;
        return this._text;
    }
    set text(value) {
        if (value == null)
            value = "";
        this._text = value;
        this.setText();
        this.updateSize();
        this.updateGear(6);
    }
    setText() {
        let str = this._text;
        if (this._template)
            str = this.parseTemplate(str);
        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled)
            this._textField.htmlText = defaultParser.parse(XMLUtils.encodeString(str));
        else
            this._textField.text = str;
    }
    get textTemplate() {
        return this._template;
    }
    set textTemplate(value) {
        if (!this._template && !value)
            return;
        this._template = value;
        this.flushVars();
    }
    setVar(name, value) {
        if (!this._template)
            this._template = {};
        this._template[name] = value;
        return this;
    }
    flushVars() {
        this.setText();
        this.updateSize();
    }
    get textFormat() {
        return this._textField.textFormat;
    }
    applyFormat() {
        this._textField.applyFormat();
        if (!this._underConstruct)
            this.updateSize();
    }
    get align() {
        return this._textField.align;
    }
    set align(value) {
        this._textField.align = value;
    }
    get verticalAlign() {
        return this._textField.verticalAlign;
    }
    set verticalAlign(value) {
        this._textField.verticalAlign = value;
    }
    get singleLine() {
        return this._textField.singleLine;
    }
    set singleLine(value) {
        this._textField.singleLine = value;
    }
    set ubbEnabled(value) {
        this._ubbEnabled = value;
    }
    get ubbEnabled() {
        return this._ubbEnabled;
    }
    get autoSize() {
        return this._textField.autoSize;
    }
    set autoSize(value) {
        this._textField.autoSize = value;
        if (value == AutoSizeType.Both) {
            this._textField.wordWrap = false;
            if (!this._underConstruct)
                this.setSize(this._textField.textWidth, this._textField.textHeight);
        }
        else {
            this._textField.wordWrap = true;
            if (value == AutoSizeType.Height) {
                if (!this._underConstruct) {
                    this._textField.width = this.width;
                    this.height = this._textField.textHeight;
                }
            }
            else
                this._textField.setSize(this.width, this.height);
        }
    }
    get textWidth() {
        return this._textField.textWidth;
    }
    get textHeight() {
        return this._textField.textHeight;
    }
    get color() {
        return this._textField.textFormat.color;
    }
    set color(value) {
        if (this._textField.textFormat.color != value) {
            // if (this.grayed)
            //     this._textField.color = "#AAAAAA";
            // else
            //     this._textField.color = this._color;
            this._textField.textFormat.color = value;
            this._textField.applyFormat();
            this.updateGear(4);
        }
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.color;
            case ObjectPropID.OutlineColor:
                return this._textField.textFormat.outlineColor;
            case ObjectPropID.FontSize:
                return this._textField.textFormat.size;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.color = value;
                break;
            case ObjectPropID.OutlineColor:
                this._textField.textFormat.outlineColor = value;
                this._textField.applyFormat();
                break;
            case ObjectPropID.FontSize:
                this._textField.textFormat.size = value;
                this._textField.applyFormat();
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    updateSize() {
        if (this._updatingSize)
            return;
        this._updatingSize = true;
        if (this._textField.autoSize == AutoSizeType.Both) {
            this.setSize(this._textField.width, this._textField.height);
        }
        else if (this._textField.autoSize == AutoSizeType.Height) {
            this.height = this._textField.height;
        }
        this._updatingSize = false;
    }
    handleSizeChanged() {
        if (this._updatingSize)
            return;
        if (this._underConstruct)
            this._textField.setSize(this.width, this.height);
        else if (this._textField.autoSize != AutoSizeType.Both) {
            if (this._textField.autoSize == AutoSizeType.Height) {
                this._textField.width = this.width; //先调整宽度，让文本重排
                if (this._text != "") //文本为空时，1是本来就不需要调整， 2是为了防止改掉文本为空时的默认高度，造成关联错误
                    this.setSizeDirectly(this.width, this._textField.height);
            }
            else
                this._textField.setSize(this.width, this.height);
        }
    }
    // protected handleGrayedChanged(): void {
    //     super.handleGrayedChanged();
    //     if (this.grayed)
    //         this._textField.color = "#AAAAAA";
    //     else
    //         this._textField.color = this._color;
    // }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        let tf = this._textField.textFormat;
        tf.font = buffer.readS();
        tf.size = buffer.readShort();
        tf.color = buffer.readColor();
        let c = buffer.readByte();
        this.align = c == 0 ? "left" : (c == 1 ? "center" : "right");
        c = buffer.readByte();
        this.verticalAlign = c == 0 ? "top" : (c == 1 ? "middle" : "bottom");
        tf.lineSpacing = buffer.readShort();
        tf.letterSpacing = buffer.readShort();
        this.ubbEnabled = buffer.readBool();
        this.autoSize = buffer.readByte();
        tf.underline = buffer.readBool();
        tf.italic = buffer.readBool();
        tf.bold = buffer.readBool();
        this.singleLine = buffer.readBool();
        if (buffer.readBool()) {
            tf.outlineColor = buffer.readColor();
            tf.outline = buffer.readFloat() + 1;
        }
        if (buffer.readBool()) //shadow
         {
            tf.shadowColor = buffer.readColor();
            let f1 = buffer.readFloat();
            let f2 = buffer.readFloat();
            tf.shadowOffset.set(f1, f2);
        }
        if (buffer.readBool())
            this._template = {};
        if (buffer.version >= 3)
            tf.strikethrough = buffer.readBool();
        this._textField.applyFormat();
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        buffer.seek(beginPos, 6);
        var str = buffer.readS();
        if (str != null)
            this.text = str;
    }
    parseTemplate(template) {
        var pos1 = 0, pos2, pos3;
        var tag;
        var value;
        var result = "";
        while ((pos2 = template.indexOf("{", pos1)) != -1) {
            if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92) //\
             {
                result += template.substring(pos1, pos2 - 1);
                result += "{";
                pos1 = pos2 + 1;
                continue;
            }
            result += template.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = template.indexOf("}", pos1);
            if (pos2 == -1)
                break;
            if (pos2 == pos1 + 1) {
                result += template.substr(pos1, 2);
                pos1 = pos2 + 1;
                continue;
            }
            tag = template.substring(pos1 + 1, pos2);
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                value = this._template[tag.substring(0, pos3)];
                if (value == null)
                    result += tag.substring(pos3 + 1);
                else
                    result += value;
            }
            else {
                value = this._template[tag];
                if (value != null)
                    result += value;
            }
            pos1 = pos2 + 1;
        }
        if (pos1 < template.length)
            result += template.substr(pos1);
        return result;
    }
}
