import { Scene, Vector2, Renderer, AudioListener, Object3D, Camera, Vector3, Matrix4 } from "three";
import { DisplayObject } from "./DisplayObject";
import { EventDispatcher } from "../event/EventDispatcher";
declare type ScreenMode = "none" | "horizontal" | "vertical";
export declare var UILayer: number;
export interface StageInitParameters {
    screenMode?: ScreenMode;
    defaultLayer?: number;
}
export declare class Stage {
    static fontRebuilt?: boolean;
    static audioListener?: AudioListener;
    static disableMatrixValidation: boolean;
    static readonly eventDispatcher: EventDispatcher;
    static init(renderer: Renderer, parameters?: StageInitParameters): void;
    static set scene(value: Scene);
    static get scene(): Scene;
    static get domElement(): HTMLCanvasElement;
    static get devicePixelRatio(): number;
    static get touchScreen(): boolean;
    static get camera(): Camera;
    static set camera(value: Camera);
    static get width(): number;
    static get height(): number;
    static get touchPos(): Vector2;
    static get canvasTransform(): Matrix4;
    static get touchTarget(): DisplayObject;
    static get touchCount(): number;
    static getTouchPos(touchId?: number, ret?: Vector2): Vector2;
    static addTouchMonitor(touchId: number, target: EventDispatcher): void;
    static removeTouchMonitor(target: EventDispatcher): void;
    static cancelClick(touchId: number): void;
    static update(): void;
    static hitTest(x: number, y: number, forTouch?: boolean): DisplayObject;
    static setFocus(obj: DisplayObject): void;
}
declare type HitTestRay = {
    origin: Vector3;
    direction: Vector3;
};
export declare class HitTestContext {
    readonly screenPt: Vector3;
    forTouch: boolean;
    private _camera;
    private _ray;
    get camera(): Camera;
    set camera(value: Camera);
    get ray(): HitTestRay;
    set ray(value: HitTestRay);
    getLocal(obj: DisplayObject): Vector2;
}
export declare function screenToWorld(camera: Camera, x: number, y: number, outPt: Vector3, outDir: Vector3): void;
export declare function worldToScreen(camera: Camera, input: Vector3, output: Vector2): void;
export declare function broadcastEvent(p: Object3D, type: string, data?: any): void;
export declare function bubbleEvent(p: Object3D, type: string, data?: any, addChain?: Array<EventDispatcher>): void;
export {};
