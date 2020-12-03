import { ObjectPropID, PopupDirection, RelationType } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GRoot } from "./GRoot";
import { GTextField } from "./GTextField";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { InputTextField } from "../core/text/InputTextField";
export class GComboBox extends GComponent {
    constructor() {
        super();
        this.visibleItemCount = UIConfig.defaultComboBoxVisibleItemCount;
        this.popupDirection = PopupDirection.Auto;
        this._itemsUpdated = true;
        this._selectedIndex = -1;
        this._items = [];
        this._values = [];
    }
    get text() {
        if (this._titleObject)
            return this._titleObject.text;
        else
            return null;
    }
    set text(value) {
        if (this._titleObject)
            this._titleObject.text = value;
        this.updateGear(6);
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
    get icon() {
        if (this._iconObject)
            return this._iconObject.icon;
        else
            return null;
    }
    set icon(value) {
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }
    get items() {
        return this._items;
    }
    set items(value) {
        if (!value)
            this._items.length = 0;
        else
            this._items = value.concat();
        if (this._items.length > 0) {
            if (this._selectedIndex >= this._items.length)
                this._selectedIndex = this._items.length - 1;
            else if (this._selectedIndex == -1)
                this._selectedIndex = 0;
            this.text = this._items[this._selectedIndex];
            if (this._icons && this._selectedIndex < this._icons.length)
                this.icon = this._icons[this._selectedIndex];
        }
        else {
            this.text = "";
            if (this._icons)
                this.icon = null;
            this._selectedIndex = -1;
        }
        this._itemsUpdated = true;
    }
    get icons() {
        return this._icons;
    }
    set icons(value) {
        this._icons = value;
        if (this._icons && this._selectedIndex != -1 && this._selectedIndex < this._icons.length)
            this.icon = this._icons[this._selectedIndex];
    }
    get values() {
        return this._values;
    }
    set values(value) {
        if (!value)
            this._values.length = 0;
        else
            this._values = value.concat();
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(val) {
        if (this._selectedIndex == val)
            return;
        this._selectedIndex = val;
        if (this._selectedIndex >= 0 && this._selectedIndex < this._items.length) {
            this.text = this._items[this._selectedIndex];
            if (this._icons && this._selectedIndex < this._icons.length)
                this.icon = this._icons[this._selectedIndex];
        }
        else {
            this.text = "";
            if (this._icons)
                this.icon = null;
        }
        this.updateSelectionController();
    }
    get value() {
        return this._values[this._selectedIndex];
    }
    set value(val) {
        var index = this._values.indexOf(val);
        if (index == -1 && val == null)
            index = this._values.indexOf("");
        this.selectedIndex = index;
    }
    getTextField() {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return this._titleObject.getTextField();
        else
            return null;
    }
    setState(val) {
        if (this._buttonController)
            this._buttonController.selectedPage = val;
    }
    setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
            this.setState("disabled");
        else if (this.dropdown && this.dropdown.parent)
            this.setState("down");
        else
            this.setState(this._over ? "over" : "up");
    }
    get selectionController() {
        return this._selectionController;
    }
    set selectionController(value) {
        this._selectionController = value;
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._selectionController == c)
            this.selectedIndex = c.selectedIndex;
    }
    updateSelectionController() {
        if (this._selectionController && !this._selectionController.changing
            && this._selectedIndex < this._selectionController.pageCount) {
            var c = this._selectionController;
            this._selectionController = null;
            c.selectedIndex = this._selectedIndex;
            this._selectionController = c;
        }
    }
    dispose() {
        if (this.dropdown) {
            this.dropdown.dispose();
            this.dropdown = null;
        }
        this._selectionController = null;
        super.dispose();
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
                {
                    tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.size;
                    else
                        return 0;
                }
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
                {
                    tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.size = value;
                        tf.applyFormat();
                    }
                }
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructExtension(buffer) {
        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        let str = buffer.readS();
        if (str) {
            let obj = UIPackage.createObjectFromURL(str);
            if (!(obj instanceof GComponent)) {
                console.warn(this.resourceURL + " should be a component.");
                return;
            }
            this.dropdown = obj;
            this._list = this.dropdown.getChild("list");
            if (this._list == null) {
                console.warn(this.resourceURL + ": should container a list component named list.");
                return;
            }
            this._list.on("click_item", this.__clickItem, this);
            this._list.addRelation(this.dropdown, RelationType.Width);
            this._list.removeRelation(this.dropdown, RelationType.Height);
            this.dropdown.addRelation(this._list, RelationType.Height);
            this.dropdown.removeRelation(this._list, RelationType.Width);
            this.dropdown.on("removed_from_stage", this.__popupWinClosed, this);
        }
        this.on("roll_over", this.__rollover, this);
        this.on("roll_out", this.__rollout, this);
        this.on("touch_begin", this.__mousedown, this);
        this.on("touch_end", this.__mouseup, this);
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6))
            return;
        if (buffer.readByte() != this.packageItem.objectType)
            return;
        var i;
        var iv;
        var nextPos;
        var str;
        var itemCount = buffer.readShort();
        for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            this._items[i] = buffer.readS();
            this._values[i] = buffer.readS();
            str = buffer.readS();
            if (str != null) {
                if (this._icons == null)
                    this._icons = [];
                this._icons[i] = str;
            }
            buffer.pos = nextPos;
        }
        str = buffer.readS();
        if (str != null) {
            this.text = str;
            this._selectedIndex = this._items.indexOf(str);
        }
        else if (this._items.length > 0) {
            this._selectedIndex = 0;
            this.text = this._items[0];
        }
        else
            this._selectedIndex = -1;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv > 0)
            this.visibleItemCount = iv;
        this.popupDirection = buffer.readByte();
        iv = buffer.readShort();
        if (iv >= 0)
            this._selectionController = this.parent.getControllerAt(iv);
    }
    showDropdown() {
        if (this._itemsUpdated) {
            this._itemsUpdated = false;
            this._list.removeChildrenToPool();
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._list.addItemFromPool();
                item.name = i < this._values.length ? this._values[i] : "";
                item.text = this._items[i];
                item.icon = (this._icons && i < this._icons.length) ? this._icons[i] : null;
            }
            this._list.resizeToFit(this.visibleItemCount);
        }
        this._list.selectedIndex = -1;
        this.dropdown.width = this.width;
        this._list.ensureBoundsCorrect();
        GRoot.findFor(this).togglePopup(this.dropdown, this, this.popupDirection);
        if (this.dropdown.parent)
            this.setState("down");
    }
    __popupWinClosed() {
        this.setCurrentState();
    }
    __clickItem(evt) {
        if (this.dropdown.parent instanceof GRoot)
            this.dropdown.parent.hidePopup();
        this._selectedIndex = -1;
        this.selectedIndex = this._list.getChildIndex(evt.data);
        this.dispatchEvent("status_changed");
    }
    __rollover() {
        this._over = true;
        if (this._down || this.dropdown && this.dropdown.parent)
            return;
        this.setCurrentState();
    }
    __rollout() {
        this._over = false;
        if (this._down || this.dropdown && this.dropdown.parent)
            return;
        this.setCurrentState();
    }
    __mousedown(evt) {
        if (evt.initiator instanceof InputTextField)
            return;
        this._down = true;
        if (this.dropdown)
            this.showDropdown();
        evt.captureTouch();
    }
    __mouseup() {
        if (this._down) {
            this._down = false;
            this.setCurrentState();
        }
    }
}
