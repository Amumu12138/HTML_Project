import { ObjectPropID } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GTextField } from "./GTextField";
import { GTextInput } from "./GTextInput";
export class GLabel extends GComponent {
    constructor() {
        super();
    }
    get icon() {
        if (this._iconObject)
            return this._iconObject.icon;
        else
            return null;
    }
    set icon(value) {
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }
    get title() {
        if (this._titleObject)
            return this._titleObject.text;
        else
            return null;
    }
    set title(value) {
        if (this._titleObject)
            this._titleObject.text = value;
        this.updateGear(6);
    }
    get text() {
        return this.title;
    }
    set text(value) {
        this.title = value;
    }
    get titleColor() {
        var tf = this.getTextField();
        if (tf)
            return tf.color;
        else
            return 0;
    }
    set titleColor(value) {
        var tf = this.getTextField();
        if (tf)
            tf.color = value;
        this.updateGear(4);
    }
    get titleFontSize() {
        var tf = this.getTextField();
        if (tf)
            return tf.textFormat.size;
        else
            return 0;
    }
    set titleFontSize(value) {
        var tf = this.getTextField();
        if (tf) {
            tf.textFormat.size = value;
            tf.applyFormat();
        }
    }
    get color() {
        return this.titleColor;
    }
    set color(value) {
        this.titleColor = value;
    }
    set editable(val) {
        if (this._titleObject instanceof GTextInput)
            this._titleObject.editable = val;
    }
    get editable() {
        if (this._titleObject instanceof GTextInput)
            return this._titleObject.editable;
        else
            return false;
    }
    getTextField() {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return this._titleObject.getTextField();
        else
            return null;
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.titleColor;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.outlineColor;
                    else
                        return 0;
                }
            case ObjectPropID.FontSize:
                return this.titleFontSize;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.titleColor = value;
                break;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.outlineColor = value;
                        tf.applyFormat();
                    }
                }
                break;
            case ObjectPropID.FontSize:
                this.titleFontSize = value;
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructExtension(buffer) {
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6))
            return;
        if (buffer.readByte() != this.packageItem.objectType)
            return;
        var str;
        str = buffer.readS();
        if (str != null)
            this.title = str;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        var iv = buffer.readInt();
        if (iv != 0)
            this.titleFontSize = iv;
        if (buffer.readBool()) {
            var input = this.getTextField();
            if (input instanceof GTextInput) {
                str = buffer.readS();
                if (str != null)
                    input.promptText = str;
                str = buffer.readS();
                if (str != null)
                    input.restrict = str;
                iv = buffer.readInt();
                if (iv != 0)
                    input.maxLength = iv;
                iv = buffer.readInt();
                if (iv != 0) {
                    if (iv == 4)
                        input.keyboardType = 'number';
                    else if (iv == 3)
                        input.keyboardType = 'url';
                }
                if (buffer.readBool())
                    input.password = true;
            }
            else
                buffer.skip(13);
        }
    }
}
