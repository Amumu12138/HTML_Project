import { DisplayObject } from "../../core/DisplayObject";
import { RichTextField } from "../../core/text/RichTextField";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
export declare class HtmlLink implements IHtmlObject {
    private _owner;
    private _element;
    private _shape;
    constructor();
    get displayObject(): DisplayObject;
    get element(): HtmlElement;
    get width(): number;
    get height(): number;
    create(owner: RichTextField, element: HtmlElement): void;
    setArea(startLine: number, startCharX: number, endLine: number, endCharX: number): void;
    setPosition(x: number, y: number): void;
    add(): void;
    remove(): void;
    release(): void;
    dispose(): void;
}
