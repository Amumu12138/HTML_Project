import { Pool } from "../utils/Pool";
import { DisplayObject } from "../core/DisplayObject";
import { EventDispatcher } from "./EventDispatcher";
export declare type EventType = "touch_begin" | "touch_end" | "touch_move" | "click" | "right_click" | "roll_over" | "roll_out" | "mouse_wheel" | "content_scale_factor_changed" | "added_to_stage" | "removed_from_stage" | "pos_changed" | "size_changed" | "status_changed" | "focus_in" | "focus_out" | "drag_start" | "drag_move" | "drag_end" | "drop" | "scroll" | "scroll_end" | "pull_down_release" | "pull_up_release" | "click_item" | "click_link" | "play_end" | "gear_stop";
export interface InputInfo {
    x: number;
    y: number;
    mouseWheelDelta: number;
    touchId: number;
    button: number;
    clickCount: number;
    holdTime: number;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    commandKey?: boolean;
}
export declare var lastInput: InputInfo;
export declare class Event {
    data: any;
    _defaultPrevented: boolean;
    _stopsPropagation: boolean;
    _touchCapture: boolean;
    _callChain: Array<EventDispatcher>;
    _type: string;
    _sender: EventDispatcher;
    _initiator: DisplayObject;
    constructor();
    get type(): string;
    get sender(): EventDispatcher;
    get initiator(): DisplayObject;
    get input(): InputInfo;
    stopPropagation(): void;
    preventDefault(): void;
    captureTouch(): void;
    get isDefaultPrevented(): boolean;
}
export declare var EventPool: Pool<Event>;
