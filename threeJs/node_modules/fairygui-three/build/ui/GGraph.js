import { GObject } from "./GObject";
import { ObjectPropID } from "./FieldTypes";
import { Shape } from "../core/Shape";
export class GGraph extends GObject {
    constructor() {
        super();
    }
    get shape() {
        return this._shape;
    }
    get color() {
        return this._shape.graphics.color;
    }
    set color(value) {
        if (this._shape.graphics.color != value) {
            this._shape.graphics.color = value;
            this.updateGear(4);
        }
    }
    createDisplayObject() {
        this._displayObject = this._shape = new Shape();
    }
    getProp(index) {
        if (index == ObjectPropID.Color)
            return this.color;
        else
            return super.getProp(index);
    }
    setProp(index, value) {
        if (index == ObjectPropID.Color)
            this.color = value;
        else
            super.setProp(index, value);
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        let type = buffer.readByte();
        if (type != 0) {
            let i;
            let cnt;
            let lineSize = buffer.readInt();
            let lineColor = buffer.readFullColor();
            let fillColor = buffer.readFullColor();
            let roundedRect = buffer.readBool();
            let cornerRadius;
            if (roundedRect) {
                cornerRadius = [];
                for (i = 0; i < 4; i++)
                    cornerRadius[i] = buffer.readFloat();
            }
            if (type == 1) {
                if (roundedRect)
                    this._shape.drawRoundRect(lineSize, lineColor, fillColor, cornerRadius[0], cornerRadius[1], cornerRadius[2], cornerRadius[3]);
                else
                    this._shape.drawRect(lineSize, lineColor, fillColor);
            }
            else if (type == 2) {
                this._shape.drawEllipse(lineSize, fillColor, lineColor, fillColor, 0, 360);
            }
            else if (type == 3) {
                cnt = buffer.readShort();
                let points = [];
                points.length = cnt;
                for (i = 0; i < cnt; i++)
                    points[i] = buffer.readFloat();
                this._shape.drawPolygon(points, fillColor, lineSize, lineColor);
            }
            else if (type == 4) {
                let sides = buffer.readShort();
                let startAngle = buffer.readFloat();
                cnt = buffer.readShort();
                let distances;
                if (cnt > 0) {
                    distances = [];
                    for (i = 0; i < cnt; i++)
                        distances[i] = buffer.readFloat();
                }
                this._shape.drawRegularPolygon(sides, lineSize, fillColor, lineColor, fillColor, startAngle, distances);
            }
        }
    }
}
