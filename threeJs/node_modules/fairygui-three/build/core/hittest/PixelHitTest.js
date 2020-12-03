export class PixelHitTestData {
    load(ba) {
        ba.readInt();
        this.pixelWidth = ba.readInt();
        this.scale = 1.0 / ba.readByte();
        let len = ba.readInt();
        this.pixels = new Uint8Array(ba.data, ba.pos, len);
        ba.skip(len);
    }
}
export class PixelHitTest {
    constructor(data, offsetX, offsetY, sourceWidth, sourceHeight) {
        this._data = data;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
    }
    hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y))
            return false;
        let data = this._data;
        x = Math.floor((x * this.sourceWidth / contentRect.width - this.offsetX) * data.scale);
        y = Math.floor((y * this.sourceHeight / contentRect.height - this.offsetY) * data.scale);
        if (x < 0 || y < 0 || x >= data.pixelWidth)
            return false;
        let pos = y * data.pixelWidth + x;
        let pos2 = Math.floor(pos / 8);
        let pos3 = pos % 8;
        if (pos2 >= 0 && pos2 < data.pixels.length)
            return ((data.pixels[pos2] >> pos3) & 0x1) > 0;
        else
            return false;
    }
}
