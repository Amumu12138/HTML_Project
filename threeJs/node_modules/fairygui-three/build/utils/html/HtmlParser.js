import { TextFormat } from "../../core/text/TextFormat";
import { convertFromHtmlColor } from "../ToolSet";
import { XMLIterator, XMLTagType } from "../xml/XMLIterator";
import { XMLUtils } from "../xml/XMLUtils";
import { HtmlElementType, elementPool } from "./HtmlElement";
import { HtmlParseOptions } from "./HtmlParseOptions";
var s_list1 = new Array();
var s_list2 = new Array();
export class HtmlParser {
    constructor() {
        this._textFormatStack = new Array();
        this._format = new TextFormat();
        this._defaultOptions = new HtmlParseOptions();
    }
    parse(aSource, defaultFormat, elements, parseOptions) {
        if (parseOptions == null)
            parseOptions = this._defaultOptions;
        this._elements = elements;
        this._textFormatStackTop = 0;
        this._format.copy(defaultFormat);
        this._format["colorChanged"] = false;
        let skipText = 0;
        let ignoreWhiteSpace = parseOptions.ignoreWhiteSpace;
        let skipNextCR = false;
        let text;
        XMLIterator.begin(aSource, true);
        while (XMLIterator.nextTag()) {
            if (skipText == 0) {
                text = XMLIterator.getText(ignoreWhiteSpace);
                if (text.length > 0) {
                    if (skipNextCR && text[0] == '\n')
                        text = text.substr(1);
                    this.appendText(text);
                }
            }
            skipNextCR = false;
            switch (XMLIterator.tagName) {
                case "b":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.bold = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                case "i":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.italic = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                case "u":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.underline = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                case "strike":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.strikethrough = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                // case "sub":
                //     {
                //         if (XMLIterator.tagType == XMLTagType.Start) {
                //             this.pushTextFormat();
                //             this._format.specialStyle = TextFormat.SpecialStyle.Subscript;
                //         }
                //         else
                //             this.popTextFormat();
                //     }
                //     break;
                // case "sup":
                //     {
                //         if (XMLIterator.tagType == XMLTagType.Start) {
                //             this.pushTextFormat();
                //             this._format.specialStyle = TextFormat.SpecialStyle.Superscript;
                //         }
                //         else
                //             this.popTextFormat();
                //     }
                //     break;
                case "font":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.size = XMLUtils.getInt(XMLIterator.attributes, "size", this._format.size);
                        let color = XMLIterator.getAttribute("color");
                        if (color != null)
                            this._format.color = convertFromHtmlColor(color);
                    }
                    else if (XMLIterator.tagType == XMLTagType.End)
                        this.popTextFormat();
                    break;
                case "br":
                    this.appendText("\n");
                    break;
                case "img":
                    if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                        let element = elementPool.borrow(HtmlElementType.Image);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.format.align = this._format.align;
                        this._elements.push(element);
                    }
                    break;
                case "a":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.underline = this._format.underline || parseOptions.linkUnderline;
                        if (!this._format["colorChanged"])
                            this._format.color = parseOptions.linkColor;
                        let element = elementPool.borrow(HtmlElementType.Link);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.format.align = this._format.align;
                        this._elements.push(element);
                    }
                    else if (XMLIterator.tagType == XMLTagType.End) {
                        this.popTextFormat();
                        let element = elementPool.borrow(HtmlElementType.LinkEnd);
                        this._elements.push(element);
                    }
                    break;
                case "input":
                    {
                        let element = elementPool.borrow(HtmlElementType.Input);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.format.copy(this._format);
                        this._elements.push(element);
                    }
                    break;
                case "select":
                    {
                        if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                            let element = elementPool.borrow(HtmlElementType.Select);
                            element.fetchAttributes();
                            if (XMLIterator.tagType == XMLTagType.Start) {
                                s_list1.length = 0;
                                s_list2.length = 0;
                                while (XMLIterator.nextTag()) {
                                    if (XMLIterator.tagName == "select")
                                        break;
                                    if (XMLIterator.tagName == "option") {
                                        if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void)
                                            s_list2.push(XMLUtils.getString(XMLIterator.attributes, "value", ""));
                                        else
                                            s_list1.push(XMLIterator.getText());
                                    }
                                }
                                element.setAttr("items", s_list1.slice());
                                element.setAttr("values", s_list2.slice());
                            }
                            element.name = element.getAttrString("name");
                            element.format.copy(this._format);
                            this._elements.push(element);
                        }
                    }
                    break;
                case "p":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.align = XMLIterator.getAttribute("align");
                        if (!this.isNewLine())
                            this.appendText("\n");
                    }
                    else if (XMLIterator.tagType == XMLTagType.End) {
                        this.appendText("\n");
                        skipNextCR = true;
                        this.popTextFormat();
                    }
                    break;
                case "ui":
                case "div":
                case "li":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        if (!this.isNewLine())
                            this.appendText("\n");
                    }
                    else {
                        this.appendText("\n");
                        skipNextCR = true;
                    }
                    break;
                case "html":
                case "body":
                    //full html
                    ignoreWhiteSpace = true;
                    break;
                case "head":
                case "style":
                case "script":
                case "form":
                    if (XMLIterator.tagType == XMLTagType.Start)
                        skipText++;
                    else if (XMLIterator.tagType == XMLTagType.End)
                        skipText--;
                    break;
            }
        }
        if (skipText == 0) {
            text = XMLIterator.getText(ignoreWhiteSpace);
            if (text.length > 0) {
                if (skipNextCR && text[0] == '\n')
                    text = text.substr(1);
                this.appendText(text);
            }
        }
        this._elements = null;
    }
    pushTextFormat() {
        let tf;
        if (this._textFormatStack.length <= this._textFormatStackTop) {
            tf = new TextFormat();
            this._textFormatStack.push(tf);
        }
        else
            tf = this._textFormatStack[this._textFormatStackTop];
        tf.copy(this._format);
        tf["colorChanged"] = this._format["colorChanged"];
        this._textFormatStackTop++;
    }
    popTextFormat() {
        if (this._textFormatStackTop > 0) {
            let tf = this._textFormatStack[this._textFormatStackTop - 1];
            this._format.copy(tf);
            this._format["colorChanged"] = tf["colorChanged"];
            this._textFormatStackTop--;
        }
    }
    isNewLine() {
        if (this._elements.length > 0) {
            let element = this._elements[this._elements.length - 1];
            if (element && element.type == HtmlElementType.Text)
                return element.text.endsWith("\n");
            else
                return false;
        }
        return true;
    }
    appendText(text) {
        let element;
        if (this._elements.length > 0) {
            element = this._elements[this._elements.length - 1];
            if (element.type == HtmlElementType.Text && element.format.equalStyle(this._format)) {
                element.text += text;
                return;
            }
        }
        element = elementPool.borrow(HtmlElementType.Text);
        element.text = text;
        element.format.copy(this._format);
        this._elements.push(element);
    }
}
export var defaultParser = new HtmlParser();
