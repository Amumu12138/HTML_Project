import { Pool } from "../Pool";
import { HtmlElementType } from "./HtmlElement";
import { HtmlImage } from "./HtmlImage";
import { HtmlLink } from "./HtmlLink";
export class HtmlPageContext {
    constructor() {
        this._imagePool = new Pool(HtmlImage);
        this._linkPool = new Pool(HtmlLink);
    }
    createObject(owner, element) {
        let ret = null;
        if (element.type == HtmlElementType.Image)
            ret = this._imagePool.borrow();
        else if (element.type == HtmlElementType.Link)
            ret = this._linkPool.borrow();
        if (ret)
            ret.create(owner, element);
        return ret;
    }
    freeObject(obj) {
        obj.release();
        if (obj instanceof HtmlImage)
            this._imagePool.returns(obj);
        else if (obj instanceof HtmlLink)
            this._linkPool.returns(obj);
    }
}
export var defaultContext = new HtmlPageContext();
