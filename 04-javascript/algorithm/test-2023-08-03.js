/**
 * 455. 分发饼干
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
    let result = 0, index = s.length - 1;
    // 排序
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    // 先把尺寸最大的饼干喂给可以满足胃口的孩子,再依次递减
    for (let i = g.length - 1; i >= 0; i--) {
        if (index >= 0 && s[index] >= g[i]) {
            result++;
            index--;
        }
    }

    return result;
};

// const g = [1, 2, 3], s = [1, 1];
// const g = [1, 2], s = [1, 2, 3];
// console.log(findContentChildren(g, s));

/**
 * 21. 合并两个有序链表、
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    // 傻瓜遍历
    let head, curNode;
    // 获取头节点
    if (list1?.val < list2?.val) {
        head = list1;
    } else {
        head = list2;
    }

    curNode = head;
    // 合并list1和list2链表
    while (list1 && list2) {
        if (list1.val < list2.val) {
            curNode.next = list1;
            list1 = list1.next;
        } else {
            curNode.next = list2;
            list2 = list2.next;
        }
    }

    // list1未遍历完继续遍历
    while (list1) {
        curNode.next = list1;
        list1 = list1.next;
    }
    // list2未遍历完继续遍历
    while (list2) {
        curNode.next = list2;
        list2 = list2.next;
    }

    return head;
};

// 递归实现
const mergeTwoList_dg = function (list1, list2) {
    if (list1 == null) {
        return list2;
    } else if (list2 == null) {
        return list1;
    } else if (list1.val < list2.val) {
        list1.next = mergeTwoList_dg(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoList_dg(list1, list2.next);
        return list2;
    }
};

/**
 * 376. 摆动序列
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
    if (nums.length <= 1) {
        return 1;
    }
    // 贪心策略
    let result = 1;
    let preDiff = 0, curDiff = 0;
    for (let i = 1; i < nums.length; i++) {
        // 当前数值与前一数值的差
        curDiff = nums[i] - nums[i - 1];
        // 当前数值与前一数值和后一数值存在摆动
        if ((preDiff <= 0 && curDiff > 0) || (preDiff >= 0 && curDiff < 0)) {
            result++;
            // 记录当前数值的差
            preDiff = curDiff;
        }
    }

    return result;
};

// const nums = [1, 7, 4, 9, 2, 5];
// const nums = [1, 17, 5, 10, 13, 15, 10, 5, 16, 8];
// const nums = [0, 0];
// console.log(wiggleMaxLength(nums));


/**
 * 53. 最大子数组和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // 贪心策略
    let result = Number.MIN_SAFE_INTEGER, sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // 比较局部最大值
        result = Math.max(result, sum);
        // 局部和负数,舍弃sum,重新sum赋值
        if (sum < 0) {
            sum = 0;
        }
    }

    return result;
};

const maxSubArray_dp = function (nums) {
    // 动态规划
    let result = nums[0], preSum = 0;

    for (let i = 0; i < nums.length; i++) {
        preSum = Math.max(preSum + nums[i], nums[i]);
        result = Math.max(result, preSum);
    };
    return result;
}

// const nums02 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// // const nums02 = [-2, 3, -1, 0];
// console.log(maxSubArray_dp(nums02));

/**
 * 122. 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // 贪心策略
    let result = 0;

    for (let i = 1; i < prices.length; i++) {
        // 每次只求股票买卖为正利润时操作
        result += Math.max(prices[i] - prices[i - 1], 0);
    }

    return result;
};

// const prices = [7, 6, 4, 3, 1];
// console.log(maxProfit(prices));

// 手撕归并排序
const merge_sort = (arr) => {
    mergeProcess(arr, 0, arr.length - 1);
}

// 归并分治过程
const mergeProcess = (arr, left, right) => {
    if (left === right) {
        return arr[left];
    }

    console.log(left, right);
    let mid = left + Math.floor((right - left) / 2);
    // let mid = left + ((right - left) >> 1);
    console.log(mid);
    mergeProcess(arr, left, mid);
    mergeProcess(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// 归并
const merge = (arr, left, mid, right) => {
    const help = [];
    let i = 0, p1 = left, p2 = mid + 1;
    // 迭代比较left~mid和mid+1~right区间的值,并从小到大放入help数组中
    while (p1 <= mid && p2 <= right) {
        help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    // left~mid未遍历完,继续遍历
    while (p1 <= mid) {
        help[i++] = arr[p1++];
    }
    // mid+1~right未遍历完,继续遍历
    while (p2 <= right) {
        help[i++] = arr[p2++];
    }

    for (let j = 0; j < help.length; j++) {
        arr[left + j] = help[j];
    }
}

const getRandomArray = (n) => {
    return new Array(n).fill().map(item => Math.floor(Math.random() * n));
}

// const NUM = 100;
// const array = getRandomArray(NUM);
// console.log("before array ", array);
// merge_sort(array);
// console.log("after array", array);

/**
 * 6990. 取整购买后的账户余额
 * @param {number} purchaseAmount
 * @return {number}
 */
var accountBalanceAfterPurchase = function (purchaseAmount) {
    const amout = 100;
    let minAmount = (Math.floor(purchaseAmount / 10)) * 10;
    let maxAmount = (Math.floor(purchaseAmount / 10) + 1) * 10;
    let roundedAmount = Math.abs(minAmount - purchaseAmount) < Math.abs(maxAmount - purchaseAmount) ? minAmount : maxAmount;

    return amout - roundedAmount;
};

// const purchaseAmount = 15;
// console.log(accountBalanceAfterPurchase(purchaseAmount));

/**
 * 6940. 在链表中插入最大公约数
 * @param {*} head 
 */
var insertGreatestCommonDivisors = function (head) {
    let curNode = head;
    // 遍历到链表末尾前一个节点
    while (curNode && curNode.next) {
        let tempNode = curNode.next;
        // 把相邻两个节点的最大公约数添加到链表中
        let commonDivisor = getGreatestCommonDivisor(curNode.val, tempNode.val);
        let newNode = new ListNode(commonDivisor, null);
        newNode.next = tempNode;
        curNode.next = newNode;

        // curNode指向下一节点
        curNode = tempNode;
    }

    return head;
};

// 求最大公约数
var getGreatestCommonDivisor = function (num1, num2) {
    return num1 % num2 === 0 ? num2 : getGreatestCommonDivisor(num2, num1 % num2);
}

// const num1 = 3, num2 = 10;
// console.log(getGreatestCommonDivisor(num1, num2));

/**
 * 6956. 使循环数组所有元素相等的最少秒数
 * @param {number[]} nums
 * @return {number}
 */
// var minimumSeconds = function (nums) {

// };

// const nums = [1, 2, 1, 2];
// console.log(minimunSeconds(nums));