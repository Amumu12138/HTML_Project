import { IMeshFactory } from "./MeshFactory";
import { IHitTest } from "../hittest/IHitTest";
import { VertexBuffer } from "./VertexBuffer";
import { Rect } from "../../utils/Rect";
export declare class CompositeMesh implements IMeshFactory, IHitTest {
    readonly elements: Array<IMeshFactory>;
    activeIndex: number;
    constructor();
    onPopulateMesh(vb: VertexBuffer): void;
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}
