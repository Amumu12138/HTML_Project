import { Rect } from "../../utils/Rect";
import { DisplayObject } from "../DisplayObject";
import { IMeshFactory } from "../mesh/MeshFactory";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { HitTestContext } from "../Stage";
export declare class SelectionShape extends DisplayObject implements IMeshFactory {
    readonly rects: Array<Rect>;
    constructor();
    refresh(): void;
    clear(): void;
    onPopulateMesh(vb: VertexBuffer): void;
    protected hitTest(context: HitTestContext): DisplayObject;
}
