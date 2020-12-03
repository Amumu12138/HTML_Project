import { Vector2, Vector3 } from "three";
import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
/**
 * 1---2
 * | / |
 * 0---3
 * threejs anti-clockwise vertex order. ie 0-2-1， 0-3-2
 */
export declare class VertexBuffer {
    contentRect: Rect;
    uvRect: Rect;
    vertexColor: Color4;
    textureSize: Vector2;
    readonly vertices: Array<number>;
    readonly uvs: Array<number>;
    readonly colors: Array<number>;
    readonly triangles: Array<number>;
    static begin(source?: VertexBuffer): VertexBuffer;
    constructor();
    end(): void;
    clear(): void;
    get currentVertCount(): number;
    addVert(x: number, y: number, z: number, uv_x?: number | Color4, uv_y?: number, color?: Color4): void;
    addQuad(vertRect: Rect, uvRect?: Rect | Array<Vector2>, color?: Color4): void;
    repeatColors(value: Array<number>, startIndex: number, count: number): void;
    addTriangle(idx0: number, idx1: number, idx2: number): void;
    addTriangles(startVertexIndex?: number, idxList?: Array<number>): void;
    getPosition(index: number, ret: Vector3): Vector3;
    append(vb: VertexBuffer): void;
}
