/**
 * 24. 两两交换链表中的节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    // 虚拟头节点
    let dummyNode = new ListNode(-1, null);
    dummyNode.next = head;

    let curNode = dummyNode;
    while (curNode.next && curNode.next.next) {
        let tempNode1 = curNode.next;
        let tempNode2 = tempNode1.next;
        let tempNode3 = tempNode2.next;

        //交换当前节点和下一节点
        curNode.next = tempNode2;
        tempNode2.next = tempNode1;
        tempNode1.next = tempNode3;

        // 将当前节点指向要交换节点的上一节点
        curNode = tempNode1;
    }

    return dummyNode.next;
};

/**
 * 55. 跳跃游戏
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    if (nums.length <= 1) {
        return true;
    }
    let cover = 0;

    // 贪心策略
    for (let i = 0; i <= cover; i++) {
        // 求解局部最优: 当前能覆盖的最大范围
        cover = Math.max(cover, i + nums[i]);
        // 当前位置能覆盖终点位置
        if (cover >= nums.length - 1) {
            return true;
        }
    }

    return false;
};

// const nums = [3, 2, 1, 0, 4];
// console.log(canJump(nums));

/**
 * 45. 跳跃游戏 II
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    if (nums.length <= 1) {
        return 0;
    }
    let curCover = 0, nextCover = 0, result = 0;

    // 贪心策略
    for (let i = 0; i <= curCover; i++) {
        // 局部最优: 下一步能覆盖的最大范围
        nextCover = Math.max(nextCover, i + nums[i]);
        // 到达当前范围的最后一步
        if (i === curCover) {
            if (i < nums.length - 1) {
                // 仍然未到达终点,跳跃步数++,当前范围指向下步最优范围
                result++;
                curCover = nextCover;
                if (curCover >= nums.length - 1) {
                    // 当前范围能覆盖终点位置,跳出循环
                    break;
                }
            } else {
                // 已经能覆盖终点位置
                break;
            }
        }
    }

    return result;
};

// const nums = [2, 3, 1, 1, 4];
// const nums = [2, 3, 0, 1, 4];
// console.log(jump(nums));

/**
 * 6925. 故障键盘
 * @param {string} s
 * @return {string}
 */
var finalString = function (s) {
    let newStrArr = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "i") {
            newStrArr = newStrArr.reverse();
        } else {
            newStrArr.push(s[i]);
        }
    }

    return newStrArr.join("");
};

// const s = "poiinter";
// const s = "string";
// console.log(finalString(s));

/**
 * 6953. 判断是否能拆分数组
 * @param {number[]} nums
 * @param {number} m
 * @return {boolean}
 */
var canSplitArray = function (nums, m) {
    if (nums.length <= 2) {
        return true;
    }

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] + nums[i + 1] >= m) {
            return true;
        }
    }

    return false;
};

// const nums = [2, 3, 3, 2, 3], m = 6;
// const nums = [2, 2, 1], m = 4;
// const nums = [2, 1, 3], m = 5;
// const nums = [2, 1, 1, 3], m = 4;
// const nums = [4, 1, 3, 2, 4], m = 6;
// console.log(canSplitArray(nums, m));

/**
 * 1005. K 次取反后最大化的数组和
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
    // 按绝对值排序
    nums.sort((a, b) =>
        Math.abs(b) - Math.abs(a)
    );

    // 贪心策略
    for (let i = 0; i < nums.length; i++) {
        // 在k范围内,对负数依次取反
        if (nums[i] < 0 && k > 0) {
            nums[i] *= -1;
            k--;
        }
    }

    // k次数没用完,且为基数,对小的非负整数取反
    if (k % 2 === 1) {
        nums[nums.length - 1] *= -1;
    }

    return nums.reduce((x, y) => x + y);
};

// const nums = [3, -1, 0, 2], k = 3;
// console.log(largestSumAfterKNegations(nums, k));

/**
 * 28. 找出字符串中第一个匹配项的下标
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    // KMP算法
    if (needle.length === 0) {
        return 0;
    }

    // 求最长相等前缀表next
    const getNext = (next, s) => {
        let j = -1;
        next[0] = j;
        for (let i = 1; i < s.length; i++) {
            // 前后缀不相同
            while (j >= 0 && s[i] !== s[j + 1]) {
                // 往前回退
                j = next[j];
            }
            if (s[i] === s[j + 1]) {
                // 找到相同的前后缀
                j++;
            }
            // 将前缀的长度j赋值给next[i]
            next[i] = j;
        }
    }

    let needleLen = needle.length;
    let next = new Array(needleLen).fill().map(iemt => 0);
    getNext(next, needle);
    let j = -1;
    for (let i = 0; i < haystack.length; i++) {
        // haystack和needle字符串位置不匹配
        while (j >= 0 && haystack[i] !== needle[j + 1]) {
            // 寻找之前匹配的位置
            j = next[j];
        }
        if (haystack[i] === needle[j + 1]) {
            // 匹配，j和i同时向后移
            j++;
        }
        if (j === needleLen - 1) {
            // 文本串s里出现了模式串t,返回文本串中匹配字符的下标
            return i - needleLen + 1;
        }
    }
    return -1;
};

// console.log("aaa".indexOf("")); // 0

// const haystack = "sadbutsad", needle = "sad";
// const haystack = "leetcode", needle = "code";
// console.log(strStr(haystack, needle));


/**
 * 459. 重复的子字符串
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    // 判断字符串s是否由重复子串组成，只要两个s拼接在一起，里面还出现一个s的话，就说明是由重复子串组成
    let newStr = s + s;
    return newStr.substring(1, newStr.length - 1).includes(s);
};

const s = "abcabcabcabc";
// const s = "abs";
console.log(repeatedSubstringPattern(s));