import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { IHitTest } from "../hittest/IHitTest";
import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";
export declare class EllipseMesh implements IMeshFactory, IHitTest {
    drawRect: Rect;
    lineWidth: number;
    lineColor: Color4;
    centerColor: Color4;
    fillColor: Color4;
    startDegree: number;
    endDegreee: number;
    constructor();
    onPopulateMesh(vb: VertexBuffer): void;
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
