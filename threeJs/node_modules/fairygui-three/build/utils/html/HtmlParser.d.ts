import { TextFormat } from "../../core/text/TextFormat";
import { HtmlElement } from "./HtmlElement";
import { HtmlParseOptions } from "./HtmlParseOptions";
export declare class HtmlParser {
    protected _textFormatStack: Array<TextFormat>;
    protected _textFormatStackTop: number;
    protected _format: TextFormat;
    protected _elements: Array<HtmlElement>;
    protected _defaultOptions: HtmlParseOptions;
    constructor();
    parse(aSource: string, defaultFormat: TextFormat, elements: Array<HtmlElement>, parseOptions: HtmlParseOptions): void;
    protected pushTextFormat(): void;
    protected popTextFormat(): void;
    protected isNewLine(): boolean;
    protected appendText(text: string): void;
}
export declare var defaultParser: HtmlParser;
