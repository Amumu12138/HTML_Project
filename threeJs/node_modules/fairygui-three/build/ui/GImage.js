import { Image } from "../core/Image";
import { ObjectPropID } from "./FieldTypes";
import { GObject } from "./GObject";
export class GImage extends GObject {
    constructor() {
        super();
    }
    get color() {
        return this._image.graphics.color;
    }
    set color(value) {
        if (this._image.graphics.color != value) {
            this._image.graphics.color = value;
            this.updateGear(4);
        }
    }
    get flip() {
        return this._image.graphics.flip;
    }
    set flip(value) {
        this._image.graphics.flip = value;
    }
    get fillMethod() {
        return this._image.fillMethod;
    }
    set fillMethod(value) {
        this._image.fillMethod = value;
    }
    get fillOrigin() {
        return this._image.fillOrigin;
    }
    set fillOrigin(value) {
        this._image.fillOrigin = value;
    }
    get fillClockwise() {
        return this._image.fillClockwise;
    }
    set fillClockwise(value) {
        this._image.fillClockwise = value;
    }
    get fillAmount() {
        return this._image.fillAmount;
    }
    set fillAmount(value) {
        this._image.fillAmount = value;
    }
    createDisplayObject() {
        this._displayObject = this._image = new Image();
    }
    handleSizeChanged() {
        this._image.width = this._width;
        this._image.height = this._height;
    }
    constructFromResource() {
        this._contentItem = this.packageItem.getBranch();
        this.sourceWidth = this._contentItem.width;
        this.sourceHeight = this._contentItem.height;
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;
        this._contentItem = this._contentItem.getHighResolution();
        this._contentItem.load();
        this._image.scale9Grid = this._contentItem.scale9Grid;
        this._image.scaleByTile = this._contentItem.scaleByTile;
        this._image.tileGridIndice = this._contentItem.tileGridIndice;
        this._image.texture = this._contentItem.texture;
        this.setSize(this.sourceWidth, this.sourceHeight);
    }
    getProp(index) {
        if (index == ObjectPropID.Color)
            return this.color;
        else
            return super.getProp(index);
    }
    setProp(index, value) {
        if (index == ObjectPropID.Color)
            this.color = value;
        else
            super.setProp(index, value);
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        if (buffer.readBool())
            this.color = buffer.readColor();
        this.flip = buffer.readByte();
        this._image.fillMethod = buffer.readByte();
        if (this._image.fillMethod != 0) {
            this._image.fillOrigin = buffer.readByte();
            this._image.fillClockwise = buffer.readBool();
            this._image.fillAmount = buffer.readFloat();
        }
    }
}
