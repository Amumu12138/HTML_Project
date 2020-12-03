import { MovieClip } from "../core/MovieClip";
import { GObject } from "./GObject";
import { ObjectPropID } from "./FieldTypes";
export class GMovieClip extends GObject {
    constructor() {
        super();
    }
    get color() {
        return this._movieClip.graphics.color;
    }
    set color(value) {
        this._movieClip.graphics.color = value;
    }
    createDisplayObject() {
        this._displayObject = this._movieClip = new MovieClip();
    }
    get playing() {
        return this._movieClip.playing;
    }
    set playing(value) {
        if (this._movieClip.playing != value) {
            this._movieClip.playing = value;
            this.updateGear(5);
        }
    }
    get frame() {
        return this._movieClip.frame;
    }
    set frame(value) {
        if (this._movieClip.frame != value) {
            this._movieClip.frame = value;
            this.updateGear(5);
        }
    }
    get timeScale() {
        return this._movieClip.timeScale;
    }
    set timeScale(value) {
        this._movieClip.timeScale = value;
    }
    rewind() {
        this._movieClip.rewind();
    }
    syncStatus(anotherMc) {
        this._movieClip.syncStatus(anotherMc._movieClip);
    }
    advance(timeInMiniseconds) {
        this._movieClip.advance(timeInMiniseconds);
    }
    //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
    setPlaySettings(start, end, times, endAt) {
        this._movieClip.setPlaySettings(start, end, times, endAt);
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
                return this.timeScale;
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
                this.timeScale = value;
                break;
            case ObjectPropID.DeltaTime:
                this.advance(value);
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructFromResource() {
        var displayItem = this.packageItem.getBranch();
        this.sourceWidth = displayItem.width;
        this.sourceHeight = displayItem.height;
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;
        this.setSize(this.sourceWidth, this.sourceHeight);
        displayItem = displayItem.getHighResolution();
        displayItem.load();
        this._movieClip.interval = displayItem.interval;
        this._movieClip.swing = displayItem.swing;
        this._movieClip.repeatDelay = displayItem.repeatDelay;
        this._movieClip.frames = displayItem.frames;
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        if (buffer.readBool())
            this.color = buffer.readColor();
        this._movieClip.graphics.flip = buffer.readByte(); //flip
        this._movieClip.frame = buffer.readInt();
        this._movieClip.playing = buffer.readBool();
    }
}
