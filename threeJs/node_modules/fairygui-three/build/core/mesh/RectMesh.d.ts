import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";
export declare class RectMesh implements IMeshFactory {
    drawRect: Rect;
    lineWidth: number;
    lineColor: Color4;
    fillColor: Color4;
    constructor();
    onPopulateMesh(vb: VertexBuffer): void;
}
