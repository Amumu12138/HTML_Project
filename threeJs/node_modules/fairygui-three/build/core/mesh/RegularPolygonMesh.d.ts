import { IMeshFactory } from "./MeshFactory";
import { IHitTest } from "../hittest/IHitTest";
import { Rect } from "../../utils/Rect";
import { VertexBuffer } from "./VertexBuffer";
import { Color4 } from "../../utils/Color";
export declare class RegularPolygonMesh implements IMeshFactory, IHitTest {
    drawRect: Rect;
    sides: number;
    lineWidth: number;
    lineColor: Color4;
    centerColor: Color4;
    fillColor: Color4;
    distances: Array<number>;
    rotation: number;
    constructor();
    onPopulateMesh(vb: VertexBuffer): void;
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
