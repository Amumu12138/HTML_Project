/**
 * 100139. 循环移位后的矩阵相似检查
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
var areSimilar = function (mat, k) {
    let newMat = JSON.parse(JSON.stringify(mat));
    let m = mat.length, n = mat[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i % 2) {
                // 奇数行右移k次
                newMat[i][(j + k) % n] = mat[i][j];
                console.log("odd", i, (j + k) % n);
            } else {
                // 偶数行左移k次
                let mod = j - k < 0 ? (j - k) % n + n : (j - k) % n;
                newMat[i][mod] = mat[i][j];
                console.log("ever", i, j, mod);
            }
        }
    }

    console.log("newMat", newMat);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (newMat[i][j] !== mat[i][j]) {
                return false;
            }
        }
    }

    return true;
};

// const mat = [[1, 2, 1, 2], [5, 5, 5, 5], [6, 3, 6, 3]], k = 2;
// const mat = [[1, 2]], k = 1;
// const mat = [[9, 5, 3, 10], [4, 7, 10, 7], [1, 7, 9, 4], [8, 8, 1, 6], [6, 7, 6, 1], [3, 1, 1, 8], [9, 2, 8, 3], [1, 9, 7, 6]],
//     k = 4;
// const mat = [[8, 1, 10, 5, 2, 8]], k = 1;
// console.log(areSimilar(mat, k));


/**
 * 100134. 统计美丽子字符串 I
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var beautifulSubstrings = function (s, k) {
    let index = 0, result = 0;

    for (let i = 0; i < s.length; i++) {
        index = i;
        while (index < s.length) {
            let subStr = s.substring(i, index + 1);
            if (isBeautiful(subStr, k)) {
                result++;
            }
            index++;
        }
    }

    return result;
};

// 判断是否是美丽子字符串
const isBeautiful = (subStr, k) => {
    const vowels = "aeiou", len = subStr.length;
    if (len % 2 === 1 && subStr.split("").every(item => !vowels.includes(item))) {
        return false;
    }
    let vowelCount = 0;

    for (let i = 0; i < len; i++) {
        if (vowels.includes(subStr[i])) {
            vowelCount++;
        }
    }

    return (len - vowelCount) === vowelCount && (vowelCount * (len - vowelCount)) % k === 0;
}

const s = "baeyh", k = 2;
console.log(beautifulSubstrings(s, k));