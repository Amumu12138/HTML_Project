import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { IHitTest } from "../hittest/IHitTest";
import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";
export declare class PolygonMesh implements IMeshFactory, IHitTest {
    readonly points: Array<number>;
    readonly texcoords: Array<number>;
    lineWidth: number;
    lineColor: Color4;
    fillColor: Color4;
    usePercentPositions: boolean;
    constructor();
    add(x: number, y: number, uv_x?: number, uv_y?: number): void;
    onPopulateMesh(vb: VertexBuffer): void;
    private drawOutline;
    private isPointInTriangle;
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
