import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";
import { FillMethod } from "../../ui/FieldTypes";
export declare class FillMesh implements IMeshFactory {
    method: FillMethod;
    origin: number;
    amount: number;
    clockwise: boolean;
    constructor();
    onPopulateMesh(vb: VertexBuffer): void;
}
