/**
 * 198. 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // 动态规划
    const size = nums.length; dp = new Array(size).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < size; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }

    return dp[size - 1];
};

// const nums = [1, 2, 3, 1];
// const nums = [2, 7, 9, 3, 1];
// console.log(rob(nums));


/**
 * 213. 打家劫舍 II
 * @param {number[]} nums
 * @return {number}
 */
var rob02 = function (nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    return Math.max(robRange(nums, 0, nums.length - 2), robRange(nums, 1, nums.length - 1));
};

const robRange = (nums, start, end) => {
    if (start === end) return nums[start];
    const size = nums.length, dp = new Array(size).fill(0);
    dp[start] = nums[start];
    dp[start + 1] = Math.max(nums[start], nums[start + 1]);
    for (let i = start + 2; i <= end; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }

    return dp[end];
}

// const nums = [1, 2, 3, 1];
// console.log(rob02(nums));

/**
 * 139. 单词拆分
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    // 动态规划、字符串
    const size = s.length, dp = new Array(size + 1).fill(false);
    dp[0] = true;

    for (let i = 0; i <= size; i++) {
        for (let j = 0; j < i; j++) {
            let sliceStr = s.substring(j, i);
            if (wordDict.includes(sliceStr) && dp[j]) {
                dp[i] = true;
            }
        }
    }

    return dp[size];
};

// const s = "leetcode", wordDict = ["leet", "code"];
// console.log(wordBreak(s, wordDict));

/**
 * 100031. 计算 K 置位下标对应元素的和
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumIndicesWithKSetBits = function (nums, k) {
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i.toString(2).split("").filter(item => item === "1").length === k) {
            sum += nums[i];
        }
    }

    return sum;
};

// const nums = [5, 10, 1, 5, 2], k = 1;
// const nums = [4, 3, 2, 1], k = 2;
// console.log(sumIndicesWithKSetBits(nums, k));

/**
 * 100040. 让所有学生保持开心的分组方法数
 * @param {number[]} nums
 * @return {number}
 */
var countWays = function (nums) {
    // 从低到高排序
    nums.sort((a, b) => a - b);
    let count = 0;

    console.log(nums);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1] + 1) {
            count++;
        }
    }

    return count;
};

// const nums = [6, 0, 3, 3, 6, 7, 2, 7];
// console.log(countWays(nums));

// 100033. 最大合金数
var maxNumberOfAlloys = function (n, k, budget, composition, stock, cost) {
    let maxCount = 0;

};

const n = 3, k = 2, budget = 15, composition = [[1, 1, 1], [1, 1, 10]], stock = [0, 0, 0], cost = [1, 2, 3];
console.log(maxNumberOfAlloys(n, k, budget, composition, stock, cost));