import { RelationType } from "./FieldTypes";
import { GButton } from "./GButton";
import { GRoot } from "./GRoot";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
export class PopupMenu {
    constructor(resourceURL) {
        if (!resourceURL) {
            resourceURL = UIConfig.popupMenu;
            if (!resourceURL)
                throw "UIConfig.popupMenu not defined";
        }
        this._contentPane = UIPackage.createObjectFromURL(resourceURL);
        this._contentPane.on("added_to_stage", this.__addedToStage, this);
        this._list = (this._contentPane.getChild("list"));
        this._list.removeChildrenToPool();
        this._list.addRelation(this._contentPane, RelationType.Width);
        this._list.removeRelation(this._contentPane, RelationType.Height);
        this._contentPane.addRelation(this._list, RelationType.Height);
        this._list.on("click_item", this.__clickItem, this);
    }
    dispose() {
        this._contentPane.dispose();
    }
    addItem(caption, handler) {
        var item = this._list.addItemFromPool();
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c = item.getController("checked");
        if (c)
            c.selectedIndex = 0;
        return item;
    }
    addItemAt(caption, index, handler) {
        var item = this._list.getFromPool();
        this._list.addChildAt(item, index);
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c = item.getController("checked");
        if (c)
            c.selectedIndex = 0;
        return item;
    }
    addSeperator() {
        if (UIConfig.popupMenu_seperator == null)
            throw "UIConfig.popupMenu_seperator not defined";
        this.list.addItemFromPool(UIConfig.popupMenu_seperator);
    }
    getItemName(index) {
        var item = this._list.getChildAt(index);
        return item.name;
    }
    setItemText(name, caption) {
        var item = this._list.getChild(name);
        item.title = caption;
    }
    setItemVisible(name, visible) {
        var item = this._list.getChild(name);
        if (item.visible != visible) {
            item.visible = visible;
            this._list.setBoundsChangedFlag();
        }
    }
    setItemGrayed(name, grayed) {
        var item = this._list.getChild(name);
        item.grayed = grayed;
    }
    setItemCheckable(name, checkable) {
        var item = this._list.getChild(name);
        var c = item.getController("checked");
        if (c) {
            if (checkable) {
                if (c.selectedIndex == 0)
                    c.selectedIndex = 1;
            }
            else
                c.selectedIndex = 0;
        }
    }
    setItemChecked(name, checked) {
        var item = this._list.getChild(name);
        var c = item.getController("checked");
        if (c)
            c.selectedIndex = checked ? 2 : 1;
    }
    isItemChecked(name) {
        var item = this._list.getChild(name);
        var c = item.getController("checked");
        if (c)
            return c.selectedIndex == 2;
        else
            return false;
    }
    removeItem(name) {
        var item = this._list.getChild(name);
        if (item) {
            var index = this._list.getChildIndex(item);
            this._list.removeChildToPoolAt(index);
            return true;
        }
        else
            return false;
    }
    clearItems() {
        this._list.removeChildrenToPool();
    }
    get itemCount() {
        return this._list.numChildren;
    }
    get contentPane() {
        return this._contentPane;
    }
    get list() {
        return this._list;
    }
    show(target, dir) {
        var r = GRoot.findFor(target);
        r.showPopup(this.contentPane, (target instanceof GRoot) ? null : target, dir);
    }
    __clickItem(evt) {
        let itemObject = evt.data;
        if (!(itemObject instanceof GButton))
            return;
        if (itemObject.grayed) {
            this._list.selectedIndex = -1;
            return;
        }
        var c = itemObject.getController("checked");
        if (c && c.selectedIndex != 0) {
            if (c.selectedIndex == 1)
                c.selectedIndex = 2;
            else
                c.selectedIndex = 1;
        }
        var r = (this._contentPane.parent);
        r.hidePopup(this.contentPane);
        if (itemObject.data) {
            itemObject.data();
        }
    }
    __addedToStage() {
        this._list.selectedIndex = -1;
        this._list.resizeToFit(100000, 10);
    }
}
