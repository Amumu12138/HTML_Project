import { DisplayObject } from "./DisplayObject";
import { NGraphics } from "./NGraphics";
import { RectMesh } from "./mesh/RectMesh";
import { EmptyTexture } from "./NTexture";
import { RoundedRectMesh } from "./mesh/RoundedRectMesh";
import { EllipseMesh } from "./mesh/EllipseMesh";
import { PolygonMesh } from "./mesh/PolygonMesh";
import { RegularPolygonMesh } from "./mesh/RegularPolygonMesh";
export class Shape extends DisplayObject {
    constructor() {
        super();
        this._graphics = new NGraphics(this._obj3D);
        this._graphics.texture = EmptyTexture;
    }
    drawRect(lineWidth, lineColor, fillColor) {
        let mesh = this._graphics.getMeshFactory(RectMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawRoundRect(lineWidth, lineColor, fillColor, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) {
        let mesh = this._graphics.getMeshFactory(RoundedRectMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        mesh.topLeftRadius = topLeftRadius;
        mesh.topRightRadius = topRightRadius;
        mesh.bottomLeftRadius = bottomLeftRadius;
        mesh.bottomRightRadius = bottomRightRadius;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawEllipse(lineWidth, centerColor, lineColor, fillColor, startDegree, endDegree) {
        let mesh = this._graphics.getMeshFactory(EllipseMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        if (centerColor.equals(fillColor))
            mesh.centerColor = null;
        else
            mesh.centerColor = centerColor;
        mesh.startDegree = startDegree;
        mesh.endDegreee = endDegree;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawPolygon(points, fillColor, lineWidth, lineColor) {
        let mesh = this._graphics.getMeshFactory(PolygonMesh);
        mesh.points.length = 0;
        mesh.points.push.apply(mesh.points, points);
        mesh.fillColor = fillColor;
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawRegularPolygon(sides, lineWidth, centerColor, lineColor, fillColor, rotation, distances) {
        let mesh = this._graphics.getMeshFactory(RegularPolygonMesh);
        mesh.sides = sides;
        mesh.lineWidth = lineWidth;
        mesh.centerColor = centerColor;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        mesh.rotation = rotation;
        mesh.distances = distances;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    clear() {
        this._graphics.meshFactory = null;
        this._graphics.setMeshDirty();
    }
    hitTest(context) {
        if (!this._graphics.meshFactory)
            return null;
        let pt = context.getLocal(this);
        let ht = this._graphics.meshFactory;
        if ('hitTest' in ht)
            return ht.hitTest(this._contentRect, pt.x, pt.y) ? this : null;
        else if (this._contentRect.contains(pt))
            return this;
        else
            return null;
    }
}
