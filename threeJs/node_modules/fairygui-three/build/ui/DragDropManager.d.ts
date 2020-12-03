import { GObject } from "./GObject";
export declare class DragDropManager {
    private _agent;
    private _sourceData;
    static get inst(): DragDropManager;
    constructor();
    get dragAgent(): GObject;
    get dragging(): boolean;
    startDrag(icon: string, sourceData?: any, touchPointID?: number): void;
    cancel(): void;
    private __dragEnd;
}
