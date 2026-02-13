/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    // 回溯算法: 组合问题
    const result = [], path = [];

    function backtracking(n, k, startIndex) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = startIndex; i <= n; i++) {
            path.push(i);
            backtracking(n, k, i + 1);
            path.pop();
        }
    }
    backtracking(n, k, 1);
    return result;
};

// const n = 4, k = 2;
// console.log(combine(4, 2));


/**
 * 216. 组合总和 III
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
    // 回溯算法
    const path = [], result = [];

    function backtracking(k, startIndex, sum, targetSum) {
        if (sum > targetSum) {
            return;
        }
        if (path.length === k && sum === targetSum) {
            result.push([...path]);
            return;
        }

        for (let i = startIndex; i <= 9 - (k - path.length) + 1; i++) {
            sum += i;
            path.push(i);
            backtracking(k, i + 1, sum, targetSum);
            sum -= i;
            path.pop();
        }
    }

    backtracking(k, 1, 0, n);
    return result;
};

// const k = 3, n = 9;
// const k = 3, n = 7;
// console.log(combinationSum3(k, n));

/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    // 回溯算法
    let strArr = [], result = [];
    let digitMap = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

    function backtracking(digits, index) {
        if (index === digits.length) {
            result.push(strArr.join(""));
            return;
        }

        let digit = parseInt(digits[index]);
        let digitStr = digitMap[digit];
        for (let i = 0; i < digitStr.length; i++) {
            strArr.push(digitStr[i]);
            backtracking(digits, index + 1);
            strArr.pop();
        }
    }

    backtracking(digits, 0);
    return result;
};

// const digits = "23";
// console.log(letterCombinations(digits));