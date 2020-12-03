import { XMLIterator, XMLTagType } from "./XMLIterator";
import { XMLUtils } from "./XMLUtils";
export class XML {
    constructor(XmlString) {
        if (XmlString)
            this.parse(XmlString);
    }
    get attributes() {
        if (!this._attributes)
            this._attributes = {};
        return this._attributes;
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
    setAttribute(attrName, attrValue) {
        if (!this._attributes)
            this._attributes = {};
        this._attributes[attrName] = attrValue;
    }
    getNode(selector) {
        if (!this._children)
            return null;
        else
            this._children.find(value => {
                return value.name == selector;
            });
    }
    elements(selector) {
        if (!this._children)
            this._children = new Array();
        if (selector)
            return this._children.filter(value => {
                return value.name == selector;
            });
        else
            return this._children;
    }
    parse(aSource) {
        this.reset();
        let lastOpenNode;
        let nodeStack = new Array();
        XMLIterator.begin(aSource);
        while (XMLIterator.nextTag()) {
            if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                let childNode;
                if (lastOpenNode)
                    childNode = new XML();
                else {
                    if (this.name != null) {
                        this.reset();
                        throw new Error("Invalid xml format - no root node.");
                    }
                    childNode = this;
                }
                childNode.name = XMLIterator.tagName;
                childNode._attributes = XMLIterator.getAttributes(childNode._attributes);
                if (lastOpenNode) {
                    if (XMLIterator.tagType != XMLTagType.Void)
                        nodeStack.push(lastOpenNode);
                    if (lastOpenNode._children == null)
                        lastOpenNode._children = new Array();
                    lastOpenNode._children.push(childNode);
                }
                if (XMLIterator.tagType != XMLTagType.Void)
                    lastOpenNode = childNode;
            }
            else if (XMLIterator.tagType == XMLTagType.End) {
                if (lastOpenNode == null || lastOpenNode.name != XMLIterator.tagName) {
                    this.reset();
                    throw new Error("Invalid xml format - <" + XMLIterator.tagName + "> dismatched.");
                }
                if (lastOpenNode._children == null || lastOpenNode._children.length == 0) {
                    lastOpenNode.text = XMLIterator.getText();
                }
                if (nodeStack.length > 0)
                    lastOpenNode = nodeStack.pop();
                else
                    lastOpenNode = null;
            }
        }
    }
    reset() {
        this._attributes = null;
        if (this._children != null)
            this._children.length == 0;
        this.text = null;
    }
}
