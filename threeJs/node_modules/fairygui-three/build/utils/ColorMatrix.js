const LUMA_R = 0.299;
const LUMA_G = 0.587;
const LUMA_B = 0.114;
const IDENTITY_MATRIX = [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0
];
const LENGTH = IDENTITY_MATRIX.length;
export class ColorMatrix {
    constructor() {
        this.matrix = new Array(LENGTH);
        this.reset();
    }
    static create(p_brightness, p_contrast, p_saturation, p_hue) {
        var ret = new ColorMatrix();
        ret.adjustColor(p_brightness, p_contrast, p_saturation, p_hue);
        return ret;
    }
    static getMatrix(p_brightness, p_contrast, p_saturation, p_hue, result) {
        if (!result)
            result = new Array(ColorMatrix.length);
        let mat = helper;
        mat.reset();
        mat.adjustColor(p_brightness, p_contrast, p_saturation, p_hue);
        var l = LENGTH;
        for (var i = 0; i < l; i++) {
            result[i] = mat.matrix[i];
        }
        return result;
    }
    reset() {
        for (var i = 0; i < LENGTH; i++) {
            this.matrix[i] = IDENTITY_MATRIX[i];
        }
    }
    invert() {
        this.multiplyMatrix([-1, 0, 0, 0, 255,
            0, -1, 0, 0, 255,
            0, 0, -1, 0, 255,
            0, 0, 0, 1, 0]);
    }
    adjustColor(p_brightness, p_contrast, p_saturation, p_hue) {
        this.adjustBrightness(p_brightness);
        this.adjustContrast(p_contrast);
        this.adjustSaturation(p_saturation);
        this.adjustHue(p_hue);
    }
    adjustBrightness(p_val) {
        p_val = this.cleanValue(p_val, 1) * 255;
        this.multiplyMatrix([
            1, 0, 0, 0, p_val,
            0, 1, 0, 0, p_val,
            0, 0, 1, 0, p_val,
            0, 0, 0, 1, 0
        ]);
    }
    adjustContrast(p_val) {
        p_val = this.cleanValue(p_val, 1);
        var s = p_val + 1;
        var o = 128 * (1 - s);
        this.multiplyMatrix([
            s, 0, 0, 0, o,
            0, s, 0, 0, o,
            0, 0, s, 0, o,
            0, 0, 0, 1, 0
        ]);
    }
    adjustSaturation(p_val) {
        p_val = this.cleanValue(p_val, 1);
        p_val += 1;
        var invSat = 1 - p_val;
        var invLumR = invSat * LUMA_R;
        var invLumG = invSat * LUMA_G;
        var invLumB = invSat * LUMA_B;
        this.multiplyMatrix([
            (invLumR + p_val), invLumG, invLumB, 0, 0,
            invLumR, (invLumG + p_val), invLumB, 0, 0,
            invLumR, invLumG, (invLumB + p_val), 0, 0,
            0, 0, 0, 1, 0
        ]);
    }
    adjustHue(p_val) {
        p_val = this.cleanValue(p_val, 1);
        p_val *= Math.PI;
        var cos = Math.cos(p_val);
        var sin = Math.sin(p_val);
        this.multiplyMatrix([
            ((LUMA_R + (cos * (1 - LUMA_R))) + (sin * -(LUMA_R))), ((LUMA_G + (cos * -(LUMA_G))) + (sin * -(LUMA_G))), ((LUMA_B + (cos * -(LUMA_B))) + (sin * (1 - LUMA_B))), 0, 0,
            ((LUMA_R + (cos * -(LUMA_R))) + (sin * 0.143)), ((LUMA_G + (cos * (1 - LUMA_G))) + (sin * 0.14)), ((LUMA_B + (cos * -(LUMA_B))) + (sin * -0.283)), 0, 0,
            ((LUMA_R + (cos * -(LUMA_R))) + (sin * -((1 - LUMA_R)))), ((LUMA_G + (cos * -(LUMA_G))) + (sin * LUMA_G)), ((LUMA_B + (cos * (1 - LUMA_B))) + (sin * LUMA_B)), 0, 0,
            0, 0, 0, 1, 0
        ]);
    }
    concat(p_matrix) {
        if (p_matrix.length != LENGTH) {
            return;
        }
        this.multiplyMatrix(p_matrix);
    }
    clone() {
        var result = new ColorMatrix();
        result.copyMatrix(this.matrix);
        return result;
    }
    copyMatrix(p_matrix) {
        var l = LENGTH;
        for (var i = 0; i < l; i++) {
            this.matrix[i] = p_matrix[i];
        }
    }
    multiplyMatrix(p_matrix) {
        var col = [];
        var i = 0;
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 5; ++x) {
                col[i + x] = p_matrix[i] * this.matrix[x] +
                    p_matrix[i + 1] * this.matrix[x + 5] +
                    p_matrix[i + 2] * this.matrix[x + 10] +
                    p_matrix[i + 3] * this.matrix[x + 15] +
                    (x == 4 ? p_matrix[i + 4] : 0);
            }
            i += 5;
        }
        this.copyMatrix(col);
    }
    cleanValue(p_val, p_limit) {
        return Math.min(p_limit, Math.max(-p_limit, p_val));
    }
}
let helper = new ColorMatrix();
