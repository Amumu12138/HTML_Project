import { DisplayObject } from "../../core/DisplayObject";
import { RichTextField } from "../../core/text/RichTextField";
import { GLoader } from "../../ui/GLoader";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
export declare class HtmlImage implements IHtmlObject {
    readonly loader: GLoader;
    private _owner;
    private _element;
    constructor();
    get displayObject(): DisplayObject;
    get element(): HtmlElement;
    get width(): number;
    get height(): number;
    create(owner: RichTextField, element: HtmlElement): void;
    setPosition(x: number, y: number): void;
    add(): void;
    remove(): void;
    release(): void;
    dispose(): void;
}
