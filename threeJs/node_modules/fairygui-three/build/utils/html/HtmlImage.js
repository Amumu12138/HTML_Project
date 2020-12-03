import { LoaderFillType, ObjectType } from "../../ui/FieldTypes";
import { UIPackage, Decls } from "../../ui/UIPackage";
export class HtmlImage {
    constructor() {
        this.loader = Decls.UIObjectFactory.newObject(ObjectType.Loader);
        this.loader.fill = LoaderFillType.ScaleFree;
        this.loader.touchable = false;
    }
    get displayObject() {
        return this.loader.displayObject;
    }
    get element() {
        return this._element;
    }
    get width() {
        return this.loader.width;
    }
    get height() {
        return this.loader.height;
    }
    create(owner, element) {
        this._owner = owner;
        this._element = element;
        let sourceWidth = 0;
        let sourceHeight = 0;
        let src = element.getAttrString("src");
        if (src != null) {
            let pi = UIPackage.getItemByURL(src);
            if (pi) {
                sourceWidth = pi.width;
                sourceHeight = pi.height;
            }
        }
        this.loader.url = src;
        let width = element.getAttrInt("width", sourceWidth);
        let height = element.getAttrInt("height", sourceHeight);
        if (width == 0)
            width = 5;
        if (height == 0)
            height = 10;
        this.loader.setSize(width, height);
    }
    setPosition(x, y) {
        this.loader.setPosition(x, y);
    }
    add() {
        this._owner.addChild(this.loader.displayObject);
    }
    remove() {
        if (this.loader.displayObject.parent)
            this._owner.removeChild(this.loader.displayObject);
    }
    release() {
        this.loader.offAll();
        this.loader.url = null;
        this._owner = null;
        this._element = null;
    }
    dispose() {
        this.loader.dispose();
    }
}
