import { Vector2 } from "three";
import { DisplayObject } from "../core/DisplayObject";
import { Stage } from "../core/Stage";
import { GTween } from "../tween/GTween";
import { Rect } from "../utils/Rect";
import { Timers } from "../utils/Timers";
import { clamp, clamp01, lerp } from "../utils/ToolSet";
import { ScrollBarDisplayType, ScrollType } from "./FieldTypes";
import { GObject } from "./GObject";
import { Margin } from "./Margin";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
var s_vec2 = new Vector2();
var s_rect = new Rect();
var s_endPos = new Vector2();
var s_oldChange = new Vector2();
var s_gestureFlag = 0;
const TWEEN_TIME_GO = 0.5; //调用SetPos(ani)时使用的缓动时间
const TWEEN_TIME_DEFAULT = 0.3; //惯性滚动的最小缓动时间
const PULL_RATIO = 0.5; //下拉过顶或者上拉过底时允许超过的距离占显示区域的比例
export class ScrollPane {
    constructor(owner) {
        this._owner = owner;
        this._maskContainer = new DisplayObject();
        this._owner.displayObject.addChild(this._maskContainer);
        this._container = this._owner._container;
        this._container.setPosition(0, 0);
        this._maskContainer.addChild(this._container);
        this._mouseWheelEnabled = true;
        this._xPos = 0;
        this._yPos = 0;
        this._aniFlag = 0;
        this._tweening = 0;
        this._loop = 0;
        this._footerLockedSize = 0;
        this._headerLockedSize = 0;
        this._scrollBarMargin = new Margin();
        this._viewSize = new Vector2();
        this._contentSize = new Vector2();
        this._pageSize = new Vector2(1, 1);
        this._overlapSize = new Vector2();
        this._tweenTime = new Vector2();
        this._tweenStart = new Vector2();
        this._tweenDuration = new Vector2();
        this._tweenChange = new Vector2();
        this._velocity = new Vector2();
        this._containerPos = new Vector2();
        this._beginTouchPos = new Vector2();
        this._lastTouchPos = new Vector2();
        this._lastTouchGlobalPos = new Vector2();
        this._scrollStep = UIConfig.defaultScrollStep;
        this._decelerationRate = UIConfig.defaultScrollDecelerationRate;
        this._owner.on("touch_begin", this.__touchBegin, this);
        this._owner.on("touch_move", this.__touchMove, this);
        this._owner.on("touch_end", this.__touchEnd, this);
        this._owner.on("mouse_wheel", this.__mouseWheel, this);
    }
    setup(buffer) {
        this._scrollType = buffer.readByte();
        var scrollBarDisplay = buffer.readByte();
        var flags = buffer.readInt();
        if (buffer.readBool()) {
            this._scrollBarMargin.top = buffer.readInt();
            this._scrollBarMargin.bottom = buffer.readInt();
            this._scrollBarMargin.left = buffer.readInt();
            this._scrollBarMargin.right = buffer.readInt();
        }
        var vtScrollBarRes = buffer.readS();
        var hzScrollBarRes = buffer.readS();
        var headerRes = buffer.readS();
        var footerRes = buffer.readS();
        if ((flags & 1) != 0)
            this._displayOnLeft = true;
        if ((flags & 2) != 0)
            this._snapToItem = true;
        if ((flags & 4) != 0)
            this._displayInDemand = true;
        if ((flags & 8) != 0)
            this._pageMode = true;
        if (flags & 16)
            this._touchEffect = true;
        else if (flags & 32)
            this._touchEffect = false;
        else
            this._touchEffect = UIConfig.defaultScrollTouchEffect;
        if (flags & 64)
            this._bouncebackEffect = true;
        else if (flags & 128)
            this._bouncebackEffect = false;
        else
            this._bouncebackEffect = UIConfig.defaultScrollBounceEffect;
        if ((flags & 256) != 0)
            this._inertiaDisabled = true;
        if ((flags & 512) == 0)
            this._maskContainer.clipRect = new Rect();
        if ((flags & 1024) != 0)
            this._floating = true;
        if ((flags & 2048) != 0)
            this._dontClipMargin = true;
        if (scrollBarDisplay == ScrollBarDisplayType.Default)
            scrollBarDisplay = UIConfig.defaultScrollBarDisplay;
        if (scrollBarDisplay != ScrollBarDisplayType.Hidden) {
            if (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Vertical) {
                var res = vtScrollBarRes ? vtScrollBarRes : UIConfig.verticalScrollBar;
                if (res) {
                    this._vtScrollBar = (UIPackage.createObjectFromURL(res));
                    if (!this._vtScrollBar)
                        throw "cannot create scrollbar} from " + res;
                    this._vtScrollBar.setScrollPane(this, true);
                    this._owner.displayObject.addChild(this._vtScrollBar.displayObject);
                }
            }
            if (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Horizontal) {
                res = hzScrollBarRes ? hzScrollBarRes : UIConfig.horizontalScrollBar;
                if (res) {
                    this._hzScrollBar = (UIPackage.createObjectFromURL(res));
                    if (!this._hzScrollBar)
                        throw "cannot create scrollbar} from " + res;
                    this._hzScrollBar.setScrollPane(this, false);
                    this._owner.displayObject.addChild(this._hzScrollBar.displayObject);
                }
            }
            if (scrollBarDisplay == ScrollBarDisplayType.Auto)
                this._scrollBarDisplayAuto = true;
            if (this._scrollBarDisplayAuto) {
                if (this._vtScrollBar)
                    this._vtScrollBar.displayObject.visible = false;
                if (this._hzScrollBar)
                    this._hzScrollBar.displayObject.visible = false;
            }
        }
        else
            this._mouseWheelEnabled = false;
        if (headerRes) {
            this._header = UIPackage.createObjectFromURL(headerRes);
            if (!this._header)
                throw new Error("cannot create scrollPane header from " + headerRes);
        }
        if (footerRes) {
            this._footer = UIPackage.createObjectFromURL(footerRes);
            if (!this._footer)
                throw new Error("cannot create scrollPane footer from " + footerRes);
        }
        if (this._header || this._footer)
            this._refreshBarAxis = (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Vertical) ? "y" : "x";
        this.setSize(this.owner.width, this.owner.height);
    }
    dispose() {
        if (this._tweening != 0)
            Timers.remove(this.tweenUpdate, this);
        delete this._pageController;
        if (this._hzScrollBar)
            this._hzScrollBar.dispose();
        if (this._vtScrollBar)
            this._vtScrollBar.dispose();
        if (this._header)
            this._header.dispose();
        if (this._footer)
            this._footer.dispose();
    }
    get owner() {
        return this._owner;
    }
    get hzScrollBar() {
        return this._hzScrollBar;
    }
    get vtScrollBar() {
        return this._vtScrollBar;
    }
    get header() {
        return this._header;
    }
    get footer() {
        return this._footer;
    }
    get bouncebackEffect() {
        return this._bouncebackEffect;
    }
    set bouncebackEffect(sc) {
        this._bouncebackEffect = sc;
    }
    get touchEffect() {
        return this._touchEffect;
    }
    set touchEffect(sc) {
        this._touchEffect = sc;
    }
    set scrollStep(val) {
        this._scrollStep = val;
        if (this._scrollStep == 0)
            this._scrollStep = UIConfig.defaultScrollStep;
    }
    get scrollStep() {
        return this._scrollStep;
    }
    get snapToItem() {
        return this._snapToItem;
    }
    set snapToItem(value) {
        this._snapToItem = value;
    }
    get mouseWheelEnabled() {
        return this._mouseWheelEnabled;
    }
    set mouseWheelEnabled(value) {
        this._mouseWheelEnabled = value;
    }
    get decelerationRate() {
        return this._decelerationRate;
    }
    set decelerationRate(value) {
        this._decelerationRate = value;
    }
    get isDragged() {
        return this._dragged;
    }
    get percX() {
        return this._overlapSize.x == 0 ? 0 : this._xPos / this._overlapSize.x;
    }
    set percX(value) {
        this.setPercX(value, false);
    }
    setPercX(value, ani) {
        this._owner.ensureBoundsCorrect();
        this.setPosX(this._overlapSize.x * clamp01(value), ani);
    }
    get percY() {
        return this._overlapSize.y == 0 ? 0 : this._yPos / this._overlapSize.y;
    }
    set percY(value) {
        this.setPercY(value, false);
    }
    setPercY(value, ani) {
        this._owner.ensureBoundsCorrect();
        this.setPosY(this._overlapSize.y * clamp01(value), ani);
    }
    get posX() {
        return this._xPos;
    }
    set posX(value) {
        this.setPosX(value, false);
    }
    setPosX(value, ani) {
        this._owner.ensureBoundsCorrect();
        if (this._loop == 1)
            value = this.loopCheckingNewPos(value, "x");
        value = clamp(value, 0, this._overlapSize.x);
        if (value != this._xPos) {
            this._xPos = value;
            this.posChanged(ani);
        }
    }
    get posY() {
        return this._yPos;
    }
    set posY(value) {
        this.setPosY(value, false);
    }
    setPosY(value, ani) {
        this._owner.ensureBoundsCorrect();
        if (this._loop == 1)
            value = this.loopCheckingNewPos(value, "y");
        value = clamp(value, 0, this._overlapSize.y);
        if (value != this._yPos) {
            this._yPos = value;
            this.posChanged(ani);
        }
    }
    get contentWidth() {
        return this._contentSize.x;
    }
    get contentHeight() {
        return this._contentSize.y;
    }
    get viewWidth() {
        return this._viewSize.x;
    }
    set viewWidth(value) {
        value = value + this._owner.margin.left + this._owner.margin.right;
        if (this._vtScrollBar && !this._floating)
            value += this._vtScrollBar.width;
        this._owner.width = value;
    }
    get viewHeight() {
        return this._viewSize.y;
    }
    set viewHeight(value) {
        value = value + this._owner.margin.top + this._owner.margin.bottom;
        if (this._hzScrollBar && !this._floating)
            value += this._hzScrollBar.height;
        this._owner.height = value;
    }
    get currentPageX() {
        if (!this._pageMode)
            return 0;
        var page = Math.floor(this._xPos / this._pageSize.x);
        if (this._xPos - page * this._pageSize.x > this._pageSize.x * 0.5)
            page++;
        return page;
    }
    set currentPageX(value) {
        this.setCurrentPageX(value, false);
    }
    get currentPageY() {
        if (!this._pageMode)
            return 0;
        var page = Math.floor(this._yPos / this._pageSize.y);
        if (this._yPos - page * this._pageSize.y > this._pageSize.y * 0.5)
            page++;
        return page;
    }
    set currentPageY(value) {
        this.setCurrentPageY(value, false);
    }
    setCurrentPageX(value, ani) {
        if (!this._pageMode)
            return;
        this._owner.ensureBoundsCorrect();
        if (this._overlapSize.x > 0)
            this.setPosX(value * this._pageSize.x, ani);
    }
    setCurrentPageY(value, ani) {
        if (!this._pageMode)
            return;
        this._owner.ensureBoundsCorrect();
        if (this._overlapSize.y > 0)
            this.setPosY(value * this._pageSize.y, ani);
    }
    get isBottomMost() {
        return this._yPos == this._overlapSize.y || this._overlapSize.y == 0;
    }
    get isRightMost() {
        return this._xPos == this._overlapSize.x || this._overlapSize.x == 0;
    }
    get pageController() {
        return this._pageController;
    }
    set pageController(value) {
        this._pageController = value;
    }
    get scrollingPosX() {
        return clamp(-this._container.x, 0, this._overlapSize.x);
    }
    get scrollingPosY() {
        return clamp(-this._container.y, 0, this._overlapSize.y);
    }
    scrollTop(ani) {
        this.setPercY(0, ani);
    }
    scrollBottom(ani) {
        this.setPercY(1, ani);
    }
    scrollUp(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosY(this._yPos - this._pageSize.y * ratio, ani);
        else
            this.setPosY(this._yPos - this._scrollStep * ratio, ani);
        ;
    }
    scrollDown(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosY(this._yPos + this._pageSize.y * ratio, ani);
        else
            this.setPosY(this._yPos + this._scrollStep * ratio, ani);
    }
    scrollLeft(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosX(this._xPos - this._pageSize.x * ratio, ani);
        else
            this.setPosX(this._xPos - this._scrollStep * ratio, ani);
    }
    scrollRight(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosX(this._xPos + this._pageSize.x * ratio, ani);
        else
            this.setPosX(this._xPos + this._scrollStep * ratio, ani);
    }
    scrollToView(target, ani, setFirst) {
        this._owner.ensureBoundsCorrect();
        if (this._needRefresh)
            this.refresh();
        var rect;
        if (target instanceof GObject) {
            if (target.parent != this._owner) {
                target.parent.localToGlobalRect(target.x, target.y, target.width, target.height, s_rect);
                rect = this._owner.globalToLocalRect(s_rect.x, s_rect.y, s_rect.width, s_rect.height, s_rect);
            }
            else {
                rect = s_rect;
                rect.set(target.x, target.y, target.width, target.height);
            }
        }
        else
            rect = target;
        if (this._overlapSize.y > 0) {
            var bottom = this._yPos + this._viewSize.y;
            if (setFirst || rect.y <= this._yPos || rect.height >= this._viewSize.y) {
                if (this._pageMode)
                    this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);
                else
                    this.setPosY(rect.y, ani);
            }
            else if (rect.y + rect.height > bottom) {
                if (this._pageMode)
                    this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);
                else if (rect.height <= this._viewSize.y / 2)
                    this.setPosY(rect.y + rect.height * 2 - this._viewSize.y, ani);
                else
                    this.setPosY(rect.y + rect.height - this._viewSize.y, ani);
            }
        }
        if (this._overlapSize.x > 0) {
            var right = this._xPos + this._viewSize.x;
            if (setFirst || rect.x <= this._xPos || rect.width >= this._viewSize.x) {
                if (this._pageMode)
                    this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);
                else
                    this.setPosX(rect.x, ani);
            }
            else if (rect.x + rect.width > right) {
                if (this._pageMode)
                    this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);
                else if (rect.width <= this._viewSize.x / 2)
                    this.setPosX(rect.x + rect.width * 2 - this._viewSize.x, ani);
                else
                    this.setPosX(rect.x + rect.width - this._viewSize.x, ani);
            }
        }
        if (!ani && this._needRefresh)
            this.refresh();
    }
    isChildInView(obj) {
        if (this._overlapSize.y > 0) {
            var dist = obj.y + this._container.y;
            if (dist < -obj.height || dist > this._viewSize.y)
                return false;
        }
        if (this._overlapSize.x > 0) {
            dist = obj.x + this._container.x;
            if (dist < -obj.width || dist > this._viewSize.x)
                return false;
        }
        return true;
    }
    cancelDragging() {
        Stage.removeTouchMonitor(this._owner.displayObject);
        if (ScrollPane.draggingPane == this)
            ScrollPane.draggingPane = null;
        s_gestureFlag = 0;
        this._dragged = false;
    }
    lockHeader(size) {
        if (this._headerLockedSize == size)
            return;
        this._headerLockedSize = size;
        if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] >= 0) {
            this._tweenStart.set(this._container.x, this._container.y);
            this._tweenChange.set(0, 0);
            this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis];
            this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
            this.startTween(2);
        }
    }
    lockFooter(size) {
        if (this._footerLockedSize == size)
            return;
        this._footerLockedSize = size;
        if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] <= -this._overlapSize[this._refreshBarAxis]) {
            this._tweenStart.set(this._container.x, this._container.y);
            this._tweenChange.set(0, 0);
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0)
                max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
            else
                max += this._footerLockedSize;
            this._tweenChange[this._refreshBarAxis] = -max - this._tweenStart[this._refreshBarAxis];
            this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
            this.startTween(2);
        }
    }
    onOwnerSizeChanged() {
        this.setSize(this._owner.width, this._owner.height);
        this.posChanged(false);
    }
    handleControllerChanged(c) {
        if (this._pageController == c) {
            if (this._scrollType == ScrollType.Horizontal)
                this.setCurrentPageX(c.selectedIndex, true);
            else
                this.setCurrentPageY(c.selectedIndex, true);
        }
    }
    updatePageController() {
        if (this._pageController && !this._pageController.changing) {
            var index;
            if (this._scrollType == ScrollType.Horizontal)
                index = this.currentPageX;
            else
                index = this.currentPageY;
            if (index < this._pageController.pageCount) {
                var c = this._pageController;
                this._pageController = null; //防止HandleControllerChanged的调用
                c.selectedIndex = index;
                this._pageController = c;
            }
        }
    }
    adjustMaskContainer() {
        var mx, my;
        if (this._displayOnLeft && this._vtScrollBar && !this._floating)
            mx = Math.floor(this._owner.margin.left + this._vtScrollBar.width);
        else
            mx = Math.floor(this._owner.margin.left);
        my = Math.floor(this._owner.margin.top);
        mx += this._owner._alignOffset.x;
        my += this._owner._alignOffset.y;
        this._maskContainer.setPosition(mx, my);
    }
    setSize(aWidth, aHeight) {
        this.adjustMaskContainer();
        if (this._hzScrollBar) {
            this._hzScrollBar.y = aHeight - this._hzScrollBar.height;
            if (this._vtScrollBar) {
                this._hzScrollBar.width = aWidth - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right;
                if (this._displayOnLeft)
                    this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width;
                else
                    this._hzScrollBar.x = this._scrollBarMargin.left;
            }
            else {
                this._hzScrollBar.width = aWidth - this._scrollBarMargin.left - this._scrollBarMargin.right;
                this._hzScrollBar.x = this._scrollBarMargin.left;
            }
        }
        if (this._vtScrollBar) {
            if (!this._displayOnLeft)
                this._vtScrollBar.x = aWidth - this._vtScrollBar.width;
            if (this._hzScrollBar)
                this._vtScrollBar.height = aHeight - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
            else
                this._vtScrollBar.height = aHeight - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
            this._vtScrollBar.y = this._scrollBarMargin.top;
        }
        this._viewSize.x = aWidth;
        this._viewSize.y = aHeight;
        if (this._hzScrollBar && !this._floating)
            this._viewSize.y -= this._hzScrollBar.height;
        if (this._vtScrollBar && !this._floating)
            this._viewSize.x -= this._vtScrollBar.width;
        this._viewSize.x -= (this._owner.margin.left + this._owner.margin.right);
        this._viewSize.y -= (this._owner.margin.top + this._owner.margin.bottom);
        this._viewSize.x = Math.max(1, this._viewSize.x);
        this._viewSize.y = Math.max(1, this._viewSize.y);
        this._pageSize.x = this._viewSize.x;
        this._pageSize.y = this._viewSize.y;
        this.handleSizeChanged();
    }
    setContentSize(aWidth, aHeight) {
        if (this._contentSize.x == aWidth && this._contentSize.y == aHeight)
            return;
        this._contentSize.x = aWidth;
        this._contentSize.y = aHeight;
        this.handleSizeChanged();
    }
    changeContentSizeOnScrolling(deltaWidth, deltaHeight, deltaPosX, deltaPosY) {
        var isRightmost = this._xPos == this._overlapSize.x;
        var isBottom = this._yPos == this._overlapSize.y;
        this._contentSize.x += deltaWidth;
        this._contentSize.y += deltaHeight;
        this.handleSizeChanged();
        if (this._tweening == 1) {
            //如果原来滚动位置是贴边，加入处理继续贴边。
            if (deltaWidth != 0 && isRightmost && this._tweenChange.x < 0) {
                this._xPos = this._overlapSize.x;
                this._tweenChange.x = -this._xPos - this._tweenStart.x;
            }
            if (deltaHeight != 0 && isBottom && this._tweenChange.y < 0) {
                this._yPos = this._overlapSize.y;
                this._tweenChange.y = -this._yPos - this._tweenStart.y;
            }
        }
        else if (this._tweening == 2) {
            //重新调整起始位置，确保能够顺滑滚下去
            if (deltaPosX != 0) {
                this._container.x -= deltaPosX;
                this._tweenStart.x -= deltaPosX;
                this._xPos = -this._container.x;
            }
            if (deltaPosY != 0) {
                this._container.y -= deltaPosY;
                this._tweenStart.y -= deltaPosY;
                this._yPos = -this._container.y;
            }
        }
        else if (this._dragged) {
            if (deltaPosX != 0) {
                this._container.x -= deltaPosX;
                this._containerPos.x -= deltaPosX;
                this._xPos = -this._container.x;
            }
            if (deltaPosY != 0) {
                this._container.y -= deltaPosY;
                this._containerPos.y -= deltaPosY;
                this._yPos = -this._container.y;
            }
        }
        else {
            //如果原来滚动位置是贴边，加入处理继续贴边。
            if (deltaWidth != 0 && isRightmost) {
                this._xPos = this._overlapSize.x;
                this._container.x = -this._xPos;
            }
            if (deltaHeight != 0 && isBottom) {
                this._yPos = this._overlapSize.y;
                this._container.y = -this._yPos;
            }
        }
        if (this._pageMode)
            this.updatePageController();
    }
    handleSizeChanged() {
        if (this._displayInDemand) {
            this._vScrollNone = this._contentSize.y <= this._viewSize.y;
            this._hScrollNone = this._contentSize.x <= this._viewSize.x;
        }
        if (this._vtScrollBar) {
            if (this._contentSize.y == 0)
                this._vtScrollBar.setDisplayPerc(0);
            else
                this._vtScrollBar.setDisplayPerc(Math.min(1, this._viewSize.y / this._contentSize.y));
        }
        if (this._hzScrollBar) {
            if (this._contentSize.x == 0)
                this._hzScrollBar.setDisplayPerc(0);
            else
                this._hzScrollBar.setDisplayPerc(Math.min(1, this._viewSize.x / this._contentSize.x));
        }
        this.updateScrollBarVisible();
        var rect = this._maskContainer.clipRect;
        if (rect) {
            rect.x = -this._owner._alignOffset.x;
            rect.y = -this._owner._alignOffset.y;
            rect.width = this._viewSize.x;
            rect.height = this._viewSize.y;
            if (this._vScrollNone && this._vtScrollBar)
                rect.width += this._vtScrollBar.width;
            if (this._hScrollNone && this._hzScrollBar)
                rect.height += this._hzScrollBar.height;
            if (this._dontClipMargin) {
                rect.x -= this._owner.margin.left;
                rect.width += (this._owner.margin.left + this._owner.margin.right);
                rect.y -= this._owner.margin.top;
                rect.height += (this._owner.margin.top + this._owner.margin.bottom);
            }
            this._maskContainer.clipRect = rect;
        }
        if (this._scrollType == ScrollType.Horizontal || this._scrollType == ScrollType.Both)
            this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x));
        else
            this._overlapSize.x = 0;
        if (this._scrollType == ScrollType.Vertical || this._scrollType == ScrollType.Both)
            this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y));
        else
            this._overlapSize.y = 0;
        //边界检查
        this._xPos = clamp(this._xPos, 0, this._overlapSize.x);
        this._yPos = clamp(this._yPos, 0, this._overlapSize.y);
        if (this._refreshBarAxis) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0)
                max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
            else
                max += this._footerLockedSize;
            if (this._refreshBarAxis == "x") {
                this._container.setPosition(clamp(this._container.x, -max, this._headerLockedSize), clamp(this._container.y, -this._overlapSize.y, 0));
            }
            else {
                this._container.setPosition(clamp(this._container.x, -this._overlapSize.x, 0), clamp(this._container.y, -max, this._headerLockedSize));
            }
            if (this._header) {
                if (this._refreshBarAxis == "x")
                    this._header.height = this._viewSize.y;
                else
                    this._header.width = this._viewSize.x;
            }
            if (this._footer) {
                if (this._refreshBarAxis == "y")
                    this._footer.height = this._viewSize.y;
                else
                    this._footer.width = this._viewSize.x;
            }
        }
        else {
            this._container.setPosition(clamp(this._container.x, -this._overlapSize.x, 0), clamp(this._container.y, -this._overlapSize.y, 0));
        }
        this.updateScrollBarPos();
        if (this._pageMode)
            this.updatePageController();
    }
    posChanged(ani) {
        if (this._aniFlag == 0)
            this._aniFlag = ani ? 1 : -1;
        else if (this._aniFlag == 1 && !ani)
            this._aniFlag = -1;
        this._needRefresh = true;
        Timers.callLater(this.refresh, this);
    }
    refresh() {
        if (this._owner.displayObject == null) {
            return;
        }
        this._needRefresh = false;
        Timers.remove(this.refresh, this);
        if (this._pageMode || this._snapToItem) {
            s_endPos.set(-this._xPos, -this._yPos);
            this.alignPosition(s_endPos, false);
            this._xPos = -s_endPos.x;
            this._yPos = -s_endPos.y;
        }
        this.refresh2();
        this._owner.dispatchEvent("scroll");
        if (this._needRefresh) //在onScroll事件里开发者可能修改位置，这里再刷新一次，避免闪烁
         {
            this._needRefresh = false;
            Timers.remove(this.refresh, this);
            this.refresh2();
        }
        this.updateScrollBarPos();
        this._aniFlag = 0;
    }
    refresh2() {
        if (this._aniFlag == 1 && !this._dragged) {
            var posX;
            var posY;
            if (this._overlapSize.x > 0)
                posX = -Math.floor(this._xPos);
            else {
                if (this._container.x != 0)
                    this._container.x = 0;
                posX = 0;
            }
            if (this._overlapSize.y > 0)
                posY = -Math.floor(this._yPos);
            else {
                if (this._container.y != 0)
                    this._container.y = 0;
                posY = 0;
            }
            if (posX != this._container.x || posY != this._container.y) {
                this._tweenDuration.set(TWEEN_TIME_GO, TWEEN_TIME_GO);
                this._tweenStart.set(this._container.x, this._container.y);
                this._tweenChange.set(posX - this._tweenStart.x, posY - this._tweenStart.y);
                this.startTween(1);
            }
            else if (this._tweening != 0)
                this.killTween();
        }
        else {
            if (this._tweening != 0)
                this.killTween();
            this._container.setPosition(Math.floor(-this._xPos), Math.floor(-this._yPos));
            this.loopCheckingCurrent();
        }
        if (this._pageMode)
            this.updatePageController();
    }
    __touchBegin(evt) {
        if (!this._touchEffect)
            return;
        if (evt.input.button != 0)
            return;
        evt.captureTouch();
        if (this._tweening != 0) {
            this.killTween();
            Stage.cancelClick(evt.input.touchId);
            this._dragged = true;
        }
        else
            this._dragged = false;
        var pt = this._owner.globalToLocal(evt.input.x, evt.input.y, s_vec2);
        this._containerPos.set(this._container.x, this._container.y);
        this._beginTouchPos.set(pt.x, pt.y);
        this._lastTouchPos.set(pt.x, pt.y);
        this._lastTouchGlobalPos.set(evt.input.x, evt.input.y);
        this._isHoldAreaDone = false;
        this._velocity.set(0, 0);
        this._velocityScale = 1;
        this._lastMoveTime = performance.now() / 1000;
    }
    __touchMove(evt) {
        if (!this._touchEffect || this.owner.isDisposed)
            return;
        if (ScrollPane.draggingPane && ScrollPane.draggingPane != this || GObject.draggingObject) //已经有其他拖动
            return;
        var sensitivity = UIConfig.touchScrollSensitivity;
        var pt = this._owner.globalToLocal(evt.input.x, evt.input.y);
        var diff;
        var sv, sh;
        if (this._scrollType == ScrollType.Vertical) {
            if (!this._isHoldAreaDone) {
                //表示正在监测垂直方向的手势
                s_gestureFlag |= 1;
                diff = Math.abs(this._beginTouchPos.y - pt.y);
                if (diff < sensitivity)
                    return;
                if ((s_gestureFlag & 2) != 0) //已经有水平方向的手势在监测，那么我们用严格的方式检查是不是按垂直方向移动，避免冲突
                 {
                    let diff2 = Math.abs(this._beginTouchPos.x - pt.x);
                    if (diff < diff2) //不通过则不允许滚动了
                        return;
                }
            }
            sv = true;
        }
        else if (this._scrollType == ScrollType.Horizontal) {
            if (!this._isHoldAreaDone) {
                s_gestureFlag |= 2;
                diff = Math.abs(this._beginTouchPos.x - pt.x);
                if (diff < sensitivity)
                    return;
                if ((s_gestureFlag & 1) != 0) {
                    let diff2 = Math.abs(this._beginTouchPos.y - pt.y);
                    if (diff < diff2)
                        return;
                }
            }
            sh = true;
        }
        else {
            s_gestureFlag = 3;
            if (!this._isHoldAreaDone) {
                diff = Math.abs(this._beginTouchPos.y - pt.y);
                if (diff < sensitivity) {
                    diff = Math.abs(this._beginTouchPos.x - pt.x);
                    if (diff < sensitivity)
                        return;
                }
            }
            sv = sh = true;
        }
        var newPosX = Math.floor(this._containerPos.x + pt.x - this._beginTouchPos.x);
        var newPosY = Math.floor(this._containerPos.y + pt.y - this._beginTouchPos.y);
        if (sv) {
            if (newPosY > 0) {
                if (!this._bouncebackEffect)
                    this._container.y = 0;
                else if (this._header && this._header.maxHeight != 0)
                    this._container.y = Math.floor(Math.min(newPosY * 0.5, this._header.maxHeight));
                else
                    this._container.y = Math.floor(Math.min(newPosY * 0.5, this._viewSize.y * PULL_RATIO));
            }
            else if (newPosY < -this._overlapSize.y) {
                if (!this._bouncebackEffect)
                    this._container.y = -this._overlapSize.y;
                else if (this._footer && this._footer.maxHeight > 0)
                    this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._footer.maxHeight) - this._overlapSize.y);
                else
                    this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._viewSize.y * PULL_RATIO) - this._overlapSize.y);
            }
            else
                this._container.y = newPosY;
        }
        if (sh) {
            if (newPosX > 0) {
                if (!this._bouncebackEffect)
                    this._container.x = 0;
                else if (this._header && this._header.maxWidth != 0)
                    this._container.x = Math.floor(Math.min(newPosX * 0.5, this._header.maxWidth));
                else
                    this._container.x = Math.floor(Math.min(newPosX * 0.5, this._viewSize.x * PULL_RATIO));
            }
            else if (newPosX < 0 - this._overlapSize.x) {
                if (!this._bouncebackEffect)
                    this._container.x = -this._overlapSize.x;
                else if (this._footer && this._footer.maxWidth > 0)
                    this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._footer.maxWidth) - this._overlapSize.x);
                else
                    this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._viewSize.x * PULL_RATIO) - this._overlapSize.x);
            }
            else
                this._container.x = newPosX;
        }
        //更新速度
        var frameRate = 60;
        var now = performance.now() / 1000;
        var deltaTime = Math.max(now - this._lastMoveTime, 1 / frameRate);
        var deltaPositionX = pt.x - this._lastTouchPos.x;
        var deltaPositionY = pt.y - this._lastTouchPos.y;
        if (!sh)
            deltaPositionX = 0;
        if (!sv)
            deltaPositionY = 0;
        if (deltaTime != 0) {
            var elapsed = deltaTime * frameRate - 1;
            if (elapsed > 1) //速度衰减
             {
                var factor = Math.pow(0.833, elapsed);
                this._velocity.x = this._velocity.x * factor;
                this._velocity.y = this._velocity.y * factor;
            }
            this._velocity.x = lerp(this._velocity.x, deltaPositionX * 60 / frameRate / deltaTime, deltaTime * 10);
            this._velocity.y = lerp(this._velocity.y, deltaPositionY * 60 / frameRate / deltaTime, deltaTime * 10);
        }
        /*速度计算使用的是本地位移，但在后续的惯性滚动判断中需要用到屏幕位移，所以这里要记录一个位移的比例。
        */
        var deltaGlobalPositionX = this._lastTouchGlobalPos.x - evt.input.x;
        var deltaGlobalPositionY = this._lastTouchGlobalPos.y - evt.input.y;
        if (deltaPositionX != 0)
            this._velocityScale = Math.abs(deltaGlobalPositionX / deltaPositionX);
        else if (deltaPositionY != 0)
            this._velocityScale = Math.abs(deltaGlobalPositionY / deltaPositionY);
        this._lastTouchPos.set(pt.x, pt.y);
        this._lastTouchGlobalPos.set(evt.input.x, evt.input.y);
        this._lastMoveTime = now;
        //同步更新pos值
        if (this._overlapSize.x > 0)
            this._xPos = clamp(-this._container.x, 0, this._overlapSize.x);
        if (this._overlapSize.y > 0)
            this._yPos = clamp(-this._container.y, 0, this._overlapSize.y);
        //循环滚动特别检查
        if (this._loop != 0) {
            newPosX = this._container.x;
            newPosY = this._container.y;
            if (this.loopCheckingCurrent()) {
                this._containerPos.x += this._container.x - newPosX;
                this._containerPos.y += this._container.y - newPosY;
            }
        }
        ScrollPane.draggingPane = this;
        this._isHoldAreaDone = true;
        this._dragged = true;
        this.updateScrollBarPos();
        this.updateScrollBarVisible();
        if (this._pageMode)
            this.updatePageController();
        this._owner.dispatchEvent("scroll");
    }
    __touchEnd() {
        if (ScrollPane.draggingPane == this)
            ScrollPane.draggingPane = null;
        s_gestureFlag = 0;
        if (!this._dragged || !this._touchEffect) {
            this._dragged = false;
            return;
        }
        this._dragged = false;
        this._tweenStart.set(this._container.x, this._container.y);
        s_endPos.set(this._tweenStart.x, this._tweenStart.y);
        var flag = false;
        if (this._container.x > 0) {
            s_endPos.x = 0;
            flag = true;
        }
        else if (this._container.x < -this._overlapSize.x) {
            s_endPos.x = -this._overlapSize.x;
            flag = true;
        }
        if (this._container.y > 0) {
            s_endPos.y = 0;
            flag = true;
        }
        else if (this._container.y < -this._overlapSize.y) {
            s_endPos.y = -this._overlapSize.y;
            flag = true;
        }
        if (flag) {
            this._tweenChange.set(s_endPos.x - this._tweenStart.x, s_endPos.y - this._tweenStart.y);
            if (this._tweenChange.x < -UIConfig.touchDragSensitivity || this._tweenChange.y < -UIConfig.touchDragSensitivity) {
                this._refreshEventDispatching = true;
                this._owner.dispatchEvent("pull_down_release");
                this._refreshEventDispatching = false;
            }
            else if (this._tweenChange.x > UIConfig.touchDragSensitivity || this._tweenChange.y > UIConfig.touchDragSensitivity) {
                this._refreshEventDispatching = true;
                this._owner.dispatchEvent("pull_up_release");
                this._refreshEventDispatching = false;
            }
            if (this._headerLockedSize > 0 && s_endPos[this._refreshBarAxis] == 0) {
                s_endPos[this._refreshBarAxis] = this._headerLockedSize;
                this._tweenChange.x = s_endPos.x - this._tweenStart.x;
                this._tweenChange.y = s_endPos.y - this._tweenStart.y;
            }
            else if (this._footerLockedSize > 0 && s_endPos[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
                var max = this._overlapSize[this._refreshBarAxis];
                if (max == 0)
                    max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                else
                    max += this._footerLockedSize;
                s_endPos[this._refreshBarAxis] = -max;
                this._tweenChange.x = s_endPos.x - this._tweenStart.x;
                this._tweenChange.y = s_endPos.y - this._tweenStart.y;
            }
            this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
        }
        else {
            //更新速度
            if (!this._inertiaDisabled) {
                var frameRate = 60;
                var elapsed = (performance.now() / 1000 - this._lastMoveTime) * frameRate - 1;
                if (elapsed > 1) {
                    var factor = Math.pow(0.833, elapsed);
                    this._velocity.x = this._velocity.x * factor;
                    this._velocity.y = this._velocity.y * factor;
                }
                //根据速度计算目标位置和需要时间
                this.updateTargetAndDuration(this._tweenStart, s_endPos);
            }
            else
                this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
            s_oldChange.set(s_endPos.x - this._tweenStart.x, s_endPos.y - this._tweenStart.y);
            //调整目标位置
            this.loopCheckingTarget(s_endPos);
            if (this._pageMode || this._snapToItem)
                this.alignPosition(s_endPos, true);
            this._tweenChange.x = s_endPos.x - this._tweenStart.x;
            this._tweenChange.y = s_endPos.y - this._tweenStart.y;
            if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
                this.updateScrollBarVisible();
                return;
            }
            //如果目标位置已调整，随之调整需要时间
            if (this._pageMode || this._snapToItem) {
                this.fixDuration("x", s_oldChange.x);
                this.fixDuration("y", s_oldChange.y);
            }
        }
        this.startTween(2);
    }
    __mouseWheel(evt) {
        if (!this._mouseWheelEnabled)
            return;
        var delta = evt.input.mouseWheelDelta / window.devicePixelRatio;
        if (this._snapToItem && Math.abs(delta) < 1)
            delta = Math.sign(delta);
        if (this._overlapSize.x > 0 && this._overlapSize.y == 0) {
            let step = this._pageMode ? this._pageSize.x : this._scrollStep;
            this.setPosX(this._xPos + step * delta, false);
        }
        else {
            let step = this._pageMode ? this._pageSize.y : this._scrollStep;
            this.setPosY(this._yPos + step * delta, false);
        }
    }
    updateScrollBarPos() {
        if (this._vtScrollBar)
            this._vtScrollBar.setScrollPerc(this._overlapSize.y == 0 ? 0 : clamp(-this._container.y, 0, this._overlapSize.y) / this._overlapSize.y);
        if (this._hzScrollBar)
            this._hzScrollBar.setScrollPerc(this._overlapSize.x == 0 ? 0 : clamp(-this._container.x, 0, this._overlapSize.x) / this._overlapSize.x);
        this.checkRefreshBar();
    }
    updateScrollBarVisible() {
        if (this._vtScrollBar) {
            if (this._viewSize.y <= this._vtScrollBar.minSize || this._vScrollNone)
                this._vtScrollBar.displayObject.visible = false;
            else
                this.updateScrollBarVisible2(this._vtScrollBar);
        }
        if (this._hzScrollBar) {
            if (this._viewSize.x <= this._hzScrollBar.minSize || this._hScrollNone)
                this._hzScrollBar.displayObject.visible = false;
            else
                this.updateScrollBarVisible2(this._hzScrollBar);
        }
    }
    updateScrollBarVisible2(bar) {
        if (this._scrollBarDisplayAuto)
            GTween.kill(bar, false, "alpha");
        if (this._scrollBarDisplayAuto && this._tweening == 0 && !this._dragged && !bar.gripDragging) {
            if (bar.displayObject.visible)
                GTween.to(1, 0, 0.5).setDelay(0.5).onComplete(this.__barTweenComplete, this).setTarget(bar, "alpha");
        }
        else {
            bar.alpha = 1;
            bar.displayObject.visible = true;
        }
    }
    __barTweenComplete(tweener) {
        var bar = (tweener.target);
        bar.alpha = 1;
        bar.displayObject.visible = false;
    }
    getLoopPartSize(division, axis) {
        return (this._contentSize[axis] + (axis == "x" ? (this._owner).columnGap : (this._owner).lineGap)) / division;
    }
    loopCheckingCurrent() {
        var changed = false;
        if (this._loop == 1 && this._overlapSize.x > 0) {
            if (this._xPos < 0.001) {
                this._xPos += this.getLoopPartSize(2, "x");
                changed = true;
            }
            else if (this._xPos >= this._overlapSize.x) {
                this._xPos -= this.getLoopPartSize(2, "x");
                changed = true;
            }
        }
        else if (this._loop == 2 && this._overlapSize.y > 0) {
            if (this._yPos < 0.001) {
                this._yPos += this.getLoopPartSize(2, "y");
                changed = true;
            }
            else if (this._yPos >= this._overlapSize.y) {
                this._yPos -= this.getLoopPartSize(2, "y");
                changed = true;
            }
        }
        if (changed)
            this._container.setPosition(Math.floor(-this._xPos), Math.floor(-this._yPos));
        return changed;
    }
    loopCheckingTarget(endPos) {
        if (this._loop == 1)
            this.loopCheckingTarget2(endPos, "x");
        if (this._loop == 2)
            this.loopCheckingTarget2(endPos, "y");
    }
    loopCheckingTarget2(endPos, axis) {
        var halfSize;
        var tmp;
        if (endPos[axis] > 0) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this._tweenStart[axis] - halfSize;
            if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
                endPos[axis] -= halfSize;
                this._tweenStart[axis] = tmp;
            }
        }
        else if (endPos[axis] < -this._overlapSize[axis]) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this._tweenStart[axis] + halfSize;
            if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
                endPos[axis] += halfSize;
                this._tweenStart[axis] = tmp;
            }
        }
    }
    loopCheckingNewPos(value, axis) {
        if (this._overlapSize[axis] == 0)
            return value;
        var pos = axis == "x" ? this._xPos : this._yPos;
        var changed = false;
        var v;
        if (value < 0.001) {
            value += this.getLoopPartSize(2, axis);
            if (value > pos) {
                v = this.getLoopPartSize(6, axis);
                v = Math.ceil((value - pos) / v) * v;
                pos = clamp(pos + v, 0, this._overlapSize[axis]);
                changed = true;
            }
        }
        else if (value >= this._overlapSize[axis]) {
            value -= this.getLoopPartSize(2, axis);
            if (value < pos) {
                v = this.getLoopPartSize(6, axis);
                v = Math.ceil((pos - value) / v) * v;
                pos = clamp(pos - v, 0, this._overlapSize[axis]);
                changed = true;
            }
        }
        if (changed) {
            if (axis == "x")
                this._container.x = -Math.floor(pos);
            else
                this._container.y = -Math.floor(pos);
        }
        return value;
    }
    alignPosition(pos, inertialScrolling) {
        if (this._pageMode) {
            pos.x = this.alignByPage(pos.x, "x", inertialScrolling);
            pos.y = this.alignByPage(pos.y, "y", inertialScrolling);
        }
        else if (this._snapToItem) {
            var xDir = 0;
            var yDir = 0;
            if (inertialScrolling) {
                xDir = pos.x - this._containerPos.x;
                yDir = pos.y - this._containerPos.y;
            }
            var pt = this._owner.getSnappingPositionWithDir(-pos.x, -pos.y, xDir, yDir, s_vec2);
            if (pos.x < 0 && pos.x > -this._overlapSize.x)
                pos.x = -pt.x;
            if (pos.y < 0 && pos.y > -this._overlapSize.y)
                pos.y = -pt.y;
        }
    }
    alignByPage(pos, axis, inertialScrolling) {
        var page;
        if (pos > 0)
            page = 0;
        else if (pos < -this._overlapSize[axis])
            page = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;
        else {
            page = Math.floor(-pos / this._pageSize[axis]);
            var change = inertialScrolling ? (pos - this._containerPos[axis]) : (pos - this._container[axis]);
            var testPageSize = Math.min(this._pageSize[axis], this._contentSize[axis] - (page + 1) * this._pageSize[axis]);
            var delta = -pos - page * this._pageSize[axis];
            //页面吸附策略
            if (Math.abs(change) > this._pageSize[axis]) //如果滚动距离超过1页,则需要超过页面的一半，才能到更下一页
             {
                if (delta > testPageSize * 0.5)
                    page++;
            }
            else //否则只需要页面的1/3，当然，需要考虑到左移和右移的情况
             {
                if (delta > testPageSize * (change < 0 ? UIConfig.defaultScrollPagingThreshold : (1 - UIConfig.defaultScrollPagingThreshold)))
                    page++;
            }
            //重新计算终点
            pos = -page * this._pageSize[axis];
            if (pos < -this._overlapSize[axis]) //最后一页未必有pageSize那么大
                pos = -this._overlapSize[axis];
        }
        //惯性滚动模式下，会增加判断尽量不要滚动超过一页
        if (inertialScrolling) {
            var oldPos = this._tweenStart[axis];
            var oldPage;
            if (oldPos > 0)
                oldPage = 0;
            else if (oldPos < -this._overlapSize[axis])
                oldPage = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;
            else
                oldPage = Math.floor(-oldPos / this._pageSize[axis]);
            var startPage = Math.floor(-this._containerPos[axis] / this._pageSize[axis]);
            if (Math.abs(page - startPage) > 1 && Math.abs(oldPage - startPage) <= 1) {
                if (page > startPage)
                    page = startPage + 1;
                else
                    page = startPage - 1;
                pos = -page * this._pageSize[axis];
            }
        }
        return pos;
    }
    updateTargetAndDuration(orignPos, resultPos) {
        resultPos.x = this.updateTargetAndDuration2(orignPos.x, "x");
        resultPos.y = this.updateTargetAndDuration2(orignPos.y, "y");
    }
    updateTargetAndDuration2(pos, axis) {
        var v = this._velocity[axis];
        var duration = 0;
        if (pos > 0)
            pos = 0;
        else if (pos < -this._overlapSize[axis])
            pos = -this._overlapSize[axis];
        else {
            //以屏幕像素为基准
            var v2 = Math.abs(v) * this._velocityScale;
            //在移动设备上，需要对不同分辨率做一个适配，我们的速度判断以1136分辨率为基准
            if (Stage.touchScreen)
                v2 *= 1136 / Math.max(window.screen.width, window.screen.height);
            //这里有一些阈值的处理，因为在低速内，不希望产生较大的滚动（甚至不滚动）
            var ratio = 0;
            if (this._pageMode || !Stage.touchScreen) {
                if (v2 > 500)
                    ratio = Math.pow((v2 - 500) / 500, 2);
            }
            else {
                if (v2 > 1000)
                    ratio = Math.pow((v2 - 1000) / 1000, 2);
            }
            if (ratio != 0) {
                if (ratio > 1)
                    ratio = 1;
                v2 *= ratio;
                v *= ratio;
                this._velocity[axis] = v;
                //算法：v*（_decelerationRate的n次幂）= 60，即在n帧后速度降为60（假设每秒60帧）。
                duration = Math.log(60 / v2) / Math.log(this._decelerationRate) / 60;
                //计算距离要使用本地速度
                //理论公式貌似滚动的距离不够，改为经验公式
                //var change:number = (v/ 60 - 1) / (1 - this._decelerationRate);
                var change = Math.floor(v * duration * 0.4);
                pos += change;
            }
        }
        if (duration < TWEEN_TIME_DEFAULT)
            duration = TWEEN_TIME_DEFAULT;
        this._tweenDuration[axis] = duration;
        return pos;
    }
    fixDuration(axis, oldChange) {
        if (this._tweenChange[axis] == 0 || Math.abs(this._tweenChange[axis]) >= Math.abs(oldChange))
            return;
        var newDuration = Math.abs(this._tweenChange[axis] / oldChange) * this._tweenDuration[axis];
        if (newDuration < TWEEN_TIME_DEFAULT)
            newDuration = TWEEN_TIME_DEFAULT;
        this._tweenDuration[axis] = newDuration;
    }
    startTween(type) {
        this._tweenTime.set(0, 0);
        this._tweening = type;
        Timers.addUpdate(this.tweenUpdate, this);
        this.updateScrollBarVisible();
    }
    killTween() {
        if (this._tweening == 1) //取消类型为1的tween需立刻设置到终点
         {
            this._container.setPosition(this._tweenStart.x + this._tweenChange.x, this._tweenStart.y + this._tweenChange.y);
            this._owner.dispatchEvent("scroll");
        }
        this._tweening = 0;
        Timers.remove(this.tweenUpdate, this);
        this.updateScrollBarVisible();
        this._owner.dispatchEvent("scroll_end");
    }
    checkRefreshBar() {
        if (this._header == null && this._footer == null)
            return;
        var pos = this._container[this._refreshBarAxis];
        if (this._header) {
            if (pos > 0) {
                if (this._header.displayObject.parent == null)
                    this._maskContainer.addChildAt(this._header.displayObject, 0);
                var pt = s_vec2;
                pt.set(this._header.width, this._header.height);
                pt[this._refreshBarAxis] = pos;
                this._header.setSize(pt.x, pt.y);
            }
            else {
                if (this._header.displayObject.parent)
                    this._maskContainer.removeChild(this._header.displayObject);
            }
        }
        if (this._footer) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (pos < -max || max == 0 && this._footerLockedSize > 0) {
                if (this._footer.displayObject.parent == null)
                    this._maskContainer.addChildAt(this._footer.displayObject, 0);
                pt = s_vec2;
                pt.set(this._footer.x, this._footer.y);
                if (max > 0)
                    pt[this._refreshBarAxis] = pos + this._contentSize[this._refreshBarAxis];
                else
                    pt[this._refreshBarAxis] = Math.max(Math.min(pos + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]);
                this._footer.setPosition(pt.x, pt.y);
                pt.set(this._footer.width, this._footer.height);
                if (max > 0)
                    pt[this._refreshBarAxis] = -max - pos;
                else
                    pt[this._refreshBarAxis] = this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis];
                this._footer.setSize(pt.x, pt.y);
            }
            else {
                if (this._footer.displayObject.parent)
                    this._maskContainer.removeChild(this._footer.displayObject);
            }
        }
    }
    tweenUpdate() {
        var nx = this.runTween("x");
        var ny = this.runTween("y");
        this._container.setPosition(nx, ny);
        if (this._tweening == 2) {
            if (this._overlapSize.x > 0)
                this._xPos = clamp(-nx, 0, this._overlapSize.x);
            if (this._overlapSize.y > 0)
                this._yPos = clamp(-ny, 0, this._overlapSize.y);
            if (this._pageMode)
                this.updatePageController();
        }
        if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
            this._tweening = 0;
            Timers.remove(this.tweenUpdate, this);
            this.loopCheckingCurrent();
            this.updateScrollBarPos();
            this.updateScrollBarVisible();
            this._owner.dispatchEvent("scroll");
            this._owner.dispatchEvent("scroll_end");
        }
        else {
            this.updateScrollBarPos();
            this._owner.dispatchEvent("scroll");
        }
    }
    runTween(axis) {
        var newValue;
        if (this._tweenChange[axis] != 0) {
            this._tweenTime[axis] += Timers.deltaTime / 1000;
            if (this._tweenTime[axis] >= this._tweenDuration[axis]) {
                newValue = this._tweenStart[axis] + this._tweenChange[axis];
                this._tweenChange[axis] = 0;
            }
            else {
                var ratio = easeFunc(this._tweenTime[axis], this._tweenDuration[axis]);
                newValue = this._tweenStart[axis] + Math.floor(this._tweenChange[axis] * ratio);
            }
            var threshold1 = 0;
            var threshold2 = -this._overlapSize[axis];
            if (this._headerLockedSize > 0 && this._refreshBarAxis == axis)
                threshold1 = this._headerLockedSize;
            if (this._footerLockedSize > 0 && this._refreshBarAxis == axis) {
                var max = this._overlapSize[this._refreshBarAxis];
                if (max == 0)
                    max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                else
                    max += this._footerLockedSize;
                threshold2 = -max;
            }
            if (this._tweening == 2 && this._bouncebackEffect) {
                if (newValue > 20 + threshold1 && this._tweenChange[axis] > 0
                    || newValue > threshold1 && this._tweenChange[axis] == 0) //开始回弹
                 {
                    this._tweenTime[axis] = 0;
                    this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
                    this._tweenChange[axis] = -newValue + threshold1;
                    this._tweenStart[axis] = newValue;
                }
                else if (newValue < threshold2 - 20 && this._tweenChange[axis] < 0
                    || newValue < threshold2 && this._tweenChange[axis] == 0) //开始回弹
                 {
                    this._tweenTime[axis] = 0;
                    this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
                    this._tweenChange[axis] = threshold2 - newValue;
                    this._tweenStart[axis] = newValue;
                }
            }
            else {
                if (newValue > threshold1) {
                    newValue = threshold1;
                    this._tweenChange[axis] = 0;
                }
                else if (newValue < threshold2) {
                    newValue = threshold2;
                    this._tweenChange[axis] = 0;
                }
            }
        }
        else
            newValue = this._container[axis];
        return newValue;
    }
}
function easeFunc(t, d) {
    return (t = t / d - 1) * t * t + 1; //cubicOut
}
