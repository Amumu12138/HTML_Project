import { SelectionShape } from "../../core/text/SelectionShape";
import { bubbleEvent } from "../../core/Stage";
export class HtmlLink {
    constructor() {
        this._shape = new SelectionShape();
        this._shape.on("click", () => {
            bubbleEvent(this._owner.obj3D, "click_link", this._element.getAttrString("href"));
        });
    }
    get displayObject() {
        return this._shape;
    }
    get element() {
        return this._element;
    }
    get width() {
        return 0;
    }
    get height() {
        return 0;
    }
    create(owner, element) {
        this._owner = owner;
        this._element = element;
    }
    setArea(startLine, startCharX, endLine, endCharX) {
        if (startLine == endLine && startCharX > endCharX) {
            let tmp = startCharX;
            startCharX = endCharX;
            endCharX = tmp;
        }
        this._shape.rects.length = 0;
        this._owner.getLinesShape(startLine, startCharX, endLine, endCharX, true, this._shape.rects);
        this._shape.refresh();
    }
    setPosition(x, y) {
        this._shape.setPosition(x, y);
    }
    add() {
        this._owner.addChild(this._shape);
    }
    remove() {
        if (this._shape.parent)
            this._owner.removeChild(this._shape);
    }
    release() {
        this._shape.offAll();
        this._owner = null;
        this._element = null;
    }
    dispose() {
        this._shape.dispose();
    }
}
