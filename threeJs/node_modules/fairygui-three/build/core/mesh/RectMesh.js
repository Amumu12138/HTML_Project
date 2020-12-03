import { Rect } from "../../utils/Rect";
var s_rect = new Rect();
export class RectMesh {
    constructor() {
        this.lineWidth = 1;
    }
    onPopulateMesh(vb) {
        let rect = this.drawRect ? this.drawRect : vb.contentRect;
        let color = this.fillColor ? this.fillColor : vb.vertexColor;
        let lineColor = this.lineColor ? this.lineColor : vb.vertexColor;
        if (this.lineWidth == 0) {
            if (color.a != 0) //optimized
                vb.addQuad(rect, null, color);
        }
        else {
            let part = s_rect;
            //left,right
            part.set(rect.x, rect.y, this.lineWidth, rect.height);
            vb.addQuad(part, null, lineColor);
            part.set(rect.xMax - this.lineWidth, rect.y, this.lineWidth, rect.height);
            vb.addQuad(part, null, lineColor);
            //top, bottom
            part.set(rect.x + this.lineWidth, rect.y, rect.width - this.lineWidth * 2, this.lineWidth);
            vb.addQuad(part, null, lineColor);
            part.set(rect.x + this.lineWidth, rect.yMax - this.lineWidth, rect.width - this.lineWidth * 2, this.lineWidth);
            vb.addQuad(part, null, lineColor);
            //middle
            if (color.a != 0) //optimized
             {
                part.setMinMax(rect.x + this.lineWidth, rect.y + this.lineWidth, rect.xMax - this.lineWidth, rect.yMax - this.lineWidth);
                if (part.width > 0 && part.height > 0)
                    vb.addQuad(part, null, color);
            }
        }
        vb.addTriangles();
    }
}
