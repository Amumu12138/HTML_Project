import { IMeshFactory } from "./MeshFactory";
import { IHitTest } from "../hittest/IHitTest";
import { Rect } from "../../utils/Rect";
import { VertexBuffer } from "./VertexBuffer";
import { Color4 } from "../../utils/Color";
export declare class RoundedRectMesh implements IMeshFactory, IHitTest {
    drawRect: Rect;
    lineWidth: number;
    lineColor: Color4;
    fillColor: Color4;
    topLeftRadius: number;
    topRightRadius: number;
    bottomLeftRadius: number;
    bottomRightRadius: number;
    constructor();
    onPopulateMesh(vb: VertexBuffer): void;
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
