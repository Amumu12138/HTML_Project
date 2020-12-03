import { HtmlElementType } from "../../utils/html/HtmlElement";
import { defaultContext } from "../../utils/html/HtmlPageContext";
import { HtmlParseOptions } from "../../utils/html/HtmlParseOptions";
import { TextField } from "./TextField";
export class RichTextField extends TextField {
    constructor() {
        super();
        this._touchDisabled = false;
        this.opaque = true;
        this.isRich = true;
        this.htmlPageContext = defaultContext;
        this.htmlParseOptions = new HtmlParseOptions();
    }
    getHtmlElement(name) {
        let elements = this.htmlElements;
        let count = elements.length;
        for (let i = 0; i < count; i++) {
            let element = elements[i];
            if (name == element.name)
                return element;
        }
        return null;
    }
    showHtmlObject(index, show) {
        let element = this.htmlElements[index];
        if (element.htmlObject && element.type != HtmlElementType.Link) {
            //set hidden flag
            if (show)
                element.status &= 253; //~(1<<1)
            else
                element.status |= 2;
            if ((element.status & 3) == 0) //not (hidden and clipped)
             {
                if ((element.status & 4) == 0) //not added
                 {
                    element.status |= 4;
                    element.htmlObject.add();
                }
            }
            else {
                if ((element.status & 4) != 0) //added
                 {
                    element.status &= 251;
                    element.htmlObject.remove();
                }
            }
        }
    }
    dispose() {
        this.cleanupObjects();
        super.dispose();
    }
    cleanupObjects() {
        let elements = this.htmlElements;
        let count = elements.length;
        for (let i = 0; i < count; i++) {
            let element = elements[i];
            if (element.htmlObject) {
                element.htmlObject.remove();
                this.htmlPageContext.freeObject(element.htmlObject);
            }
        }
    }
    refreshObjects() {
        let elements = this.htmlElements;
        let count = elements.length;
        for (let i = 0; i < count; i++) {
            let element = elements[i];
            if (element.htmlObject) {
                if ((element.status & 3) == 0) //not (hidden and clipped)
                 {
                    if ((element.status & 4) == 0) //not added
                     {
                        element.status |= 4;
                        element.htmlObject.add();
                    }
                }
                else {
                    if ((element.status & 4) != 0) //added
                     {
                        element.status &= 251;
                        element.htmlObject.remove();
                    }
                }
            }
        }
    }
}
