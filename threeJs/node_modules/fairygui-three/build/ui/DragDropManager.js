import { Stage } from "../core/Stage";
import { GLoader } from "./GLoader";
import { GObject } from "./GObject";
import { GRoot } from "./GRoot";
var _inst;
export class DragDropManager {
    constructor() {
        let a = this._agent = new GLoader();
        a.draggable = true;
        a.touchable = false; ////important
        a.setSize(100, 100);
        a.setPivot(0.5, 0.5, true);
        a.align = "center";
        a.verticalAlign = "middle";
        a.sortingOrder = 1000000;
        a.on("drag_end", this.__dragEnd, this);
    }
    static get inst() {
        if (!_inst)
            _inst = new DragDropManager();
        return _inst;
    }
    get dragAgent() {
        return this._agent;
    }
    get dragging() {
        return this._agent.parent != null;
    }
    startDrag(icon, sourceData, touchPointID) {
        if (this._agent.parent)
            return;
        this._sourceData = sourceData;
        this._agent.url = icon;
        GRoot.inst.addChild(this._agent);
        var pt = GRoot.inst.globalToLocal(Stage.touchPos.x, Stage.touchPos.y);
        this._agent.setPosition(pt.x, pt.y);
        this._agent.startDrag(touchPointID != null ? touchPointID : -1);
    }
    cancel() {
        if (this._agent.parent) {
            this._agent.stopDrag();
            GRoot.inst.removeChild(this._agent);
            this._sourceData = null;
        }
    }
    __dragEnd(evt) {
        if (this._agent.parent == null) //cancelled
            return;
        GRoot.inst.removeChild(this._agent);
        var sourceData = this._sourceData;
        this._sourceData = null;
        var obj = GObject.cast(Stage.touchTarget);
        while (obj) {
            if (obj.hasListener("drop")) {
                obj.dispatchEvent("drop", sourceData);
                return;
            }
            obj = obj.parent;
        }
    }
}
