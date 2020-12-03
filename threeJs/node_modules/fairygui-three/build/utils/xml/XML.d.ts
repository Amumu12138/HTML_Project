export declare class XML {
    name: string;
    text: string;
    private _attributes;
    private _children;
    constructor(XmlString?: string);
    get attributes(): {
        [index: string]: string;
    };
    getAttrString(attrName: string, defValue?: string): string;
    getAttrInt(attrName: string, defValue?: number): number;
    getAttrFloat(attrName: string, defValue?: number): number;
    getAttrBool(attrName: string, defValue?: boolean): boolean;
    getAttrColor(attrName: string, defValue?: number): number;
    setAttribute(attrName: string, attrValue: string): void;
    getNode(selector: string): XML;
    elements(selector?: string): Array<XML>;
    parse(aSource: string): void;
    reset(): void;
}
