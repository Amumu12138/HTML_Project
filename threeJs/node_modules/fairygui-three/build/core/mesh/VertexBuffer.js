import { Vector2, Vector3 } from "three";
import { Color4 } from "../../utils/Color";
import { Pool } from "../../utils/Pool";
import { Rect } from "../../utils/Rect";
import { lerp } from "../../utils/ToolSet";
/**
 * 1---2
 * | / |
 * 0---3
 * threejs anti-clockwise vertex order. ie 0-2-1， 0-3-2
 */
export class VertexBuffer {
    constructor() {
        this.vertices = new Array();
        this.uvs = new Array();
        this.colors = new Array();
        this.triangles = new Array();
        this.contentRect = new Rect();
        this.uvRect = new Rect();
        this.textureSize = new Vector2();
        this.vertexColor = new Color4();
    }
    static begin(source) {
        let inst = pool.borrow();
        if (source) {
            inst.contentRect = source.contentRect;
            inst.uvRect = source.uvRect;
            inst.vertexColor = source.vertexColor;
            inst.textureSize = source.textureSize;
        }
        return inst;
    }
    end() {
        this.clear();
        pool.returns(this);
    }
    clear() {
        this.vertices.length = 0;
        this.colors.length = 0;
        this.uvs.length = 0;
        this.triangles.length = 0;
    }
    get currentVertCount() {
        return this.vertices.length / 3;
    }
    addVert(x, y, z, uv_x, uv_y, color) {
        y = -y;
        this.vertices.push(x, y, z ? z : 0);
        if (typeof uv_x === 'number')
            this.uvs.push(uv_x, uv_y);
        else {
            this.uvs.push(lerp(this.uvRect.x, this.uvRect.xMax, (x - this.contentRect.x) / this.contentRect.width), lerp(this.uvRect.yMax, this.uvRect.y, (-y - this.contentRect.y) / this.contentRect.height));
            if (uv_x instanceof Color4)
                color = uv_x;
        }
        if (color == null)
            color = this.vertexColor;
        this.colors.push(color.r, color.g, color.b, color.a);
    }
    addQuad(vertRect, uvRect, color) {
        uvBuf.length = 0;
        if (uvRect) {
            if (Array.isArray(uvRect)) {
                for (let i = 0; i < 4; i++)
                    uvBuf.push(uvRect[i].x, uvRect[i].y);
            }
            else
                uvBuf.push(uvRect.x, uvRect.y, uvRect.x, uvRect.yMax, uvRect.xMax, uvRect.yMax, uvRect.xMax, uvRect.y);
        }
        this.addVert(vertRect.x, vertRect.yMax, 0, uvBuf[0], uvBuf[1], color);
        this.addVert(vertRect.x, vertRect.y, 0, uvBuf[2], uvBuf[3], color);
        this.addVert(vertRect.xMax, vertRect.y, 0, uvBuf[4], uvBuf[5], color);
        this.addVert(vertRect.xMax, vertRect.yMax, 0, uvBuf[6], uvBuf[7], color);
    }
    repeatColors(value, startIndex, count) {
        let len = Math.min(startIndex + count, this.vertices.length / 3);
        let colorCount = value.length;
        let k = 0;
        for (let i = startIndex; i < len; i++) {
            let c = value[(k++) % colorCount];
            this.colors[i] = c;
        }
    }
    addTriangle(idx0, idx1, idx2) {
        this.triangles.push(idx0);
        this.triangles.push(idx1);
        this.triangles.push(idx2);
    }
    addTriangles(startVertexIndex, idxList) {
        if (idxList != null) {
            if (startVertexIndex != 0) {
                if (startVertexIndex < 0)
                    startVertexIndex = this.vertices.length / 3 + startVertexIndex;
                let cnt = idxList.length;
                for (let i = 0; i < cnt; i++)
                    this.triangles.push(idxList[i] + startVertexIndex);
            }
            else
                this.triangles.push.apply(this.triangles, idxList);
        }
        else {
            let cnt = this.vertices.length / 3;
            if (startVertexIndex == null)
                startVertexIndex = 0;
            else if (startVertexIndex < 0)
                startVertexIndex = cnt + startVertexIndex;
            let idxList = this.triangles;
            for (let i = startVertexIndex; i < cnt; i += 4) {
                idxList.push(i);
                idxList.push(i + 2);
                idxList.push(i + 1);
                idxList.push(i + 3);
                idxList.push(i + 2);
                idxList.push(i);
            }
        }
    }
    getPosition(index, ret) {
        if (index < 0)
            index = this.vertices.length / 3 + index;
        let vec = ret ? ret : new Vector3();
        vec.x = this.vertices[index * 3];
        vec.y = -this.vertices[index * 3 + 1];
        vec.z = this.vertices[index * 3 + 2];
        return vec;
    }
    append(vb) {
        this.vertices.push.apply(this.vertices, vb.vertices);
        this.uvs.push.apply(this.uvs, vb.uvs);
        this.colors.push.apply(this.colors, vb.colors);
        this.triangles.push.apply(this.triangles, vb.triangles);
    }
}
var pool = new Pool(VertexBuffer);
var uvBuf = new Array(8);
