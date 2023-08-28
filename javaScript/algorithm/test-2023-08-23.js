/**
 * 39. 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    let path = [], result = [];
    candidates.sort((a, b) => a - b);

    // 回溯算法
    const backtracking = (candidates, sum, targetSum, startIndex) => {
        if (sum > targetSum) {
            return;
        }

        if (sum === targetSum) {
            result.push([...path]);
            return;
        }

        for (let i = startIndex; i < candidates.length && (sum + candidates[i]) <= targetSum; i++) {
            path.push(candidates[i]);
            sum += candidates[i];
            backtracking(candidates, sum, target, i);
            path.pop();
            sum -= candidates[i];
        }
    }

    backtracking(candidates, 0, target, 0);
    return result;
};


const combinationSum02 = function (candidates, target) {
    let path = [], result = [], len = candidates.length;
    candidates.sort((a, b) => a - b);

    // 减参回溯算法
    const backtracking = (candidates, target, startIndex) => {
        if (target < 0) return;
        if (target === 0) {
            result.push([...path]);
            return;
        }

        for (let i = startIndex; i < len; i++) {
            target -= candidates[i];
            path.push(candidates[i]);
            backtracking(candidates, target, i);
            path.pop();
            target += candidates[i];
        }
    }

    backtracking(candidates, target, 0);
    return result;
};


// const candidates = [2, 3, 6, 7], target = 7;
// const candidates = [2, 3, 5], target = 8;
// console.log(combinationSum02(candidates, target));

/**
 * 40. 组合总和 II
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    let path = [], result = [], len = candidates.length;
    let used = new Array(len).fill(0);
    candidates.sort((a, b) => a - b);

    // 回溯算法+去重+剪枝
    const backtracking = (candidates, target, startIndex, used) => {
        if (target < 0) return;
        if (target === 0) {
            result.push([...path]);
            return;
        }

        for (let i = startIndex; i < len && target - candidates[i] >= 0; i++) {
            // 树层去重
            if (i > 0 && candidates[i] === candidates[i - 1] && used[i - 1] === 0) {
                continue;
            }

            target -= candidates[i];
            path.push(candidates[i]);
            used[i] = 1;
            backtracking(candidates, target, i + 1, used);
            target += candidates[i];
            path.pop();
            used[i] = 0;
        }
    }

    backtracking(candidates, target, 0, used);
    return result;
};

// const candidates = [10, 1, 2, 7, 6, 1, 5], target = 8;
// const candidates = [2, 5, 2, 1, 2], target = 5;
// console.log(combinationSum2(candidates, target));

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    let path = [], result = [], size = s.length;

    // 回溯算法
    function backtracking(s, startIndex) {
        if (startIndex >= size) {
            result.push([...path]);
            return;
        }

        for (let i = startIndex; i < size; i++) {
            if (!isPalindrome(s, startIndex, i)) {
                continue;
            }

            path.push(s.substring(startIndex, i + 1));
            backtracking(s, i + 1);
            path.pop();
        }
    }

    backtracking(s, 0);
    return result;
};

// 判断是否是回文串
const isPalindrome = (s, start, end) => {
    while (start <= end) {
        if (s[start] !== s[end]) {
            return false;
        }
        start++;
        end--;
    }

    return true;
}

// const s = "a";
// console.log(partition(s));

/**
 * 93. 复原 IP 地址
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    let path = [], result = [], size = s.length;

    function backtracking(s, startIndex) {
        const len = path.length;
        if (len > 4) return;
        if (len === 4 && startIndex === size) {
            result.push(path.join("."));
            return;
        }

        for (let i = startIndex; i < size; i++) {
            if (!isValid(s, startIndex, i)) {
                continue;
            }

            path.push(s.substring(startIndex, i + 1));
            backtracking(s, i + 1);
            path.pop();
        }
    }

    backtracking(s, 0, 0);
    return result;
};

// 判断字符串s在左闭又闭区间[start, end]所组成的数字是否合法
const isValid = (s, start, end) => {
    if (start > end || s[start] === '0' && start != end || parseInt(s.substring(start, end + 1)) > 255) {
        return false;
    }

    return true;
}

// const s = "25525511135";
// console.log(restoreIpAddresses(s));

/**
 * 90. 子集 II
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
    let path = [], result = [], size = nums.length;
    let used = new Array(size).fill(false);
    nums.sort((a, b) => a - b);
    console.log(used);

    // 回溯算法
    function backtracking(nums, startIndex) {
        result.push([...path]);
        if (startIndex >= size) {
            return;
        }

        for (let i = startIndex; i < size; i++) {
            // 树层去重
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }
            path.push(nums[i]);
            used[i] = true;
            backtracking(nums, i + 1);
            path.pop();
            used[i] = false;
        }
    }

    backtracking(nums, 0);
    return result;
};

// const nums = [1, 2, 2];
// console.log(subsetsWithDup(nums));

/**
 * 491. 递增子序列
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
    const result = [], path = [];
    // 回溯算法
    function backtracking(nums, startIndex) {
        if (path.length > 1) {
            result.push([...path]);
        }

        let used = new Array(200).fill(false);
        for (let i = startIndex; i < nums.length; i++) {
            if (i > 0 && nums[i] < path[path.length - 1] || used[nums[i] + 100]) {
                continue;
            }
            used[nums[i] + 100] = true;
            path.push(nums[i]);
            backtracking(nums, i + 1);
            path.pop();
        }
    }
    backtracking(nums, 0);
    return result;
};

// const nums = [4, 6, 7, 7];
// console.log(findSubsequences(nums));


/**
 * 46. 全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    let path = [], result = [];
    const used = new Array(nums.length).fill(false);

    // 回溯算法+排列
    function backtracking(nums, used) {
        if (path.length >= nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            path.push(nums[i]);
            backtracking(nums, used);
            path.pop();
            used[i] = false;
        }
    }

    backtracking(nums, used);
    return result;
};

const nums = [0, 1];
console.log(permute(nums));