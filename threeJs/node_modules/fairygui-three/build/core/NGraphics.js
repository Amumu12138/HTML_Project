import { BufferAttribute, BufferGeometry, TrianglesDrawMode } from "three";
import { FlipType } from "../ui/FieldTypes";
import { Rect } from "../utils/Rect";
import { VertexBuffer } from "./mesh/VertexBuffer";
import { NMaterial } from "./NMaterial";
import { Color4 } from "../utils/Color";
export class NGraphics {
    constructor(owner) {
        this._flip = 0;
        this._color = 0xFFFFFF;
        this._contentRect = new Rect();
        this._material = new NMaterial();
        this._geometry = new BufferGeometry();
        let o = owner;
        o.geometry = this._geometry;
        o.material = this._material;
        o.isMesh = true;
        o.drawMode = TrianglesDrawMode;
        delete o.isGroup;
    }
    get texture() {
        return this._texture;
    }
    set texture(value) {
        if (this._texture != value) {
            this._texture = value;
            this._meshDirty = true;
        }
        if (this._texture)
            this._material.map = this._texture.nativeTexture;
        else
            this._material.map = null;
    }
    get material() {
        return this._material;
    }
    set material(value) {
        this._material = value;
    }
    get meshFactory() {
        return this._meshFactory;
    }
    set meshFactory(value) {
        if (this._meshFactory != value) {
            this._meshFactory = value;
            this._meshDirty = true;
        }
    }
    getMeshFactory(type) {
        if (!(this._meshFactory instanceof type)) {
            this._meshFactory = new type();
            this._meshDirty = true;
        }
        return this._meshFactory;
    }
    setDrawRect(rect) {
        this._contentRect.copy(rect);
        this._meshDirty = true;
    }
    get flip() {
        return this._flip;
    }
    set flip(value) {
        if (this._flip != value) {
            this._flip = value;
            this._meshDirty = true;
        }
    }
    get color() {
        return this._color;
    }
    set color(value) {
        if (this._color != value) {
            this._color = value;
            if (!this._meshDirty) {
                s_col.setHex(value);
                let attr = this._geometry.attributes["color"];
                if (attr) {
                    let arr = attr.array;
                    let len = arr.length;
                    for (let i = 0; i < len; i += 4) {
                        arr[i] = s_col.r;
                        arr[i + 1] = s_col.g;
                        arr[i + 2] = s_col.b;
                        arr[i + 3] = s_col.a;
                    }
                    attr.needsUpdate = true;
                }
            }
        }
    }
    get grayed() {
        return this._material.defines.GRAYED;
    }
    set grayed(value) {
        this.setKeyword("GRAYED", value);
    }
    setKeyword(key, value) {
        if (value) {
            this._material.defines[key] = value;
            this._material.needsUpdate = true;
        }
        else
            delete this._material.defines[key];
    }
    setMeshDirty() {
        this._meshDirty = true;
    }
    updateMesh() {
        if (this._meshDirty) {
            this.updateMeshNow();
            return true;
        }
        else
            return false;
    }
    update(clipPlanes, alpha) {
        if (this._meshDirty)
            this.updateMeshNow();
        this._material.clippingPlanes = clipPlanes;
        this._material.clipping = clipPlanes != null;
        this._material.opacity = alpha;
    }
    updateMeshNow() {
        this._meshDirty = false;
        if (!this._texture || !this._meshFactory) {
            if (this._geometry.drawRange.count > 0) {
                this._geometry.setDrawRange(0, 0);
                this._geometry.computeBoundingSphere();
            }
            return;
        }
        let vb = VertexBuffer.begin();
        vb.contentRect.copy(this._contentRect);
        vb.uvRect.copy(this._texture.uvRect);
        if (this._texture)
            vb.textureSize.set(this._texture.width, this._texture.height);
        else
            vb.textureSize.set(0, 0);
        if (this._flip != FlipType.None) {
            if (this._flip == FlipType.Horizontal || this._flip == FlipType.Both) {
                let tmp = vb.uvRect.xMin;
                vb.uvRect.xMin = vb.uvRect.xMax;
                vb.uvRect.xMax = tmp;
            }
            if (this._flip == FlipType.Vertical || this._flip == FlipType.Both) {
                let tmp = vb.uvRect.yMin;
                vb.uvRect.yMin = vb.uvRect.yMax;
                vb.uvRect.yMax = tmp;
            }
        }
        vb.vertexColor.setHex(this._color);
        this._meshFactory.onPopulateMesh(vb);
        let vertCount = vb.currentVertCount;
        if (vertCount == 0) {
            if (this._geometry.drawRange.count > 0) {
                this._geometry.setDrawRange(0, 0);
                this._geometry.computeBoundingSphere();
            }
            vb.end();
            return;
        }
        if (this._texture.rotated) {
            let xMin = this._texture.uvRect.x;
            let yMin = this._texture.uvRect.y;
            let yMax = this._texture.uvRect.yMax;
            let k = 0;
            for (let i = 0; i < vertCount; i++) {
                let v1 = vb.uvs[k];
                let v2 = vb.uvs[k + 1];
                vb.uvs[k + 1] = yMin + v1 - xMin;
                vb.uvs[k] = xMin + yMax - v2;
            }
        }
        let gm = this._geometry;
        this.writeAttribute(gm, "position", vb.vertices, 3);
        this.writeAttribute(gm, "uv", vb.uvs, 2);
        this.writeAttribute(gm, "color", vb.colors, 4);
        this.writeIndexAttribute(gm, vb.triangles);
        gm.setDrawRange(0, vb.triangles.length);
        gm.computeBoundingSphere();
        vb.end();
    }
    writeAttribute(gm, name, arr, itemSize) {
        let attr = gm.attributes[name];
        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
            attr = new BufferAttribute(new Float32Array(arr.length), itemSize);
            gm.setAttribute(name, attr);
        }
        attr.copyArray(arr);
        attr.needsUpdate = true;
    }
    writeIndexAttribute(gm, arr) {
        let attr = gm.index;
        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
            attr = new BufferAttribute(new Uint16Array(arr.length), 1);
            gm.index = attr;
        }
        attr.copyArray(arr);
        attr.needsUpdate = true;
    }
    onPopulateMesh(vb) {
        this._texture.getDrawRect(vb.contentRect);
        vb.addQuad(vb.contentRect, vb.uvRect, vb.vertexColor);
        vb.addTriangles();
    }
}
var s_col = new Color4();
