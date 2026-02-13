/**
 * 704 二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    const len = nums.length;

    let left = 0, right = len;
    while (left < right) {
        let middle = Math.floor((right + left) / 2);
        if (nums[middle] > target) {
            right = middle;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            return middle;
        }
    }

    return -1;
};

const nums = [-1, 0, 3, 5, 9, 12], target = 9;
// const nums = [-1, 0, 3, 5, 9, 12], target = 2;
// console.log(search(nums, target));

/**
 * 27. 移除元素
 * @param {*} nums 
 * @param {*} val 
 */
var removeElement = function (nums, val) {
    let front = slow = 0;
    for (; front < nums.length; front++) {
        if (nums[front] !== val) {
            nums[slow++] = nums[front];
        }
    }

    return slow;
};

// const nums02 = [3, 2, 2, 3], val = 3;
const nums02 = [0, 1, 2, 2, 3, 0, 4, 2], val = 2
// console.log(removeElement(nums02, val));

/**
 * 209 长度最小的子数组 滑动窗口
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const len = nums.length;
    let i = j = sum = 0, maxLen = Number.MAX_SAFE_INTEGER;
    for (; j < len; j++) {
        sum += nums[j];
        while (sum >= target) {
            maxLen = maxLen < j - i + 1 ? maxLen : j - i + 1;
            sum -= nums[i++];
        }
    }

    return maxLen > len ? 0 : maxLen;
};

// const target03 = 7, nums03 = [2, 3, 1, 2, 4, 3];
const target03 = 4, nums03 = [1, 4, 4]
console.log(minSubArrayLen(target03, nums03));