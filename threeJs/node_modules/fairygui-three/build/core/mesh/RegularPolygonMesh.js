import { Color4 } from "../../utils/Color";
export class RegularPolygonMesh {
    constructor() {
        this.sides = 3;
        this.lineWidth = 1;
        this.lineColor = new Color4();
    }
    onPopulateMesh(vb) {
        if (this.distances != null && this.distances.length < this.sides) {
            console.error("distances.Length<sides");
            return;
        }
        let rect = this.drawRect != null ? this.drawRect : vb.contentRect;
        let color = this.fillColor != null ? this.fillColor : vb.vertexColor;
        let angleDelta = 2 * Math.PI / this.sides;
        let angle = this.rotation * Math.PI / 180;
        let radius = Math.min(rect.width / 2, rect.height / 2);
        let centerX = radius + rect.x;
        let centerY = radius + rect.y;
        vb.addVert(centerX, centerY, 0, this.centerColor ? this.centerColor : color);
        for (let i = 0; i < this.sides; i++) {
            let r = radius;
            if (this.distances != null)
                r *= this.distances[i];
            let xv = Math.cos(angle) * (r - this.lineWidth);
            let yv = Math.sin(angle) * (r - this.lineWidth);
            vb.addVert(xv + centerX, yv + centerY, 0, color);
            if (this.lineWidth > 0) {
                vb.addVert(xv + centerX, yv + centerY, 0, this.lineColor);
                xv = Math.cos(angle) * r + centerX;
                yv = Math.sin(angle) * r + centerY;
                vb.addVert(xv, yv, 0, this.lineColor);
            }
            angle += angleDelta;
        }
        if (this.lineWidth > 0) {
            let tmp = this.sides * 3;
            for (let i = 0; i < tmp; i += 3) {
                if (i != tmp - 3) {
                    vb.addTriangle(0, i + 4, i + 1);
                    vb.addTriangle(i + 5, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 5, i + 6);
                }
                else {
                    vb.addTriangle(0, 1, i + 1);
                    vb.addTriangle(2, i + 3, i + 2);
                    vb.addTriangle(i + 3, 2, 3);
                }
            }
        }
        else {
            for (let i = 0; i < this.sides; i++)
                vb.addTriangle(0, (i == this.sides - 1) ? 1 : i + 2, i + 1);
        }
    }
    hitTest(contentRect, x, y) {
        if (this.drawRect)
            return this.drawRect.contains(x, y);
        else
            return contentRect.contains(x, y);
    }
}
