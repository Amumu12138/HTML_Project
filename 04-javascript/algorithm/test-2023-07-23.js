
/**
 * 按分隔符拆分字符串
 * @param {string[]} words
 * @param {character} separator
 * @return {string[]}
 */
var splitWordsBySeparator = function (words, separator) {
    let newWords = [];
    words.forEach(item => {
        newWords.push(...item.split(separator).filter(e => e));
    })

    return newWords;
};

// let words = ["one.two.three", "four.five", "six"], separator = ".";
// let words = ["$easy$", "$problem$"], separator = "$";
let words = ["|||"], separator = "|"
result = splitWordsBySeparator(words, separator);
// console.log("result", result);


/**
 * 合并后数组中的最大元素
 * @param {number[]} nums
 * @return {number}
 */
var maxArrayValue = function (nums) {
    // while (!nums.every((x, index) => index === 0 || x < nums[index - 1])) {
    //     for (let i = 0; i < nums.length - 1; i++) {
    //         if (nums[i] <= nums[i + 1]) {
    //             nums[i + 1] = nums[i] + nums[i + 1];
    //             nums.splice(i, 1);
    //         }
    //     }
    //     console.log(nums);
    // }

    // return Math.max(...nums);

    const n = nums.length;
    let res = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] <= res) {
            res += nums[i];
        } else {
            res = nums[i];
        }
    }

    return res;
};

// let nums = [2, 3, 7, 9, 3];
// let nums = [5, 3, 3];
// let nums = [34, 95, 50, 12, 25, 100, 21, 3, 25, 16, 76, 73, 93, 46, 18];
let nums = [2, 2, 3, 4, 1, 5];
const result2 = maxArrayValue(nums);
console.log("result2", result2);

/**
 * 长度递增组的最大数目
 * @param {number[]} usageLimits
 * @return {number}
 */
var maxIncreasingGroups = function (usageLimits) {

};