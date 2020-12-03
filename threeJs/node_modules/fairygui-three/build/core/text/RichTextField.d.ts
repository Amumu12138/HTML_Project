import { HtmlElement } from "../../utils/html/HtmlElement";
import { HtmlParseOptions } from "../../utils/html/HtmlParseOptions";
import { IHtmlPageContext } from "../../utils/html/IHtmlPageContext";
import { TextField } from "./TextField";
export declare class RichTextField extends TextField {
    htmlPageContext: IHtmlPageContext;
    htmlParseOptions: HtmlParseOptions;
    constructor();
    getHtmlElement(name: string): HtmlElement;
    showHtmlObject(index: number, show: boolean): void;
    dispose(): void;
    protected cleanupObjects(): void;
    protected refreshObjects(): void;
}
