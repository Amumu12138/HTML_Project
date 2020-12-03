import { Color4 } from "../utils/Color";
import { ScrollBarDisplayType } from "./FieldTypes";
export class UIConfig {
}
//Default font name
UIConfig.defaultFont = "Arial";
//When a modal window is in front, the background becomes dark.
UIConfig.modalLayerColor = new Color4(0x333333, 0.2);
//Default button click sound
UIConfig.buttonSound = null;
UIConfig.buttonSoundVolumeScale = 1;
//Default button click sound
UIConfig.horizontalScrollBar = null;
UIConfig.verticalScrollBar = null;
//Scrolling step in pixels
UIConfig.defaultScrollStep = 25;
//Deceleration ratio of scrollpane when its in touch dragging.
UIConfig.defaultScrollDecelerationRate = 0.967;
//Default scrollbar display mode. Recommened visible for Desktop and Auto for mobile.
UIConfig.defaultScrollBarDisplay = ScrollBarDisplayType.Visible;
//Allow dragging the content to scroll. Recommeded true for mobile.
UIConfig.defaultScrollTouchEffect = true;
//The "rebound" effect in the scolling container. Recommeded true for mobile.
UIConfig.defaultScrollBounceEffect = true;
/**
* 当滚动容器设置为“贴近ITEM”时，判定贴近到哪一个ITEM的滚动距离阀值。
*/
UIConfig.defaultScrollSnappingThreshold = 0.1;
/**
* 当滚动容器设置为“页面模式”时，判定翻到哪一页的滚动距离阀值。
*/
UIConfig.defaultScrollPagingThreshold = 0.3;
//Resources for PopupMenu.
UIConfig.popupMenu = null;
//Resources for seperator of PopupMenu.
UIConfig.popupMenu_seperator = null;
//In case of failure of loading content for GLoader, use this sign to indicate an error.
UIConfig.loaderErrorSign = null;
//Resources for tooltips.
UIConfig.tooltipsWin = null;
//Max items displayed in combobox without scrolling.
UIConfig.defaultComboBoxVisibleItemCount = 10;
// Pixel offsets of finger to trigger scrolling.
UIConfig.touchScrollSensitivity = 20;
// Pixel offsets of finger to trigger dragging.
UIConfig.touchDragSensitivity = 10;
// Pixel offsets of mouse pointer to trigger dragging.
UIConfig.clickDragSensitivity = 2;
// When click the window, brings to front automatically.
UIConfig.bringWindowToFrontOnClick = true;
UIConfig.frameTimeForAsyncUIConstruction = 2;
UIConfig.packageFileExtension = "fui";
