import { DisplayObject } from "../core/DisplayObject";
import { MovieClip } from "../core/MovieClip";
import { NTexture } from "../core/NTexture";
import { LoaderFillType, ObjectPropID, PackageItemType } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GObject } from "./GObject";
import { UIPackage } from "./UIPackage";
import { TextureLoader } from "three";
export class GLoader extends GObject {
    constructor() {
        super();
        this._url = "";
        this._fill = LoaderFillType.None;
        this._align = "left";
        this._valign = "top";
    }
    createDisplayObject() {
        this._displayObject = new DisplayObject();
        this._content = new MovieClip();
        this._displayObject.addChild(this._content);
    }
    dispose() {
        if (this._contentItem && this._content.texture) {
            this.freeExternal(this._content.texture);
        }
        if (this._content2)
            this._content2.dispose();
        super.dispose();
    }
    get url() {
        return this._url;
    }
    set url(value) {
        if (this._url == value)
            return;
        this._url = value;
        this.loadContent();
        this.updateGear(7);
    }
    get icon() {
        return this._url;
    }
    set icon(value) {
        this.url = value;
    }
    get align() {
        return this._align;
    }
    set align(value) {
        if (this._align != value) {
            this._align = value;
            this.updateLayout();
        }
    }
    get verticalAlign() {
        return this._valign;
    }
    set verticalAlign(value) {
        if (this._valign != value) {
            this._valign = value;
            this.updateLayout();
        }
    }
    get fill() {
        return this._fill;
    }
    set fill(value) {
        if (this._fill != value) {
            this._fill = value;
            this.updateLayout();
        }
    }
    get shrinkOnly() {
        return this._shrinkOnly;
    }
    set shrinkOnly(value) {
        if (this._shrinkOnly != value) {
            this._shrinkOnly = value;
            this.updateLayout();
        }
    }
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(value) {
        if (this._autoSize != value) {
            this._autoSize = value;
            this.updateLayout();
        }
    }
    get playing() {
        return this._content.playing;
    }
    set playing(value) {
        if (this._content.playing != value) {
            this._content.playing = value;
            this.updateGear(5);
        }
    }
    get frame() {
        return this._content.frame;
    }
    set frame(value) {
        if (this._content.frame != value) {
            this._content.frame = value;
            this.updateGear(5);
        }
    }
    get color() {
        return this._content.graphics.color;
    }
    set color(value) {
        if (this._content.graphics.color != value) {
            this._content.graphics.color = value;
            this.updateGear(4);
        }
    }
    get fillMethod() {
        return this._content.fillMethod;
    }
    set fillMethod(value) {
        this._content.fillMethod = value;
    }
    get fillOrigin() {
        return this._content.fillOrigin;
    }
    set fillOrigin(value) {
        this._content.fillOrigin = value;
    }
    get fillClockwise() {
        return this._content.fillClockwise;
    }
    set fillClockwise(value) {
        this._content.fillClockwise = value;
    }
    get fillAmount() {
        return this._content.fillAmount;
    }
    set fillAmount(value) {
        this._content.fillAmount = value;
    }
    get content() {
        return this._content;
    }
    get component() {
        return this._content2;
    }
    loadContent() {
        this.clearContent();
        if (!this._url)
            return;
        if (this._url.startsWith("ui://"))
            this.loadFromPackage(this._url);
        else
            this.loadExternal();
    }
    loadFromPackage(itemURL) {
        this._contentItem = UIPackage.getItemByURL(itemURL);
        if (this._contentItem) {
            this._contentItem = this._contentItem.getBranch();
            this.sourceWidth = this._contentItem.width;
            this.sourceHeight = this._contentItem.height;
            this._contentItem = this._contentItem.getHighResolution();
            this._contentItem.load();
            if (this._autoSize)
                this.setSize(this.sourceWidth, this.sourceHeight);
            if (this._contentItem.type == PackageItemType.Image) {
                if (this._contentItem.texture == null) {
                    this.setErrorState();
                }
                else {
                    this._content.texture = this._contentItem.texture;
                    this._content.scale9Grid = this._contentItem.scale9Grid;
                    this._content.scaleByTile = this._contentItem.scaleByTile;
                    this._content.tileGridIndice = this._contentItem.tileGridIndice;
                    this.sourceWidth = this._contentItem.width;
                    this.sourceHeight = this._contentItem.height;
                    this.updateLayout();
                }
            }
            else if (this._contentItem.type == PackageItemType.MovieClip) {
                this.sourceWidth = this._contentItem.width;
                this.sourceHeight = this._contentItem.height;
                this._content.interval = this._contentItem.interval;
                this._content.swing = this._contentItem.swing;
                this._content.repeatDelay = this._contentItem.repeatDelay;
                this._content.frames = this._contentItem.frames;
                this.updateLayout();
            }
            else if (this._contentItem.type == PackageItemType.Component) {
                var obj = UIPackage.createObjectFromURL(itemURL);
                if (!obj)
                    this.setErrorState();
                else if (!(obj instanceof GComponent)) {
                    obj.dispose();
                    this.setErrorState();
                }
                else {
                    this._content2 = obj;
                    this._displayObject.addChild(this._content2.displayObject);
                    this.updateLayout();
                }
            }
            else
                this.setErrorState();
        }
        else
            this.setErrorState();
    }
    loadExternal() {
        let url = this._url;
        new TextureLoader().load(this._url, tex => {
            if (url == this._url)
                this.onExternalLoadSuccess(new NTexture(tex));
        });
    }
    freeExternal(texture) {
    }
    onExternalLoadSuccess(texture) {
        this._content.texture = texture;
        this._content.scale9Grid = null;
        this._content.scaleByTile = false;
        this.sourceWidth = texture.width;
        this.sourceHeight = texture.height;
        this.updateLayout();
    }
    onExternalLoadFailed() {
        this.setErrorState();
    }
    setErrorState() {
    }
    clearErrorState() {
    }
    updateLayout() {
        if (!this._content2 && !this._content.texture && !this._content.frames) {
            if (this._autoSize) {
                this._updatingLayout = true;
                this.setSize(50, 30);
                this._updatingLayout = false;
            }
            return;
        }
        let cw = this.sourceWidth;
        let ch = this.sourceHeight;
        if (this._autoSize) {
            this._updatingLayout = true;
            if (cw == 0)
                cw = 50;
            if (ch == 0)
                ch = 30;
            this.setSize(cw, ch);
            this._updatingLayout = false;
            if (cw == this._width && ch == this._height) {
                if (this._content2) {
                    this._content2.setPosition(0, 0);
                    this._content2.setScale(1, 1);
                }
                else {
                    this._content.setSize(cw, ch);
                    this._content.setPosition(0, 0);
                }
                return;
            }
        }
        var sx = 1, sy = 1;
        if (this._fill != LoaderFillType.None) {
            sx = this.width / this.sourceWidth;
            sy = this.height / this.sourceHeight;
            if (sx != 1 || sy != 1) {
                if (this._fill == LoaderFillType.ScaleMatchHeight)
                    sx = sy;
                else if (this._fill == LoaderFillType.ScaleMatchWidth)
                    sy = sx;
                else if (this._fill == LoaderFillType.Scale) {
                    if (sx > sy)
                        sx = sy;
                    else
                        sy = sx;
                }
                else if (this._fill == LoaderFillType.ScaleNoBorder) {
                    if (sx > sy)
                        sy = sx;
                    else
                        sx = sy;
                }
                if (this._shrinkOnly) {
                    if (sx > 1)
                        sx = 1;
                    if (sy > 1)
                        sy = 1;
                }
                cw = this.sourceWidth * sx;
                ch = this.sourceHeight * sy;
            }
        }
        if (this._content2)
            this._content2.setScale(sx, sy);
        else
            this._content.setSize(cw, ch);
        var nx, ny;
        if (this._align == "center")
            nx = Math.floor((this.width - cw) / 2);
        else if (this._align == "right")
            nx = this.width - cw;
        else
            nx = 0;
        if (this._valign == "middle")
            ny = Math.floor((this.height - ch) / 2);
        else if (this._valign == "bottom")
            ny = this.height - ch;
        else
            ny = 0;
        if (this._content2)
            this._content2.setPosition(nx, ny);
        else
            this._content.setPosition(nx, ny);
    }
    clearContent() {
        this.clearErrorState();
        if (!this._contentItem && this._content.texture) {
            this.freeExternal(this._content.texture);
        }
        this._content.texture = null;
        this._content.frames = null;
        if (this._content2) {
            this._content2.dispose();
            this._content2 = null;
        }
        this._contentItem = null;
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (!this._updatingLayout)
            this.updateLayout();
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.color;
            case ObjectPropID.Playing:
                return this.playing;
            case ObjectPropID.Frame:
                return this.frame;
            case ObjectPropID.TimeScale:
                return this._content.timeScale;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.color = value;
                break;
            case ObjectPropID.Playing:
                this.playing = value;
                break;
            case ObjectPropID.Frame:
                this.frame = value;
                break;
            case ObjectPropID.TimeScale:
                this._content.timeScale = value;
                break;
            case ObjectPropID.DeltaTime:
                this._content.advance(value);
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        var iv;
        this._url = buffer.readS();
        iv = buffer.readByte();
        this._align = iv == 0 ? "left" : (iv == 1 ? "center" : "right");
        iv = buffer.readByte();
        this._valign = iv == 0 ? "top" : (iv == 1 ? "middle" : "bottom");
        this._fill = buffer.readByte();
        this._shrinkOnly = buffer.readBool();
        this._autoSize = buffer.readBool();
        buffer.readBool(); //_showErrorSign
        this._content.playing = buffer.readBool();
        this._content.frame = buffer.readInt();
        if (buffer.readBool())
            this.color = buffer.readColor();
        this._content.fillMethod = buffer.readByte();
        if (this._content.fillMethod != 0) {
            this._content.fillOrigin = buffer.readByte();
            this._content.fillClockwise = buffer.readBool();
            this._content.fillAmount = buffer.readFloat();
        }
        if (this._url)
            this.loadContent();
    }
}
