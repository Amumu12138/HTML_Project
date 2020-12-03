import { Event, EventType } from "./Event";
declare type Listeners = {
    dispatching?: number;
    callbacks: Array<any>;
    captures: Array<any>;
};
export declare class EventDispatcher {
    _listeners: {
        [index: string]: Listeners;
    };
    constructor();
    on(type: EventType, callback: Function, target?: any, capture?: boolean): void;
    on(type: string, callback: Function, target?: any, capture?: boolean): void;
    off(type: EventType, callback: Function, target?: any, capture?: boolean): void;
    off(type: string, callback: Function, target?: any, capture?: boolean): void;
    offAll(type?: EventType): void;
    offAll(type?: string): void;
    hasListener(type: EventType, callback?: Function, target?: any, capture?: boolean): boolean;
    hasListener(type: string, callback?: Function, target?: any, capture?: boolean): boolean;
    dispatchEvent(type: EventType, data?: any): boolean;
    dispatchEvent(type: string, data?: any): boolean;
    _dispatch(col: Listeners, ev: Event, capture?: boolean): void;
}
export {};
