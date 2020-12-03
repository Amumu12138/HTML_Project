import { ButtonMode, ObjectPropID } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GRoot } from "./GRoot";
import { GTextField } from "./GTextField";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { Window } from "./Window";
import { Timers } from "../utils/Timers";
export class GButton extends GComponent {
    constructor() {
        super();
        this._soundVolumeScale = 0;
        this._downEffect = 0;
        this._downEffectValue = 0;
        this._downScaled = false;
        this._mode = ButtonMode.Common;
        this._title = "";
        this._icon = "";
        this._sound = UIConfig.buttonSound;
        this._soundVolumeScale = UIConfig.buttonSoundVolumeScale;
        this._changeStateOnClick = true;
        this._downEffectValue = 0.8;
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
        value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }
    get selectedIcon() {
        return this._selectedIcon;
    }
    set selectedIcon(value) {
        this._selectedIcon = value;
        value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
        if (this._iconObject)
            this._iconObject.icon = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
        if (this._titleObject)
            this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
        this.updateGear(6);
    }
    get text() {
        return this.title;
    }
    set text(value) {
        this.title = value;
    }
    get selectedTitle() {
        return this._selectedTitle;
    }
    set selectedTitle(value) {
        this._selectedTitle = value;
        if (this._titleObject)
            this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
    }
    get titleColor() {
        var tf = this.getTextField();
        if (tf)
            return tf.color;
        else
            return 0;
    }
    set titleColor(value) {
        var tf = this.getTextField();
        if (tf)
            tf.color = value;
        this.updateGear(4);
    }
    get titleFontSize() {
        var tf = this.getTextField();
        if (tf)
            return tf.textFormat.size;
        else
            return 0;
    }
    set titleFontSize(value) {
        var tf = this.getTextField();
        if (tf) {
            tf.textFormat.size = value;
            tf.applyFormat();
        }
    }
    get sound() {
        return this._sound;
    }
    set sound(val) {
        this._sound = val;
    }
    get soundVolumeScale() {
        return this._soundVolumeScale;
    }
    set soundVolumeScale(value) {
        this._soundVolumeScale = value;
    }
    set selected(val) {
        if (this._mode == ButtonMode.Common)
            return;
        if (this._selected != val) {
            this._selected = val;
            this.setCurrentState();
            if (this._selectedTitle && this._titleObject)
                this._titleObject.text = this._selected ? this._selectedTitle : this._title;
            if (this._selectedIcon) {
                var str = this._selected ? this._selectedIcon : this._icon;
                if (this._iconObject)
                    this._iconObject.icon = str;
            }
            if (this._relatedController
                && this._parent
                && !this._parent._buildingDisplayList) {
                if (this._selected) {
                    this._relatedController.selectedPageId = this._relatedPageId;
                    if (this._relatedController.autoRadioGroupDepth)
                        this._parent.adjustRadioGroupDepth(this, this._relatedController);
                }
                else if (this._mode == ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId)
                    this._relatedController.oppositePageId = this._relatedPageId;
            }
        }
    }
    get selected() {
        return this._selected;
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode != value) {
            if (value == ButtonMode.Common)
                this.selected = false;
            this._mode = value;
        }
    }
    get relatedController() {
        return this._relatedController;
    }
    set relatedController(val) {
        if (val != this._relatedController) {
            this._relatedController = val;
            this._relatedPageId = null;
        }
    }
    get relatedPageId() {
        return this._relatedPageId;
    }
    set relatedPageId(val) {
        this._relatedPageId = val;
    }
    get changeStateOnClick() {
        return this._changeStateOnClick;
    }
    set changeStateOnClick(value) {
        this._changeStateOnClick = value;
    }
    get linkedPopup() {
        return this._linkedPopup;
    }
    set linkedPopup(value) {
        this._linkedPopup = value;
    }
    getTextField() {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return this._titleObject.getTextField();
        else
            return null;
    }
    fireClick(downEffect, clickCall) {
        downEffect = downEffect || false;
        if (downEffect && this._mode == ButtonMode.Common) {
            this.setState("over");
            Timers.add(100, 1, this.setState, this, "down");
            Timers.add(200, 1, this.setState, this, () => {
                this.setState("up");
                if (clickCall)
                    this.dispatchEvent("click");
            });
        }
    }
    setState(val) {
        if (this._buttonController)
            this._buttonController.selectedPage = val;
        if (this._downEffect == 1) {
            var cnt = this.numChildren;
            if (val == "down" || val == "selectedOver" || val == "selectedDisabled") {
                var p = this._downEffectValue * 255;
                var r = (p << 16) + (p << 8) + p;
                for (var i = 0; i < cnt; i++) {
                    var obj = this.getChildAt(i);
                    if (!(obj instanceof GTextField))
                        obj.setProp(ObjectPropID.Color, r);
                }
            }
            else {
                for (i = 0; i < cnt; i++) {
                    obj = this.getChildAt(i);
                    if (!(obj instanceof GTextField))
                        obj.setProp(ObjectPropID.Color, 0xFFFFFF);
                }
            }
        }
        else if (this._downEffect == 2) {
            if (val == "down" || val == "selectedOver" || val == "selectedDisabled") {
                if (!this._downScaled) {
                    this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue);
                    this._downScaled = true;
                }
            }
            else {
                if (this._downScaled) {
                    this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue);
                    this._downScaled = false;
                }
            }
        }
    }
    setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled")) {
            if (this._selected)
                this.setState("selectedDisabled");
            else
                this.setState("disabled");
        }
        else {
            if (this._selected)
                this.setState(this._over ? "selectedOver" : "down");
            else
                this.setState(this._over ? "over" : "up");
        }
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._relatedController == c)
            this.selected = this._relatedPageId == c.selectedPageId;
    }
    handleGrayedChanged() {
        if (this._buttonController && this._buttonController.hasPage("disabled")) {
            if (this.grayed) {
                if (this._selected && this._buttonController.hasPage("selectedDisabled"))
                    this.setState("selectedDisabled");
                else
                    this.setState("disabled");
            }
            else if (this._selected)
                this.setState("down");
            else
                this.setState("up");
        }
        else
            super.handleGrayedChanged();
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.titleColor;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.outlineColor;
                    else
                        return 0;
                }
            case ObjectPropID.FontSize:
                return this.titleFontSize;
            case ObjectPropID.Selected:
                return this.selected;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.titleColor = value;
                break;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.outlineColor = value;
                        tf.applyFormat();
                    }
                }
                break;
            case ObjectPropID.FontSize:
                this.titleFontSize = value;
                break;
            case ObjectPropID.Selected:
                this.selected = value;
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructExtension(buffer) {
        buffer.seek(0, 6);
        this._mode = buffer.readByte();
        var str = buffer.readS();
        if (str)
            this._sound = str;
        this._soundVolumeScale = buffer.readFloat();
        this._downEffect = buffer.readByte();
        this._downEffectValue = buffer.readFloat();
        if (this._downEffect == 2)
            this.setPivot(0.5, 0.5, this.pivotAsAnchor);
        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        if (this._titleObject)
            this._title = this._titleObject.text;
        if (this._iconObject)
            this._icon = this._iconObject.icon;
        if (this._mode == ButtonMode.Common)
            this.setState("up");
        this.on("roll_over", this.__rollover, this);
        this.on("roll_out", this.__rollout, this);
        this.on("touch_begin", this.__btnTouchBegin, this);
        this.on("touch_end", this.__btnTouchEnd, this);
        this.on("click", this.__click, this);
        this.on("removed_from_stage", this.__removeFromStage, this);
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6))
            return;
        if (buffer.readByte() != this.packageItem.objectType)
            return;
        var str;
        var iv;
        str = buffer.readS();
        if (str != null)
            this.title = str;
        str = buffer.readS();
        if (str != null)
            this.selectedTitle = str;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        str = buffer.readS();
        if (str != null)
            this.selectedIcon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv != 0)
            this.titleFontSize = iv;
        iv = buffer.readShort();
        if (iv >= 0)
            this._relatedController = this.parent.getControllerAt(iv);
        this._relatedPageId = buffer.readS();
        str = buffer.readS();
        if (str != null)
            this._sound = str;
        if (buffer.readBool())
            this._soundVolumeScale = buffer.readFloat();
        this.selected = buffer.readBool();
    }
    __rollover() {
        if (!this._buttonController || !this._buttonController.hasPage("over"))
            return;
        this._over = true;
        if (this._down)
            return;
        if (this.grayed && this._buttonController.hasPage("disabled"))
            return;
        this.setState(this._selected ? "selectedOver" : "over");
    }
    __rollout() {
        if (!this._buttonController || !this._buttonController.hasPage("over"))
            return;
        this._over = false;
        if (this._down)
            return;
        if (this.grayed && this._buttonController.hasPage("disabled"))
            return;
        this.setState(this._selected ? "down" : "up");
    }
    __btnTouchBegin(evt) {
        if (evt.input.button != 0)
            return;
        this._down = true;
        evt.captureTouch();
        if (this._mode == ButtonMode.Common) {
            if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
                this.setState("selectedDisabled");
            else
                this.setState("down");
        }
        if (this._linkedPopup) {
            if (this._linkedPopup instanceof Window)
                this._linkedPopup.toggleStatus();
            else
                GRoot.findFor(this).togglePopup(this._linkedPopup, this);
        }
    }
    __btnTouchEnd(evt) {
        if (this._down) {
            this._down = false;
            if (this._mode == ButtonMode.Common) {
                if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
                    this.setState("disabled");
                else if (this._over)
                    this.setState("over");
                else
                    this.setState("up");
            }
            else {
                if (!this._over
                    && this._buttonController
                    && (this._buttonController.selectedPage == "over" || this._buttonController.selectedPage == "selectedOver")) {
                    this.setCurrentState();
                }
            }
        }
    }
    __removeFromStage() {
        if (this._over)
            this.__rollout();
    }
    __click(evt) {
        if (this._sound) {
            var pi = UIPackage.getItemByURL(this._sound);
            if (pi)
                GRoot.inst.playOneShotSound(pi.file);
            else
                GRoot.inst.playOneShotSound(this._sound);
        }
        if (this._mode == ButtonMode.Check) {
            if (this._changeStateOnClick) {
                this.selected = !this._selected;
                this.dispatchEvent("status_changed");
            }
        }
        else if (this._mode == ButtonMode.Radio) {
            if (this._changeStateOnClick && !this._selected) {
                this.selected = true;
                this.dispatchEvent("status_changed");
            }
        }
        else {
            if (this._relatedController)
                this._relatedController.selectedPageId = this._relatedPageId;
        }
    }
}
