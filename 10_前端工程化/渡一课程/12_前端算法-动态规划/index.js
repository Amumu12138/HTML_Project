// 斐波那契数列实现
const f = n => {
    if (n === 1 || n === 0) {
        return 1;
    }

    return f(n - 1) + f(n - 2)
}

console.log(f(4));
// 青蛙跳台阶问题跟斐波那契数列思路一致

// https://leetcode.cn/problems/unique-paths/description/
// 不同路径问题
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 状态转移方程: dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
// 特殊解: i === 0 || j === 0  -> dp[i][j] = 1
var uniquePaths = function (m, n) {
    const dp = [];
    for (let i = 0; i < m; i++) {
        dp.push([])
        for (let j = 0; j < n; j++) {
            // 特殊解: i === 0 || j === 0  -> dp[i][j] = 1
            if (i === 0 || j === 0) {
                dp[i][j] = 1
            } else {
                // 状态转移方程: dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }

    return dp[m - 1][n - 1]
};

var uniquePaths_rollArray = function (m, n) {
    const f = new Array(n).fill(1)
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            f[j] += f[j - 1]
            console.log(f[j], f[j - 1], 'f[j]');
        }
        console.log(f, 'f');
    }

    return f[n - 1]
};

const m = 3, n = 7;
// console.log(uniquePaths_rollArray(m, n));


// 打家劫舍
// 状态转移方程: dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
// 特殊解: i == 0 -》nums[0] i == 1 -> max(nums[0], nums[1])
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const dp = [];
    for (let i = 0; i < nums.length; i++) {
        // 特殊解: i == 0 -》nums[0] i == 1 -> max(nums[0], nums[1])
        if (i === 0) {
            dp[i] = nums[0]
        } else if (i === 1) {
            dp[i] = Math.max(nums[0], nums[1])
        } else {
            // 状态转移方程: dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
        }
    }

    return dp[nums.length - 1]
};

const nums = [1, 2, 3, 1]
// console.log(rob(nums));

/**
 * 地下城游戏
 * @param {number[][]} dungeon
 * @return {number}
 */
// 无后效性
// 状态转移公式: dp[i][j] = max(min(dp[i][j+1], dp[i+1][j]) - dungeon[i][j], 1)
// 特殊解: dp[r][c - 1] = dp[r - 1][c] = 1
var calculateMinimumHP = function (dungeon) {
    const r = dungeon.length;
    const c = dungeon[0].length;
    const dp = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(Infinity))
    console.log(dp, 'dp');

    dp[r][c - 1] = dp[r - 1][c] = 1
    console.log(dp, 'before dp');
    for (let i = r - 1; i >= 0; i--) {
        for (let j = c - 1; j >= 0; j--) {
            // 状态转移公式: dp[i][j] = max(min(dp[i][j+1], dp[i+1][j]) - dungeon[i][j], 1)
            dp[i][j] = Math.max(Math.min(dp[i][j + 1], dp[i + 1][j]) - dungeon[i][j], 1)
        }
    }

    console.log(dp, 'end dp');
    return dp[0][0]
};

// const dungeon = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]
const dungeon = [[-1, -2, 3], [-1, 0, 0], [-3, -3, -2]]
console.log(calculateMinimumHP(dungeon));


// 01背包
// 状态转移公式: dp[i][j] = max(value[i] + dp[i -1][j - weight[i]], dp[i-1][j])
// 特殊解: i == 0 ->  j < weight[i] ? 0 : value[i]
const package = (weight, value, bagWeight) => {
    const r = weight.length;
    const dp = new Array(r).fill(0).map(() => new Array(bagWeight + 1).fill(0))
    console.log(dp, 'dp');

    for (let i = 0; i < r; i++) {
        for (let j = 0; j <= bagWeight; j++) {
            if (i === 0) {
                dp[i][j] = j < weight[i] ? 0 : value[i]
            } else {
                if (j >= weight[i]) {
                    // 容量能包裹住当前物品重量,取(当前物品+去除当前物品重量最优解、不取当前物品)的最大值
                    dp[i][j] = Math.max((value[i] + dp[i - 1][j - weight[i]]), dp[i - 1][j])
                } else {
                    // 容量小于重量，hold不住,所以值等于上一行，同一列。如果i=0,没有上一行，则T[i][j] 取0
                    dp[i][j] = dp[i - 1][j]
                }
            }
        }
    }
    console.log(dp, 'after dp');

    return dp[r - 1][bagWeight]
}

// 01背包-滚动数组版本
const package_rollArray = (value, weight, bagWeight) => {
    let result = [];
    for (let index = 0; index <= bagWeight; index++) {
        result[index] = index >= weight[0] ? value[0] : 0
    }
    console.log(result, 'before result');

    for (let i = 1; i < value.length; i++) {
        const next = []
        for (let j = 0; j <= bagWeight; j++) {
            if (j < weight[i]) {
                next[j] = result[j]
            } else {
                next[j] = Math.max((result[j - weight[i]] + value[i]), result[j])
            }
        }
        result = next;
    }

    console.log(result, 'result');

    return result[bagWeight]
}

const value = [5, 10, 3, 6, 3], weight = [2, 5, 1, 4, 3], bagWeight = 6;
console.log(package_rollArray(value, weight, bagWeight));
