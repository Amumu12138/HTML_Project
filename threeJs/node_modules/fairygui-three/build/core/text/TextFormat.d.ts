import { AlignType } from "../../ui/FieldTypes";
import { Vector2 } from "three";
export declare class TextFormat {
    size: number;
    font: string;
    color: number;
    lineSpacing: number;
    letterSpacing: number;
    bold: boolean;
    underline: boolean;
    italic: boolean;
    strikethrough: boolean;
    align: AlignType;
    outline: number;
    outlineColor: number;
    shadowOffset: Vector2;
    shadowColor: number;
    copy(source: TextFormat): void;
    equalStyle(aFormat: TextFormat): boolean;
}
