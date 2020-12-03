import { GComponent } from "./GComponent";
import { Vector2 } from "three";
var s_vec2 = new Vector2();
export class GScrollBar extends GComponent {
    constructor() {
        super();
        this._dragOffset = new Vector2();
        this._scrollPerc = 0;
    }
    setScrollPane(target, vertical) {
        this._target = target;
        this._vertical = vertical;
    }
    setDisplayPerc(value) {
        if (this._vertical) {
            if (!this._fixedGripSize)
                this._grip.height = Math.floor(value * this._bar.height);
            this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
        }
        else {
            if (!this._fixedGripSize)
                this._grip.width = Math.floor(value * this._bar.width);
            this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
        }
        this._grip.visible = value != 0 && value != 1;
    }
    setScrollPerc(val) {
        this._scrollPerc = val;
        if (this._vertical)
            this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
        else
            this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
    }
    get minSize() {
        if (this._vertical)
            return (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0);
        else
            return (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
    }
    get gripDragging() {
        return this._gripDragging;
    }
    constructExtension(buffer) {
        buffer.seek(0, 6);
        this._fixedGripSize = buffer.readBool();
        this._grip = this.getChild("grip");
        if (!this._grip) {
            console.warn("需要定义grip");
            return;
        }
        this._bar = this.getChild("bar");
        if (!this._bar) {
            console.warn("需要定义bar");
            return;
        }
        this._arrowButton1 = this.getChild("arrow1");
        this._arrowButton2 = this.getChild("arrow2");
        this._grip.on("touch_begin", this.__gripTouchBegin, this);
        this._grip.on("touch_move", this.__gripTouchMove, this);
        this._grip.on("touch_end", this.__gripTouchEnd, this);
        this.on("touch_begin", this.__barTouchBegin, this);
        if (this._arrowButton1)
            this._arrowButton1.on("touch_begin", this.__arrowButton1Click, this);
        if (this._arrowButton2)
            this._arrowButton2.on("touch_begin", this.__arrowButton2Click, this);
    }
    __gripTouchBegin(evt) {
        if (this._bar == null)
            return;
        evt.stopPropagation();
        this._gripDragging = true;
        this._target.updateScrollBarVisible();
        this.globalToLocal(evt.input.x, evt.input.y, this._dragOffset);
        this._dragOffset.x -= this._grip.x;
        this._dragOffset.y -= this._grip.y;
    }
    __gripTouchMove(evt) {
        if (!this.onStage)
            return;
        var pt = this.globalToLocal(evt.input.x, evt.input.y, s_vec2);
        if (this._vertical) {
            let curY = pt.y - this._dragOffset.y;
            let diff = this._bar.height - this._grip.height;
            if (diff == 0)
                this._target.percY = 0;
            else
                this._target.percY = (curY - this._bar.y) / diff;
        }
        else {
            let curX = pt.x - this._dragOffset.x;
            let diff = this._bar.width - this._grip.width;
            if (diff == 0)
                this._target.percX = 0;
            else
                this._target.percX = (curX - this._bar.x) / (this._bar.width - this._grip.width);
        }
    }
    __gripTouchEnd(evt) {
        this._gripDragging = false;
        this._target.updateScrollBarVisible();
    }
    __arrowButton1Click(evt) {
        evt.stopPropagation();
        if (this._vertical)
            this._target.scrollUp();
        else
            this._target.scrollLeft();
    }
    __arrowButton2Click(evt) {
        evt.stopPropagation();
        if (this._vertical)
            this._target.scrollDown();
        else
            this._target.scrollRight();
    }
    __barTouchBegin(evt) {
        evt.stopPropagation();
        var pt = this._grip.globalToLocal(evt.input.x, evt.input.y, s_vec2);
        if (this._vertical) {
            if (pt.y < 0)
                this._target.scrollUp(4);
            else
                this._target.scrollDown(4);
        }
        else {
            if (pt.x < 0)
                this._target.scrollLeft(4);
            else
                this._target.scrollRight(4);
        }
    }
}
