import { IHitTest } from "./IHitTest";
import { DisplayObject } from "../DisplayObject";
import { Rect } from "../../utils/Rect";
export declare class ShapeHitTest implements IHitTest {
    shape: DisplayObject;
    constructor(obj: DisplayObject);
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
