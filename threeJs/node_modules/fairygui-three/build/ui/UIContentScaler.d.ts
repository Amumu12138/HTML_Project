export declare enum ScaleMode {
    ConstantPixelSize = 0,
    ScaleWithScreenSize = 1,
    ConstantPhysicalSize = 2
}
export declare enum ScreenMatchMode {
    MatchWidthOrHeight = 0,
    MatchWidth = 1,
    MatchHeight = 2
}
export declare class UIContentScaler {
    static get scaleFactor(): number;
    static get scaleLevel(): number;
    static scaleWithScreenSize(designResolutionX: number, designResolutionY: number, screenMatchMode?: ScreenMatchMode): void;
    static setConstant(constantScaleFactor?: number): void;
}
