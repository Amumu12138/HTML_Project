import { GTextField } from "./GTextField";
import { InputTextField } from "../core/text/InputTextField";
export class GTextInput extends GTextField {
    constructor() {
        super();
    }
    createDisplayObject() {
        this._displayObject = this._textField = new InputTextField();
    }
    get password() {
        return this._textField.password;
    }
    set password(value) {
        this._textField.password = value;
    }
    get keyboardType() {
        return this._textField.keyboardType;
    }
    set keyboardType(value) {
        this._textField.keyboardType = value;
    }
    set editable(value) {
        this._textField.editable = value;
    }
    get editable() {
        return this._textField.editable;
    }
    set maxLength(value) {
        this._textField.maxLength = value;
    }
    get maxLength() {
        return this._textField.maxLength;
    }
    set promptText(value) {
        this._textField.promptText = value;
    }
    get promptText() {
        return this._textField.promptText;
    }
    set restrict(value) {
        this._textField.restrict = value;
    }
    get restrict() {
        return this._textField.restrict;
    }
    requestFocus() {
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 4);
        var str = buffer.readS();
        if (str != null)
            this.promptText = str;
        str = buffer.readS();
        if (str != null)
            this.restrict = str;
        var iv = buffer.readInt();
        if (iv != 0)
            this.maxLength = iv;
        iv = buffer.readInt();
        if (iv != 0) {
            if (iv == 4)
                this.keyboardType = "number";
            else if (iv == 3)
                this.keyboardType = "url";
        }
        if (buffer.readBool())
            this.password = true;
    }
}
