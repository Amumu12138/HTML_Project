const { SingleList } = require("./list/singleList")
/**
 * 88. 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    let j = 0;
    for (let i = m; i < nums1.length; i++) {
        nums1[i] = nums2[j++];
    }

    return nums1.sort((a, b) => a - b);
};

// const nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3;
// console.log(merge(nums1, m, nums2, n));

/*
6939. 数组中的最大数对和
* @param {number[]} nums
* @return {number}
*/
var maxSum = function (nums) {
    let sum = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < nums.length; i++) {
        let maxINum = Math.max(...nums[i].toString().split(""));
        for (j = i + 1; j < nums.length; j++) {
            let maxJNum = Math.max(...nums[j].toString().split(""));
            if (maxINum === maxJNum) {
                sum = Math.max(sum, nums[i] + nums[j]);
            }
        }
    }

    return sum === Number.MIN_SAFE_INTEGER ? -1 : sum;
};

// const nums = [51, 71, 17, 24, 42];
// const nums = [1, 2, 3, 4];
// const nums = [31, 25, 72, 79, 74];
// console.log(maxSum(nums));

/**
 * 6914. 翻倍以链表形式表示的数字
 * @param {ListNode} head
 * @return {ListNode}
 */
var doubleIt = function (head) {
    // 先反转链表
    let reverseListHead = reverseList(head);

    let curNode = reverseListHead, preNode = null;
    let preMul = 0;

    // 链表数字翻倍  
    while (curNode) {
        let mulSum = curNode.val * 2;
        curNode.val = mulSum % 10 + preMul;
        preMul = mulSum >= 10 ? 1 : 0;
        preNode = curNode;
        curNode = curNode.next;
    }
    // 新增节点
    if (preMul) {
        preNode.next = new ListNode(1, null);
    }

    //再次反转链表
    return reverseList(reverseListHead);
};

// 反转链表
const reverseList = (head) => {
    let pre = null.cur = head;

    while (cur) {
        let tempNode = cur.next;
        cur.next = pre;

        pre = cur;
        cur = tempNode;
    }

    return pre;
}

/**
 * 7022. 限制条件下元素之间的最小绝对差
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minAbsoluteDifference = function (nums, x) {
    // 滑动窗口
    let left = 0, right = 0, min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < nums.length; i++) {
        left = i;
        right = i + x;
        while (right < nums.length) {
            min = Math.min(min, Math.abs(nums[right] - nums[left]));
            right++;
        }
    }

    return min;
};

// const nums = [4, 3, 2, 4], x = 2;
// const nums = [5, 3, 2, 10, 15], x = 1;
// const nums = [1, 2, 3, 4], x = 3;
// console.log(minAbsoluteDifference(nums, x));

/**
 * 7023. 操作使得分最大
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {

};

// 合并两个有序数组
const merge02 = function (nums1, m, nums2, n) {
    // 利用辅助空间help存储已排序好的nums1和nums2
    const help = [];
    let left = 0, right = 0, i = 0;

    while (left < m && right < n) {
        help[i++] = nums1[left] <= nums2[right] ? nums1[left++] : nums2[right++];
    }

    while (left < m) {
        help[i++] = nums1[left++];
    }


    while (right < n) {
        help[i++] = nums2[right++];
    }

    for (let j = 0; j < m + n; j++) {
        nums1[j] = help[j];
    }

    return nums1;
};

// const nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3;
// console.log(merge02(nums1, m, nums2, n));

let myList = new SingleList();
console.log(myList);