import { AudioLoader, FileLoader, LinearFilter, TextureLoader, Vector2 } from "three";
import { PixelHitTestData } from "../core/hittest/PixelHitTest";
import { NTexture } from "../core/NTexture";
import { BitmapFont, BMGlyph } from "../core/text/BitmapFont";
import { ByteBuffer } from "../utils/ByteBuffer";
import { Rect } from "../utils/Rect";
import { ObjectType, PackageItemType } from "./FieldTypes";
import { constructingDepth } from "./GObject";
import { PackageItem } from "./PackageItem";
import { UIConfig } from "./UIConfig";
import { FontManager } from "../core/text/FontManager";
export class UIPackage {
    // public static _objectFactory: typeof UIObjectFactory = UIObjectFactory;
    constructor() {
        this._items = [];
        this._itemsById = {};
        this._itemsByName = {};
        this._sprites = {};
        this._dependencies = [];
        this._branches = [];
        this._branchIndex = -1;
    }
    static get branch() {
        return _branch;
    }
    static set branch(value) {
        _branch = value;
        for (var pkgId in _instById) {
            var pkg = _instById[pkgId];
            if (pkg._branches) {
                pkg._branchIndex = pkg._branches.indexOf(value);
            }
        }
    }
    static getVar(key) {
        return _vars[key];
    }
    static setVar(key, value) {
        _vars[key] = value;
    }
    static getById(id) {
        return _instById[id];
    }
    static getByName(name) {
        return _instByName[name];
    }
    static loadPackage(resKey, onProgress) {
        return new Promise(resolve => {
            let pkg = _instById[resKey];
            if (pkg) {
                resolve(pkg);
                return;
            }
            let url = resKey;
            if (!resKey.endsWith("." + UIConfig.packageFileExtension)) {
                url += "." + UIConfig.packageFileExtension;
            }
            var loader = new FileLoader();
            loader.setResponseType("arraybuffer");
            loader.load(url, asset => {
                pkg = new UIPackage();
                pkg._resKey = resKey;
                pkg.loadPackage(new ByteBuffer(asset));
                let promises = [];
                let cnt = pkg._items.length;
                for (var i = 0; i < cnt; i++) {
                    var pi = pkg._items[i];
                    if (pi.type == PackageItemType.Atlas) {
                        promises.push(loadTexture(pi, onProgress));
                    }
                    else if (pi.type == PackageItemType.Sound) {
                        promises.push(loadSound(pi, onProgress));
                    }
                }
                let resolve2 = () => {
                    _instById[pkg.id] = pkg;
                    _instByName[pkg.name] = pkg;
                    _instByName[pkg._resKey] = pkg;
                    resolve(pkg);
                };
                if (promises.length > 0)
                    Promise.all(promises).then(resolve2);
                else
                    resolve2();
            });
        });
    }
    static removePackage(packageIdOrName) {
        var pkg = _instById[packageIdOrName];
        if (!pkg)
            pkg = _instByName[packageIdOrName];
        if (!pkg)
            throw new Error("unknown package: " + packageIdOrName);
        pkg.dispose();
        delete _instById[pkg.id];
        delete _instByName[pkg.name];
        delete _instById[pkg._resKey];
        if (pkg._customId != null)
            delete _instById[pkg._customId];
    }
    static createObject(pkgName, resName, userClass) {
        var pkg = UIPackage.getByName(pkgName);
        if (pkg)
            return pkg.createObject(resName, userClass);
        else
            return null;
    }
    static createObjectFromURL(url, userClass) {
        var pi = UIPackage.getItemByURL(url);
        if (pi)
            return pi.owner.internalCreateObject(pi, userClass);
        else
            return null;
    }
    static getItemURL(pkgName, resName) {
        var pkg = UIPackage.getByName(pkgName);
        if (!pkg)
            return null;
        var pi = pkg._itemsByName[resName];
        if (!pi)
            return null;
        return "ui://" + pkg.id + pi.id;
    }
    static getItemByURL(url) {
        var pos1 = url.indexOf("//");
        if (pos1 == -1)
            return null;
        var pos2 = url.indexOf("/", pos1 + 2);
        if (pos2 == -1) {
            if (url.length > 13) {
                var pkgId = url.substr(5, 8);
                var pkg = UIPackage.getById(pkgId);
                if (pkg) {
                    var srcId = url.substr(13);
                    return pkg.getItemById(srcId);
                }
            }
        }
        else {
            var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
            pkg = UIPackage.getByName(pkgName);
            if (pkg) {
                var srcName = url.substr(pos2 + 1);
                return pkg.getItemByName(srcName);
            }
        }
        return null;
    }
    static getItemAssetByURL(url) {
        var item = UIPackage.getItemByURL(url);
        if (item == null)
            return null;
        return item.owner.getItemAsset(item);
    }
    static normalizeURL(url) {
        if (url == null)
            return null;
        var pos1 = url.indexOf("//");
        if (pos1 == -1)
            return null;
        var pos2 = url.indexOf("/", pos1 + 2);
        if (pos2 == -1)
            return url;
        var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
        var srcName = url.substr(pos2 + 1);
        return UIPackage.getItemURL(pkgName, srcName);
    }
    loadPackage(buffer) {
        if (buffer.readUint() != 0x46475549)
            throw new Error("old package format found in '" + this._resKey + "'");
        buffer.version = buffer.readInt();
        var compressed = buffer.readBool();
        this._id = buffer.readString();
        this._name = buffer.readString();
        buffer.skip(20);
        if (compressed) {
            //todo uncompress
            // var buf: Uint8Array = new Uint8Array(buffer.data, buffer.pos, buffer.length - buffer.pos);
            // var inflater = new Zlib.RawInflate(buf);
            // let buffer2: ByteBuffer = new ByteBuffer(inflater.decompress());
            // buffer2.version = buffer.version;
            // buffer = buffer2;
        }
        var ver2 = buffer.version >= 2;
        var indexTablePos = buffer.pos;
        var cnt;
        var i;
        var j;
        var nextPos;
        var str;
        var branchIncluded;
        buffer.seek(indexTablePos, 4);
        cnt = buffer.readInt();
        var stringTable = [];
        for (i = 0; i < cnt; i++)
            stringTable[i] = buffer.readString();
        buffer.stringTable = stringTable;
        buffer.seek(indexTablePos, 0);
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++)
            this._dependencies.push({ id: buffer.readS(), name: buffer.readS() });
        if (ver2) {
            cnt = buffer.readShort();
            if (cnt > 0) {
                this._branches = buffer.readSArray(cnt);
                if (_branch)
                    this._branchIndex = this._branches.indexOf(_branch);
            }
            branchIncluded = cnt > 0;
        }
        buffer.seek(indexTablePos, 1);
        var pi;
        var fileNamePrefix = this._resKey + "_";
        cnt = buffer.readUshort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readInt();
            nextPos += buffer.pos;
            pi = new PackageItem();
            pi.owner = this;
            pi.type = buffer.readByte();
            pi.id = buffer.readS();
            pi.name = buffer.readS();
            buffer.readS(); //path
            str = buffer.readS();
            if (str)
                pi.file = str;
            buffer.readBool(); //exported
            pi.width = buffer.readInt();
            pi.height = buffer.readInt();
            switch (pi.type) {
                case PackageItemType.Image:
                    {
                        pi.objectType = ObjectType.Image;
                        var scaleOption = buffer.readByte();
                        if (scaleOption == 1) {
                            pi.scale9Grid = new Rect();
                            pi.scale9Grid.x = buffer.readInt();
                            pi.scale9Grid.y = buffer.readInt();
                            pi.scale9Grid.width = buffer.readInt();
                            pi.scale9Grid.height = buffer.readInt();
                            pi.tileGridIndice = buffer.readInt();
                        }
                        else if (scaleOption == 2)
                            pi.scaleByTile = true;
                        pi.smoothing = buffer.readBool();
                        break;
                    }
                case PackageItemType.MovieClip:
                    {
                        pi.smoothing = buffer.readBool();
                        pi.objectType = ObjectType.MovieClip;
                        pi.rawData = buffer.readBuffer();
                        break;
                    }
                case PackageItemType.Font:
                    {
                        pi.rawData = buffer.readBuffer();
                        break;
                    }
                case PackageItemType.Component:
                    {
                        var extension = buffer.readByte();
                        if (extension > 0)
                            pi.objectType = extension;
                        else
                            pi.objectType = ObjectType.Component;
                        pi.rawData = buffer.readBuffer();
                        Decls.UIObjectFactory.resolveExtension(pi);
                        break;
                    }
                case PackageItemType.Atlas:
                case PackageItemType.Sound:
                case PackageItemType.Misc:
                    {
                        pi.file = fileNamePrefix + pi.file;
                        break;
                    }
            }
            if (ver2) {
                str = buffer.readS(); //branch
                if (str)
                    pi.name = str + "/" + pi.name;
                var branchCnt = buffer.readByte();
                if (branchCnt > 0) {
                    if (branchIncluded)
                        pi.branches = buffer.readSArray(branchCnt);
                    else
                        this._itemsById[buffer.readS()] = pi;
                }
                var highResCnt = buffer.readByte();
                if (highResCnt > 0)
                    pi.highResolution = buffer.readSArray(highResCnt);
            }
            this._items.push(pi);
            this._itemsById[pi.id] = pi;
            if (pi.name != null)
                this._itemsByName[pi.name] = pi;
            buffer.pos = nextPos;
        }
        buffer.seek(indexTablePos, 2);
        cnt = buffer.readUshort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readUshort();
            nextPos += buffer.pos;
            var itemId = buffer.readS();
            pi = this._itemsById[buffer.readS()];
            let rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            var sprite = { atlas: pi, rect: rect, offset: new Vector2(), originalSize: new Vector2() };
            sprite.rotated = buffer.readBool();
            if (ver2 && buffer.readBool()) {
                sprite.offset.x = buffer.readInt();
                sprite.offset.y = buffer.readInt();
                sprite.originalSize.x = buffer.readInt();
                sprite.originalSize.y = buffer.readInt();
            }
            else {
                sprite.originalSize.x = sprite.rect.width;
                sprite.originalSize.y = sprite.rect.height;
            }
            this._sprites[itemId] = sprite;
            buffer.pos = nextPos;
        }
        if (buffer.seek(indexTablePos, 3)) {
            cnt = buffer.readUshort();
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readInt();
                nextPos += buffer.pos;
                pi = this._itemsById[buffer.readS()];
                if (pi && pi.type == PackageItemType.Image) {
                    pi.pixelHitTestData = new PixelHitTestData();
                    pi.pixelHitTestData.load(buffer);
                }
                buffer.pos = nextPos;
            }
        }
    }
    dispose() {
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var pi = this._items[i];
            if (pi.type == PackageItemType.Atlas) {
                if (pi.texture) {
                    pi.texture.dispose();
                    pi.texture = null;
                }
            }
            else if (pi.type == PackageItemType.Sound) {
                //todo free sound
            }
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get customId() {
        return this._customId;
    }
    set customId(value) {
        if (this._customId != null)
            delete _instById[this._customId];
        this._customId = value;
        if (this._customId != null)
            _instById[this._customId] = this;
    }
    createObject(resName, userClass) {
        var pi = this._itemsByName[resName];
        if (pi)
            return this.internalCreateObject(pi, userClass);
        else
            return null;
    }
    internalCreateObject(item, userClass) {
        var g = Decls.UIObjectFactory.newObject(item, userClass);
        if (g == null)
            return null;
        constructingDepth.n++;
        g.constructFromResource();
        constructingDepth.n--;
        return g;
    }
    getItemById(itemId) {
        return this._itemsById[itemId];
    }
    getItemByName(resName) {
        return this._itemsByName[resName];
    }
    getItemAssetByName(resName) {
        var pi = this._itemsByName[resName];
        if (pi == null) {
            throw "Resource not found -" + resName;
        }
        return this.getItemAsset(pi);
    }
    getItemAsset(item) {
        switch (item.type) {
            case PackageItemType.Image:
                if (!item.decoded) {
                    item.decoded = true;
                    var sprite = this._sprites[item.id];
                    if (sprite) {
                        var atlasTexture = (this.getItemAsset(sprite.atlas));
                        item.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, sprite.offset, sprite.originalSize);
                    }
                    else
                        item.texture = null;
                }
                return item.texture;
            case PackageItemType.Atlas:
                return item.texture;
            case PackageItemType.Font:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadFont(item);
                }
                return item.bitmapFont;
            case PackageItemType.MovieClip:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadMovieClip(item);
                }
                return item.frames;
            case PackageItemType.Component:
                return item.rawData;
            default:
                return null;
        }
    }
    loadMovieClip(item) {
        var buffer = item.rawData;
        buffer.seek(0, 0);
        item.interval = buffer.readInt();
        item.swing = buffer.readBool();
        item.repeatDelay = buffer.readInt();
        buffer.seek(0, 1);
        var frameCount = buffer.readShort();
        item.frames = [];
        var spriteId;
        var frame;
        var sprite;
        var fx;
        var fy;
        for (var i = 0; i < frameCount; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.pos;
            frame = { texture: null };
            fx = buffer.readInt();
            fy = buffer.readInt();
            buffer.readInt(); //width
            buffer.readInt(); //height
            frame.addDelay = buffer.readInt();
            spriteId = buffer.readS();
            if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
                var atlasTexture = (this.getItemAsset(sprite.atlas));
                frame.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, new Vector2(fx, fy), new Vector2(item.width, item.height));
            }
            item.frames[i] = frame;
            buffer.pos = nextPos;
        }
    }
    loadFont(item) {
        item = item.getBranch();
        var font = new BitmapFont();
        font.name = "ui://" + this._id + item.id;
        item.bitmapFont = font;
        var buffer = item.rawData;
        buffer.seek(0, 0);
        let ttf = buffer.readBool();
        font.tint = buffer.readBool();
        font.resizable = buffer.readBool();
        font.hasChannel = buffer.readBool();
        var fontSize = buffer.readInt();
        var xadvance = buffer.readInt();
        var lineHeight = buffer.readInt();
        var texScaleX = 1;
        var texScaleY = 1;
        var bgX;
        var bgY;
        var bgWidth;
        var bgHeight;
        var mainTexture = null;
        var mainSprite = ttf ? this._sprites[item.id] : null;
        if (mainSprite) {
            mainTexture = (this.getItemAsset(mainSprite.atlas));
            texScaleX = mainTexture.root.uvRect.width / mainTexture.width;
            texScaleY = mainTexture.root.uvRect.height / mainTexture.height;
        }
        buffer.seek(0, 1);
        var bg = null;
        var cnt = buffer.readInt();
        for (var i = 0; i < cnt; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.pos;
            bg = new BMGlyph();
            var ch = buffer.readChar();
            font.glyphs[ch] = bg;
            var img = buffer.readS();
            var bx = buffer.readInt();
            var by = buffer.readInt();
            bgX = buffer.readInt();
            bgY = buffer.readInt();
            bgWidth = buffer.readInt();
            bgHeight = buffer.readInt();
            bg.advance = buffer.readInt();
            bg.channel = buffer.readByte();
            if (bg.channel == 1)
                bg.channel = 2;
            else if (bg.channel == 2)
                bg.channel = 1;
            else if (bg.channel == 4)
                bg.channel = 0;
            else if (bg.channel == 8)
                bg.channel = 3;
            if (ttf) {
                if (mainSprite.rotated) {
                    bg.uv[0].set((by + bgHeight + mainSprite.rect.x) * texScaleX, 1 - (mainSprite.rect.yMax - bx) * texScaleY);
                    bg.uv[1].set(bg.uv[0].x - bgHeight * texScaleX, bg.uv[0].y);
                    bg.uv[2].set(bg.uv[1].x, bg.uv[0].y + bgWidth * texScaleY);
                    bg.uv[3].set(bg.uv[0].x, bg.uv[2].y);
                }
                else {
                    bg.uv[0].set((bx + mainSprite.rect.x) * texScaleX, 1 - (by + bgHeight + mainSprite.rect.y) * texScaleY);
                    bg.uv[1].set(bg.uv[0].x, bg.uv[0].y + bgHeight * texScaleY);
                    bg.uv[2].set(bg.uv[0].x + bgWidth * texScaleX, bg.uv[1].y);
                    bg.uv[3].set(bg.uv[2].x, bg.uv[0].y);
                }
                bg.lineHeight = lineHeight;
                bg.x = bgX;
                bg.y = bgY;
                bg.width = bgWidth;
                bg.height = bgHeight;
            }
            else {
                var charImg = this._itemsById[img];
                if (charImg) {
                    charImg = charImg.getBranch();
                    bgWidth = charImg.width;
                    bgHeight = charImg.height;
                    charImg = charImg.getHighResolution();
                    this.getItemAsset(charImg);
                    charImg.texture.getUV(bg.uv);
                    texScaleX = bgWidth / charImg.width;
                    texScaleY = bgHeight / charImg.height;
                    bg.x = bgX + charImg.texture.offset.x * texScaleX;
                    bg.y = bgY + charImg.texture.offset.y * texScaleY;
                    bg.width = charImg.texture.width * texScaleX;
                    bg.height = charImg.texture.height * texScaleY;
                    if (!mainTexture)
                        mainTexture = charImg.texture.root;
                }
                if (fontSize == 0)
                    fontSize = bgHeight;
                if (bg.advance == 0) {
                    if (xadvance == 0)
                        bg.advance = bgX + bgWidth;
                    else
                        bg.advance = xadvance;
                }
                bg.lineHeight = bgY < 0 ? bgHeight : (bgY + bgHeight);
                if (bg.lineHeight < font.size)
                    bg.lineHeight = font.size;
            }
            buffer.pos = nextPos;
        }
        font.size = fontSize;
        font.mainTexture = mainTexture;
    }
}
var _instById = {};
var _instByName = {};
var _branch = "";
var _vars = {};
FontManager.packageFontGetter = name => UIPackage.getItemAssetByURL(name);
function loadTexture(pi, onProgress) {
    return new Promise((resolve, reject) => {
        new TextureLoader().load(pi.file, texture => {
            texture.generateMipmaps = false;
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            pi.texture = new NTexture(texture);
            resolve();
        }, onProgress, ev => {
            reject(ev.message);
        });
    });
}
function loadSound(pi, onProgress) {
    return new Promise((resolve, reject) => {
        new AudioLoader().load(pi.file, buffer => {
            pi.audioBuffer = buffer;
            resolve();
        }, onProgress, ev => {
            reject(ev.message);
        });
    });
}
export var Decls = {};
