import { Pool } from "../utils/Pool";
export var lastInput = {
    x: 0,
    y: 0,
    mouseWheelDelta: 0,
    touchId: 0,
    button: 0,
    clickCount: 0,
    holdTime: 0,
};
export class Event {
    constructor() {
        this.data = null;
        this._callChain = [];
    }
    get type() {
        return this._type;
    }
    get sender() {
        return this._sender;
    }
    get initiator() {
        return this._initiator;
    }
    get input() {
        return lastInput;
    }
    stopPropagation() {
        this._stopsPropagation = true;
    }
    preventDefault() {
        this._defaultPrevented = true;
    }
    captureTouch() {
        this._touchCapture = true;
    }
    get isDefaultPrevented() {
        return this._defaultPrevented;
    }
}
export var EventPool = new Pool(Event, obj => {
    obj._stopsPropagation = false;
    obj._defaultPrevented = false;
    obj._touchCapture = false;
}, obj => {
    obj.data = null;
    obj._initiator = null;
    obj._sender = null;
});
