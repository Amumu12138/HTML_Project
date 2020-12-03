import { Vector2 } from "three";
import { TextFormat } from "../../core/text/TextFormat";
import { Pool } from "../Pool";
import { XMLIterator } from "../xml/XMLIterator";
import { XMLUtils } from "../xml/XMLUtils";
export var HtmlElementType;
(function (HtmlElementType) {
    HtmlElementType[HtmlElementType["Text"] = 0] = "Text";
    HtmlElementType[HtmlElementType["Link"] = 1] = "Link";
    HtmlElementType[HtmlElementType["Image"] = 2] = "Image";
    HtmlElementType[HtmlElementType["Input"] = 3] = "Input";
    HtmlElementType[HtmlElementType["Select"] = 4] = "Select";
    HtmlElementType[HtmlElementType["Object"] = 5] = "Object";
    //internal
    HtmlElementType[HtmlElementType["LinkEnd"] = 6] = "LinkEnd";
})(HtmlElementType || (HtmlElementType = {}));
export class HtmlElement {
    constructor() {
        this.format = new TextFormat();
        this.position = new Vector2();
    }
    getAttr(attrName) {
        if (this._attributes == null)
            return null;
        return this._attributes[attrName];
    }
    setAttr(attrName, attrValue) {
        if (this._attributes == null)
            this._attributes = {};
        this._attributes[attrName] = attrValue;
    }
    getAttrString(attrName, defValue) {
        return XMLUtils.getString(this._attributes, attrName, defValue);
    }
    getAttrInt(attrName, defValue) {
        return XMLUtils.getInt(this._attributes, attrName, defValue);
    }
    getAttrFloat(attrName, defValue) {
        return XMLUtils.getFloat(this._attributes, attrName, defValue);
    }
    getAttrBool(attrName, defValue) {
        return XMLUtils.getBool(this._attributes, attrName, defValue);
    }
    getAttrColor(attrName, defValue) {
        return XMLUtils.getColor(this._attributes, attrName, defValue);
    }
    fetchAttributes() {
        this._attributes = XMLIterator.getAttributes(this._attributes);
    }
    get isEntity() {
        return this.type == HtmlElementType.Image || this.type == HtmlElementType.Select
            || this.type == HtmlElementType.Input || this.type == HtmlElementType.Object;
    }
    reset() {
        this.name = null;
        this.text = null;
        this.htmlObject = null;
        this.status = 0;
        this._attributes = null;
    }
}
export var elementPool = new Pool(HtmlElement, (element, ...argArray) => {
    element.type = argArray[0];
    if (element.type != HtmlElementType.Text && element._attributes == null)
        element._attributes = {};
}, element => element.reset());
