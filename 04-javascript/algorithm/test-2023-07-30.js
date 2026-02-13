/**
 * 142. 环形链表 II
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。
注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
不允许修改 链表。
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    // 快慢指针
    let slow = fast = head;
    while (fast !== null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        // 快慢指针相遇,此时快指针指回头节点,与慢节点同时出发,相遇即为入环节点
        if (fast === slow) {
            fast = head;
            while (fast !== slow) {
                fast = fast.next;
                slow = slow.next;
            }
            return fast;
        }
    }

    return null;
};

/**
 * 202 快乐数
 * 编写一个算法来判断一个数 n 是不是快乐数。
「快乐数」 定义为：
对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    let set = new Set(), sum = n;
    while (true) {
        sum = getSum(sum);
        if (sum === 1) {
            return true;
        }

        if (set.has(sum)) {
            return false;
        } else {
            set.add(sum);
        }
    }
};

// 求每个位置上的平方和
const getSum = (num) => {
    let sum = 0;
    while (num) {
        sum += (num % 10) * (num % 10);
        num = Math.floor(num / 10);
    }

    return sum;
}

const n = 2;
// console.log(isHappy(n));

/**
 * 1 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // map映射存储
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let other = target - nums[i];
        if (map.has(other)) {
            return [i, map.get(other)];
        } else {
            map.set(nums[i], i);
        }
    }
};

// const nums = [2, 7, 11, 15], target = 9;
const nums = [3, 2, 4], target = 6;
// console.log(twoSum(nums, target));

// 6917. 满足目标工作时长的员工数目
var numberOfEmployeesWhoMetTarget = function (hours, target) {
    return hours.filter(item => item >= target).length;
};

// 6900. 统计完全子数组的数目
var countCompleteSubarrays = function (nums) {
    // 双指针
    let numsSet = [...new Set(nums)]; // 数组去重
    let count = 0, right = nums.length - 1, minLen = numsSet.length;

    for (let i = 0; i < nums.length; i++) {
        right = nums.length - 1;
        while (i <= right && (right - i + 1) >= minLen) {
            let newNums = nums.slice(i, right + 1);
            if (numsSet.every(item => newNums.includes(item))) {
                count++;
            }
            right--;
        }
    }

    return count;
};

// 获取数组非空子集
const getSubArr = (nums) => {
    // 双指针
    let len = nums.length, right = len - 1, left = 0;
    let subArr = [];

    while (left < len) {
        right = len - 1;
        while (left <= right) {
            let sub = nums.slice(left, right + 1);
            subArr.push(sub);
            right--;
        }
        left++;
    }

    return subArr;

}
// const nums02 = [1, 3, 1, 2, 2];
// const nums02 = [5, 5, 5, 5];
// console.log(countCompleteSubarrays(nums02));
const nums03 = [1, 2, 3];
console.log(getSubArr(nums03));