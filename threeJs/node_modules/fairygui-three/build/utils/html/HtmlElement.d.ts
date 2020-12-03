import { Vector2 } from "three";
import { TextFormat } from "../../core/text/TextFormat";
import { Pool } from "../Pool";
import { IHtmlObject } from "./IHtmlObject";
export declare enum HtmlElementType {
    Text = 0,
    Link = 1,
    Image = 2,
    Input = 3,
    Select = 4,
    Object = 5,
    LinkEnd = 6
}
export declare class HtmlElement {
    type: HtmlElementType;
    name: string;
    text: string;
    format: TextFormat;
    charIndex: number;
    htmlObject: IHtmlObject;
    status: number;
    space: number;
    position: Vector2;
    _attributes: {
        [index: string]: any;
    };
    constructor();
    getAttr(attrName: string): any;
    setAttr(attrName: string, attrValue: any): void;
    getAttrString(attrName: string, defValue?: string): string;
    getAttrInt(attrName: string, defValue?: number): number;
    getAttrFloat(attrName: string, defValue?: number): number;
    getAttrBool(attrName: string, defValue?: boolean): boolean;
    getAttrColor(attrName: string, defValue?: number): number;
    fetchAttributes(): void;
    get isEntity(): boolean;
    reset(): void;
}
export declare var elementPool: Pool<HtmlElement>;
