import { Audio } from "three";
import { RelationType, PopupDirection } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GGraph } from "./GGraph";
import { GObject, Decls } from "./GObject";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { Window } from "./Window";
import { Stage } from "../core/Stage";
import { Color4 } from "../utils/Color";
import { UIContentScaler } from "./UIContentScaler";
var _inst;
export class GRoot extends GComponent {
    constructor() {
        super();
        if (!_inst)
            _inst = this;
        this.opaque = false;
        this._popupStack = [];
        this._justClosedPopups = [];
        this.on("touch_begin", this.__stageTouchBegin, this, true);
        this._modalLayer = new GGraph();
        this._modalLayer.setSize(this.width, this.height);
        this._modalLayer.shape.drawRect(0, new Color4(0, 0), UIConfig.modalLayerColor);
        this._modalLayer.addRelation(this, RelationType.Size);
        this.applyScaleFactor();
        this.on("content_scale_factor_changed", this.applyScaleFactor, this);
    }
    static get inst() {
        if (!_inst) {
            _inst = new GRoot();
            Stage.scene.add(_inst.displayObject.obj3D);
        }
        return _inst;
    }
    static findFor(obj) {
        if (obj instanceof GRoot)
            return obj;
        if (!obj)
            return _inst;
        var p = obj._parent;
        while (p) {
            if (p instanceof GRoot)
                return p;
            p = p.parent;
        }
        return _inst;
    }
    applyScaleFactor() {
        this.setSize(Math.ceil(Stage.width / UIContentScaler.scaleFactor), Math.ceil(Stage.height / UIContentScaler.scaleFactor));
        this.setScale(UIContentScaler.scaleFactor, UIContentScaler.scaleFactor);
    }
    showWindow(win) {
        this.addChild(win);
        if (win.x > this.width)
            win.x = this.width - win.width;
        else if (win.x + win.width < 0)
            win.x = 0;
        if (win.y > this.height)
            win.y = this.height - win.height;
        else if (win.y + win.height < 0)
            win.y = 0;
        this.adjustModalLayer();
    }
    hideWindow(win) {
        win.hide();
    }
    hideWindowImmediately(win) {
        if (win.parent == this)
            this.removeChild(win);
        this.adjustModalLayer();
    }
    bringToFront(win) {
        var cnt = this.numChildren;
        var i;
        if (this._modalLayer.parent && !win.modal)
            i = this.getChildIndex(this._modalLayer) - 1;
        else
            i = cnt - 1;
        for (; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g == win)
                return;
            if (g instanceof Window)
                break;
        }
        if (i >= 0)
            this.setChildIndex(win, i);
    }
    showModalWait(msg) {
        if (UIConfig.globalModalWaiting) {
            if (this._modalWaitPane == null)
                this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting);
            this._modalWaitPane.setSize(this.width, this.height);
            this._modalWaitPane.addRelation(this, RelationType.Size);
            this.addChild(this._modalWaitPane);
            this._modalWaitPane.text = msg || "";
        }
    }
    closeModalWait() {
        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.removeChild(this._modalWaitPane);
    }
    closeAllExceptModals() {
        var arr = this._children.slice();
        var cnt = arr.length;
        for (var i = 0; i < cnt; i++) {
            var g = arr[i];
            if ((g instanceof Window) && !g.modal)
                g.hide();
        }
    }
    closeAllWindows() {
        var arr = this._children.slice();
        var cnt = arr.length;
        for (var i = 0; i < cnt; i++) {
            var g = arr[i];
            if (g instanceof Window)
                g.hide();
        }
    }
    getTopWindow() {
        var cnt = this.numChildren;
        for (var i = cnt - 1; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g instanceof Window) {
                return g;
            }
        }
        return null;
    }
    get modalLayer() {
        return this._modalLayer;
    }
    get hasModalWindow() {
        return this._modalLayer.parent != null;
    }
    get modalWaiting() {
        return this._modalWaitPane && this._modalWaitPane.onStage;
    }
    showPopup(popup, target, dir) {
        if (this._popupStack.length > 0) {
            var k = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i = this._popupStack.length - 1; i >= k; i--)
                    this.removeChild(this._popupStack.pop());
            }
        }
        this._popupStack.push(popup);
        if (target) {
            var p = target;
            while (p) {
                if (p.parent == this) {
                    if (popup.sortingOrder < p.sortingOrder) {
                        popup.sortingOrder = p.sortingOrder;
                    }
                    break;
                }
                p = p.parent;
            }
        }
        this.addChild(popup);
        this.adjustModalLayer();
        var pos;
        var sizeW = 0, sizeH = 0;
        if (target) {
            pos = target.localToRoot(0, 0);
            let size = target.localToRoot(target.width, target.height);
            sizeW = size.x - pos.x;
            sizeH = size.y - pos.y;
        }
        else {
            pos = Stage.getTouchPos();
            pos = this.globalToLocal(pos.x, pos.y);
        }
        var xx, yy;
        xx = pos.x;
        if (xx + popup.width > this.width)
            xx = xx + sizeW - popup.width;
        yy = pos.y + sizeH;
        if (((dir === undefined || dir === PopupDirection.Auto) && yy + popup.height > this.height)
            || dir === PopupDirection.Up) {
            yy = pos.y - popup.height - 1;
            if (yy < 0) {
                yy = 0;
                xx += sizeW / 2;
            }
        }
        popup.setPosition(xx, yy);
    }
    togglePopup(popup, target, dir) {
        if (this._justClosedPopups.indexOf(popup) != -1)
            return;
        this.showPopup(popup, target, dir);
    }
    hidePopup(popup) {
        if (popup) {
            var k = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i = this._popupStack.length - 1; i >= k; i--)
                    this.closePopup(this._popupStack.pop());
            }
        }
        else {
            var cnt = this._popupStack.length;
            for (i = cnt - 1; i >= 0; i--)
                this.closePopup(this._popupStack[i]);
            this._popupStack.length = 0;
        }
    }
    get hasAnyPopup() {
        return this._popupStack.length != 0;
    }
    closePopup(target) {
        if (target.parent) {
            if (target instanceof Window)
                target.hide();
            else
                this.removeChild(target);
        }
    }
    showTooltips(msg) {
        if (this._defaultTooltipWin == null) {
            var resourceURL = UIConfig.tooltipsWin;
            if (!resourceURL) {
                console.warn("UIConfig.tooltipsWin not defined");
                return;
            }
            this._defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL);
        }
        this._defaultTooltipWin.text = msg;
        this.showTooltipsWin(this._defaultTooltipWin);
    }
    showTooltipsWin(tooltipWin, xx, yy) {
        this.hideTooltips();
        this._tooltipWin = tooltipWin;
        if (xx == null || yy == null) {
            xx = Stage.touchPos.x + 10;
            yy = Stage.touchPos.y + 20;
        }
        var pt = this.globalToLocal(xx, yy);
        xx = pt.x;
        yy = pt.y;
        if (xx + this._tooltipWin.width > this.width) {
            xx = xx - this._tooltipWin.width - 1;
            if (xx < 0)
                xx = 10;
        }
        if (yy + this._tooltipWin.height > this.height) {
            yy = yy - this._tooltipWin.height - 1;
            if (xx - this._tooltipWin.width - 1 > 0)
                xx = xx - this._tooltipWin.width - 1;
            if (yy < 0)
                yy = 10;
        }
        this._tooltipWin.x = xx;
        this._tooltipWin.y = yy;
        this.addChild(this._tooltipWin);
    }
    hideTooltips() {
        if (this._tooltipWin) {
            if (this._tooltipWin.parent)
                this.removeChild(this._tooltipWin);
            this._tooltipWin = null;
        }
    }
    playOneShotSound(url, volumeScale) {
        if (!Stage.audioListener)
            return;
        if (volumeScale == null)
            volumeScale = 1;
        let pi = UIPackage.getItemByURL(url);
        if (pi && pi.audioBuffer) {
            if (!pi.sound) {
                pi.sound = new Audio(Stage.audioListener);
                pi.sound.setBuffer(pi.audioBuffer);
                pi.sound.setLoop(false);
            }
            pi.sound.setVolume(volumeScale);
            pi.sound.play();
        }
    }
    adjustModalLayer() {
        var cnt = this.numChildren;
        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.setChildIndex(this._modalWaitPane, cnt - 1);
        for (var i = cnt - 1; i >= 0; i--) {
            var g = this.getChildAt(i);
            if ((g instanceof Window) && g.modal) {
                if (this._modalLayer.parent == null)
                    this.addChildAt(this._modalLayer, i);
                else
                    this.setChildIndexBefore(this._modalLayer, i);
                return;
            }
        }
        if (this._modalLayer.parent)
            this.removeChild(this._modalLayer);
    }
    checkPopups() {
        this._justClosedPopups.length = 0;
        if (this._popupStack.length > 0) {
            let mc = Stage.touchTarget;
            let handled = false;
            while (mc) {
                let gobj = GObject.cast(mc);
                if (gobj) {
                    let k = this._popupStack.indexOf(gobj);
                    if (k != -1) {
                        for (let i = this._popupStack.length - 1; i > k; i--) {
                            let last = this._popupStack.length - 1;
                            let popup = this._popupStack[last];
                            this.closePopup(popup);
                            this._justClosedPopups.push(popup);
                            this._popupStack.splice(last, 1);
                        }
                        handled = true;
                        break;
                    }
                }
                mc = mc.parent;
            }
            if (!handled) {
                for (let i = this._popupStack.length - 1; i >= 0; i--) {
                    let popup = this._popupStack[i];
                    this.closePopup(popup);
                    this._justClosedPopups.push(popup);
                    this._popupStack.splice(i, 1);
                }
            }
        }
    }
    __stageTouchBegin() {
        if (this._tooltipWin)
            this.hideTooltips();
        this.checkPopups();
    }
}
Decls.GRoot = GRoot;
