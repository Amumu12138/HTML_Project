import { RichTextField } from "../../core/text/RichTextField";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
import { IHtmlPageContext } from "./IHtmlPageContext";
export declare class HtmlPageContext implements IHtmlPageContext {
    private _imagePool;
    private _linkPool;
    constructor();
    createObject(owner: RichTextField, element: HtmlElement): IHtmlObject;
    freeObject(obj: IHtmlObject): void;
}
export declare var defaultContext: IHtmlPageContext;
