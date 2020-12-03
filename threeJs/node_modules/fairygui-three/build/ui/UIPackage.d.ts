import { GObject } from "./GObject";
import { PackageItem } from "./PackageItem";
export declare class UIPackage {
    private _id;
    private _name;
    private _items;
    private _itemsById;
    private _itemsByName;
    private _resKey;
    private _customId;
    private _sprites;
    private _dependencies;
    private _branches;
    _branchIndex: number;
    constructor();
    static get branch(): string;
    static set branch(value: string);
    static getVar(key: string): string;
    static setVar(key: string, value: string): void;
    static getById(id: string): UIPackage;
    static getByName(name: string): UIPackage;
    static loadPackage(resKey: string, onProgress?: (event: ProgressEvent) => void): Promise<UIPackage>;
    static removePackage(packageIdOrName: string): void;
    static createObject(pkgName: string, resName: string, userClass?: new () => GObject): GObject;
    static createObjectFromURL(url: string, userClass?: new () => GObject): GObject;
    static getItemURL(pkgName: string, resName: string): string;
    static getItemByURL(url: string): PackageItem;
    static getItemAssetByURL(url: string): any;
    static normalizeURL(url: string): string;
    private loadPackage;
    dispose(): void;
    get id(): string;
    get name(): string;
    get customId(): string;
    set customId(value: string);
    createObject(resName: string, userClass?: new () => GObject): GObject;
    internalCreateObject(item: PackageItem, userClass?: new () => GObject): GObject;
    getItemById(itemId: string): PackageItem;
    getItemByName(resName: string): PackageItem;
    getItemAssetByName(resName: string): Object;
    getItemAsset(item: PackageItem): Object;
    private loadMovieClip;
    private loadFont;
}
export interface IObjectFactoryType {
    resolveExtension(pi: PackageItem): void;
    newObject(type: number | PackageItem, userClass?: new () => GObject): GObject;
}
export declare var Decls: {
    UIObjectFactory?: IObjectFactoryType;
};
