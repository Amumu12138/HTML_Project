import { PopupDirection } from "./FieldTypes";
import { GButton } from "./GButton";
import { GComponent } from "./GComponent";
import { GList } from "./GList";
import { GObject } from "./GObject";
export declare class PopupMenu {
    protected _contentPane: GComponent;
    protected _list: GList;
    constructor(resourceURL?: string);
    dispose(): void;
    addItem(caption: string, handler?: Function): GButton;
    addItemAt(caption: string, index: number, handler?: Function): GButton;
    addSeperator(): void;
    getItemName(index: number): string;
    setItemText(name: string, caption: string): void;
    setItemVisible(name: string, visible: boolean): void;
    setItemGrayed(name: string, grayed: boolean): void;
    setItemCheckable(name: string, checkable: boolean): void;
    setItemChecked(name: string, checked: boolean): void;
    isItemChecked(name: string): boolean;
    removeItem(name: string): boolean;
    clearItems(): void;
    get itemCount(): number;
    get contentPane(): GComponent;
    get list(): GList;
    show(target?: GObject, dir?: PopupDirection): void;
    private __clickItem;
    private __addedToStage;
}
