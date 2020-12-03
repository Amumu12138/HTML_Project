import { Vector2, Vector3 } from "three";
import { lerp } from "../../utils/ToolSet";
var sRestIndices = [];
var a = new Vector2();
var b = new Vector2();
var c = new Vector2();
var p = new Vector2();
var p0 = new Vector3();
var p1 = new Vector3();
var p3 = new Vector3();
var lineVector = new Vector3();
var widthVector = new Vector3();
export class PolygonMesh {
    constructor() {
        this.points = new Array();
        this.texcoords = new Array();
    }
    add(x, y, uv_x, uv_y) {
        this.points.push(x, y);
        if (uv_x != null)
            this.texcoords.push(uv_x, uv_y);
    }
    onPopulateMesh(vb) {
        let numVertices = this.points.length / 2;
        if (numVertices < 3)
            return;
        let restIndexPos, numRestIndices;
        let color = this.fillColor != null ? this.fillColor : vb.vertexColor;
        let w = vb.contentRect.width;
        let h = vb.contentRect.height;
        let useTexcoords = this.texcoords.length >= this.points.length;
        for (let i = 0; i < numVertices; i++) {
            let j = i * 2;
            let vx = this.points[j];
            let vy = this.points[j + 1];
            if (this.usePercentPositions) {
                vx *= w;
                vy *= h;
            }
            if (useTexcoords) {
                let ux = this.texcoords[j];
                let uy = this.texcoords[j + 1];
                ux = lerp(vb.uvRect.x, vb.uvRect.xMax, ux);
                uy = lerp(vb.uvRect.y, vb.uvRect.yMax, uy);
                vb.addVert(vx, vy, 0, ux, uy, color);
            }
            else
                vb.addVert(vx, vy, 0, color);
        }
        // Algorithm "Ear clipping method" described here:
        // -> https://en.wikipedia.org/wiki/Polygon_triangulation
        //
        // Implementation inspired by:
        // -> http://polyk.ivank.net
        // -> Starling
        sRestIndices.length = 0;
        for (let i = 0; i < numVertices; ++i)
            sRestIndices.push(i);
        restIndexPos = 0;
        numRestIndices = numVertices;
        let otherIndex;
        let earFound;
        let i0, i1, i2;
        while (numRestIndices > 3) {
            earFound = false;
            i0 = sRestIndices[restIndexPos % numRestIndices];
            i1 = sRestIndices[(restIndexPos + 1) % numRestIndices];
            i2 = sRestIndices[(restIndexPos + 2) % numRestIndices];
            a.set(this.points[i0 * 2], this.points[i0 * 2 + 1]);
            b.set(this.points[i1 * 2], this.points[i1 * 2 + 1]);
            c.set(this.points[i2 * 2], this.points[i2 * 2 + 1]);
            if ((a.y - b.y) * (c.x - b.x) + (b.x - a.x) * (c.y - b.y) >= 0) {
                earFound = true;
                for (let i = 3; i < numRestIndices; ++i) {
                    otherIndex = sRestIndices[(restIndexPos + i) % numRestIndices];
                    p.set(this.points[otherIndex * 2], this.points[otherIndex * 2 + 1]);
                    if (this.isPointInTriangle(p, a, b, c)) {
                        earFound = false;
                        break;
                    }
                }
            }
            if (earFound) {
                vb.addTriangle(i0, i2, i1);
                sRestIndices.splice((restIndexPos + 1) % numRestIndices, 1);
                numRestIndices--;
                restIndexPos = 0;
            }
            else {
                restIndexPos++;
                if (restIndexPos == numRestIndices)
                    break; // no more ears
            }
        }
        vb.addTriangle(sRestIndices[0], sRestIndices[2], sRestIndices[1]);
        if (this.lineWidth > 0)
            this.drawOutline(vb);
    }
    drawOutline(vb) {
        let numVertices = this.points.length / 2;
        let start = vb.currentVertCount - numVertices;
        let k = vb.currentVertCount;
        for (let i = 0; i < numVertices; i++) {
            vb.getPosition(start + i, p0);
            if (i < numVertices - 1)
                vb.getPosition(start + i + 1, p1);
            else
                vb.getPosition(vb.vertices[start], p1);
            lineVector.copy(p1);
            lineVector.sub(p0);
            widthVector.copy(lineVector);
            widthVector.cross(new Vector3(0, 0, 1));
            widthVector.normalize();
            widthVector.multiplyScalar(this.lineWidth * 0.5);
            p3.copy(p0);
            p3.sub(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            p3.copy(p0);
            p3.add(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            p3.copy(p1);
            p3.sub(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            p3.copy(p1);
            p3.add(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            k += 4;
            vb.addTriangle(k - 4, k - 1, k - 3);
            vb.addTriangle(k - 4, k - 2, k - 1);
            //joint
            if (i != 0) {
                vb.addTriangle(k - 6, k - 3, k - 5);
                vb.addTriangle(k - 6, k - 4, k - 3);
            }
            if (i == numVertices - 1) {
                start += numVertices;
                vb.addTriangle(k - 2, start + 1, k - 1);
                vb.addTriangle(k - 2, start, start + 1);
            }
        }
    }
    isPointInTriangle(p, a, b, c) {
        // From Starling
        // This algorithm is described well in this article:
        // http://www.blackpawn.com/texts/pointinpoly/default.html
        let v0x = c.x - a.x;
        let v0y = c.y - a.y;
        let v1x = b.x - a.x;
        let v1y = b.y - a.y;
        let v2x = p.x - a.x;
        let v2y = p.y - a.y;
        let dot00 = v0x * v0x + v0y * v0y;
        let dot01 = v0x * v1x + v0y * v1y;
        let dot02 = v0x * v2x + v0y * v2y;
        let dot11 = v1x * v1x + v1y * v1y;
        let dot12 = v1x * v2x + v1y * v2y;
        let invDen = 1.0 / (dot00 * dot11 - dot01 * dot01);
        let u = (dot11 * dot02 - dot01 * dot12) * invDen;
        let v = (dot00 * dot12 - dot01 * dot02) * invDen;
        return (u >= 0) && (v >= 0) && (u + v < 1);
    }
    hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y))
            return false;
        // Algorithm & implementation thankfully taken from:
        // -> http://alienryderflex.com/polygon/
        // inspired by Starling
        let len = this.points.length / 2;
        let i;
        let j = len - 1;
        let oddNodes = false;
        let w = contentRect.width;
        let h = contentRect.height;
        for (i = 0; i < len; ++i) {
            let ix = this.points[i * 2];
            let iy = this.points[i * 2 + 1];
            let jx = this.points[j * 2];
            let jy = this.points[j * 2 + 1];
            if (this.usePercentPositions) {
                ix *= w;
                iy *= h;
                ix *= w;
                iy *= h;
            }
            if ((iy < y && jy >= y || jy < y && iy >= y) && (ix <= x || jx <= x)) {
                if (ix + (y - iy) / (jy - iy) * (jx - ix) < x)
                    oddNodes = !oddNodes;
            }
            j = i;
        }
        return oddNodes;
    }
}
