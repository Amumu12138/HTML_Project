import { Stage, broadcastEvent } from "../core/Stage";
export var ScaleMode;
(function (ScaleMode) {
    ScaleMode[ScaleMode["ConstantPixelSize"] = 0] = "ConstantPixelSize";
    ScaleMode[ScaleMode["ScaleWithScreenSize"] = 1] = "ScaleWithScreenSize";
    ScaleMode[ScaleMode["ConstantPhysicalSize"] = 2] = "ConstantPhysicalSize";
})(ScaleMode || (ScaleMode = {}));
export var ScreenMatchMode;
(function (ScreenMatchMode) {
    ScreenMatchMode[ScreenMatchMode["MatchWidthOrHeight"] = 0] = "MatchWidthOrHeight";
    ScreenMatchMode[ScreenMatchMode["MatchWidth"] = 1] = "MatchWidth";
    ScreenMatchMode[ScreenMatchMode["MatchHeight"] = 2] = "MatchHeight";
})(ScreenMatchMode || (ScreenMatchMode = {}));
export class UIContentScaler {
    static get scaleFactor() { return _scaleFactor; }
    static get scaleLevel() { return _scaleLevel; }
    static scaleWithScreenSize(designResolutionX, designResolutionY, screenMatchMode) {
        _designResolutionX = designResolutionX;
        _designResolutionY = designResolutionY;
        _scaleMode = ScaleMode.ScaleWithScreenSize;
        _screenMatchMode = screenMatchMode || ScreenMatchMode.MatchWidthOrHeight;
        refresh();
    }
    static setConstant(constantScaleFactor) {
        _scaleMode = ScaleMode.ConstantPixelSize;
        _constantScaleFactor = constantScaleFactor || 1;
        refresh();
    }
}
var _scaleMode = ScaleMode.ConstantPixelSize;
var _screenMatchMode;
var _designResolutionX = 1136;
var _designResolutionY = 640;
// var _fallbackScreenDPI: number;
// var _defaultSpriteDPI: number;
var _constantScaleFactor = 1;
var _ignoreOrientation;
var _scaleFactor = 1;
var _scaleLevel = 0;
Stage.eventDispatcher.on("size_changed", refresh);
function refresh() {
    let screenWidth = Stage.width;
    let screenHeight = Stage.height;
    if (_scaleMode == ScaleMode.ScaleWithScreenSize) {
        if (_designResolutionX == 0 || _designResolutionY == 0)
            return;
        let dx = _designResolutionX;
        let dy = _designResolutionY;
        if (!_ignoreOrientation && (screenWidth > screenHeight && dx < dy || screenWidth < screenHeight && dx > dy)) {
            //scale should not change when orientation change
            let tmp = dx;
            dx = dy;
            dy = tmp;
        }
        if (_screenMatchMode == ScreenMatchMode.MatchWidthOrHeight) {
            let s1 = screenWidth / dx;
            let s2 = screenHeight / dy;
            _scaleFactor = Math.min(s1, s2);
        }
        else if (_screenMatchMode == ScreenMatchMode.MatchWidth)
            _scaleFactor = screenWidth / dx;
        else
            _scaleFactor = screenHeight / dy;
    }
    else if (_scaleMode == ScaleMode.ConstantPhysicalSize) {
        // let dpi = Screen.dpi;
        // if (dpi == 0)
        //     dpi = _fallbackScreenDPI;
        // if (dpi == 0)
        //     dpi = 96;
        // _scaleFactor = dpi / (defaultSpriteDPI == 0 ? 96 : defaultSpriteDPI);
    }
    else
        _scaleFactor = _constantScaleFactor;
    if (_scaleFactor > 10)
        _scaleFactor = 10;
    if (_scaleFactor > 3)
        _scaleLevel = 3; //x4
    else if (_scaleFactor > 2)
        _scaleLevel = 2; //x3
    else if (_scaleFactor > 1)
        _scaleLevel = 1; //x2
    else
        _scaleLevel = 0;
    broadcastEvent(Stage.scene, "content_scale_factor_changed");
}
