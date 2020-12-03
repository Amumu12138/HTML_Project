import { EventPool } from "./Event";
export class EventDispatcher {
    constructor() {
        this._listeners = {};
    }
    on(type, callback, target, capture) {
        let col = this._listeners[type];
        if (!col) {
            col = { dispatching: 0, callbacks: [], captures: [] };
            this._listeners[type] = col;
        }
        let arr = capture ? col.captures : col.callbacks;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1)
            arr[index + 2] = false;
        else
            arr.push(callback, target, false);
    }
    off(type, callback, target, capture) {
        let col = this._listeners[type];
        if (!col)
            return;
        let arr = capture ? col.captures : col.callbacks;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1) {
            if (col.dispatching != 0) {
                arr[index + 2] = true;
                col.dispatching = 2;
            }
            else
                arr.splice(index, 3);
        }
    }
    offAll(type) {
        if (type) {
            let col = this._listeners[type];
            if (col) {
                if (col.dispatching != 0) {
                    col.callbacks.forEach((value, index, arr) => arr[index + 2] = true);
                    col.captures.forEach((value, index, arr) => arr[index + 2] = true);
                    col.dispatching = 2;
                }
                else {
                    col.callbacks.length = 0;
                    col.captures.length = 0;
                }
            }
        }
        else {
            for (var key in this._listeners) {
                delete this._listeners[key];
            }
        }
    }
    hasListener(type, callback, target, capture) {
        let col = this._listeners[type];
        if (!col)
            return false;
        let arr = capture ? col.captures : col.callbacks;
        if (!callback)
            return arr.length > 0;
        else
            arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target) != -1;
    }
    dispatchEvent(type, data) {
        let col = this._listeners[type];
        if (!col || col.callbacks.length == 0 && col.captures.length == 0)
            return;
        let ev = EventPool.borrow(type);
        ev._type = type;
        ev.data = data;
        this._dispatch(col, ev, true);
        this._dispatch(col, ev, false);
        EventPool.returns(ev);
        return ev._defaultPrevented;
    }
    _dispatch(col, ev, capture) {
        if (col.dispatching != 0)
            return;
        col.dispatching = 1;
        ev._sender = this;
        let arr = capture ? col.captures : col.callbacks;
        let cnt = arr.length;
        for (let i = 0; i < cnt; i += 3) {
            arr[i].call(arr[i + 1], ev);
        }
        if (col.dispatching == 2) {
            let cnt = arr.length;
            let i = 0;
            while (i < cnt) {
                if (arr[i + 2]) {
                    arr.splice(i, 3);
                    cnt -= 3;
                    continue;
                }
                else
                    i += 3;
            }
        }
        col.dispatching = 0;
    }
}
