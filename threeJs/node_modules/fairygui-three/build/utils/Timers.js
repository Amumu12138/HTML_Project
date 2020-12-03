import { Pool } from "./Pool";
export class Timers {
    static add(delayInMiniseconds, repeat, callback, target, callbackParam) {
        let item;
        let index = _items.findIndex(e => e.target == target && e.callback == callback);
        if (index != -1)
            item = _items[index];
        else {
            item = _pool.borrow();
            item.callback = callback;
            item.target = target;
            _items.push(item);
        }
        item.delay = delayInMiniseconds;
        item.counter = 0;
        item.repeat = repeat;
        item.param = callbackParam;
        item.end = false;
    }
    static callLater(callback, target, callbackParam) {
        this.add(0, 1, callback, target, callbackParam);
    }
    static callDelay(delay, callback, target, callbackParam) {
        this.add(delay, 1, callback, target, callbackParam);
    }
    static addUpdate(callback, target, callbackParam) {
        this.add(0, 0, callback, target, callbackParam);
    }
    static exists(callback, target) {
        return _items.findIndex(e => e.target == target && e.callback == callback) != -1;
    }
    static remove(callback, target) {
        let index = _items.findIndex(e => e.target == target && e.callback == callback);
        if (index != -1) {
            let item = _items[index];
            _items.splice(index, 1);
            if (index < _enumI)
                _enumI--;
            _enumCount--;
            _pool.returns(item);
        }
    }
}
Timers.deltaTime = 0;
Timers.time = 0;
Timers.frameCount = 0;
class TimerItem {
    constructor() {
        this.delay = 0;
        this.counter = 0;
        this.repeat = 0;
    }
    advance(elapsed) {
        this.counter += elapsed;
        if (this.counter >= this.delay) {
            this.counter -= this.delay;
            if (this.counter > this.delay)
                this.counter = this.delay;
            if (this.repeat > 0) {
                this.repeat--;
                if (this.repeat == 0)
                    this.end = true;
            }
            return true;
        }
        else
            return false;
    }
    reset() {
        this.callback = null;
        this.target = null;
        this.param = null;
    }
}
var _items = new Array();
var _pool = new Pool(TimerItem, e => e.reset());
var _enumI = 0;
var _enumCount = 0;
var _lastTime = 0;
requestAnimationFrame(__timer);
function __timer(timeStamp) {
    requestAnimationFrame(__timer);
    Timers.frameCount++;
    Timers.time = timeStamp;
    let deltaTime = timeStamp - _lastTime;
    Timers.deltaTime = deltaTime;
    _lastTime = timeStamp;
    _enumI = 0;
    _enumCount = _items.length;
    while (_enumI < _enumCount) {
        var item = _items[_enumI];
        _enumI++;
        if (item.advance(deltaTime)) {
            if (item.end) {
                _enumI--;
                _enumCount--;
                _items.splice(_enumI, 1);
            }
            item.callback.call(item.target, item.param);
            if (item.end)
                _pool.returns(item);
        }
    }
    return false;
}
