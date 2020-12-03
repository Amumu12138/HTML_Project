import { DisplayObject } from "./DisplayObject";
import { Color4 } from "../utils/Color";
import { HitTestContext } from "./Stage";
export declare class Shape extends DisplayObject {
    constructor();
    drawRect(lineWidth: number, lineColor: Color4, fillColor: Color4): void;
    drawRoundRect(lineWidth: number, lineColor: Color4, fillColor: Color4, topLeftRadius: number, topRightRadius: number, bottomLeftRadius: number, bottomRightRadius: number): void;
    drawEllipse(lineWidth: number, centerColor: Color4, lineColor: Color4, fillColor: Color4, startDegree?: number, endDegree?: number): void;
    drawPolygon(points: Array<number>, fillColor: Color4, lineWidth?: number, lineColor?: Color4): void;
    drawRegularPolygon(sides: number, lineWidth: number, centerColor: Color4, lineColor: Color4, fillColor: Color4, rotation: number, distances: Array<number>): void;
    clear(): void;
    protected hitTest(context: HitTestContext): DisplayObject;
}
