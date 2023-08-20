
/**
 * 236. 二叉树的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    // 递归实现
    if (root === null || root === p || root === q) return root;
    // 后序遍历: 左、右、中
    left = lowestCommonAncestor(root.left, p, q);
    right = lowestCommonAncestor(root.right, p, q);
    // 处理父节点(中)的逻辑
    // 左节点和右节点都找到
    if (left && right) return root;

    // 只找到左节点
    if (left && !right) {
        return left;
    } else if (!left && right) {
        // 只找到右节点
        return right;
    } else {
        // 左右节点都没找到
        return null;
    }
};

/**
 * 701. 二叉搜索树中的插入操作
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
    // 迭代实现
    if (!root) {
        return new TreeNode(val);
    }

    let parent, curNode = root;
    while (curNode) {
        parent = curNode;
        if (curNode.val > val) {
            curNode = curNode.left;
        } else {
            curNode = curNode.right;
        }
    }

    let newNode = new TreeNode(val);
    if (parent.val > val) {
        parent.left = newNode;
    } else {
        parent.right = newNode;
    }

    return root;
};

/**
 * 235. 二叉搜索树的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    // 迭代法实现
    while (root) {
        // 当前节点的值比q、p的值都大,向左遍历
        if (root.val > q.val && root.val > p.val) {
            root = root.left;
        } else if (root.val < q.val && root.val < p.val) {
            // 当前节点的值比q、p的值都小,向右遍历
            root = root.right
        } else {
            // 已找到最近公共节点
            return root;
        }
    }

    return root;
};

/**
 * 7004. 判别首字母缩略词
 * @param {string[]} words
 * @param {string} s
 * @return {boolean}
 */
var isAcronym = function (words, s) {
    return words.map(item => item[0]).join("") === s;
};

// const words = ["alice", "bob", "charlie"], s = "abc";
// console.log(isAcronym(words, s));

/**
 * 6450. k-avoiding 数组的最小总和
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minimumSum = function (n, k) {
    let result = [1], newNum = 1;

    while (result.length < n) {
        newNum++;
        if (newNum < k && result.includes(k - newNum)) {
            continue;
        }
        result.push(newNum);
    }

    return result.reduce((x, y) => x + y);
};

// const n = 5, k = 4;
// const n = 2, k = 6;
// console.log(minimumSum(n, k));

/**
 * 7006. 销售利润最大化
 * @param {number} n
 * @param {number[][]} offers
 * @return {number}
 */
var maximizeTheProfit = function (n, offers) {
    // 动态规划: dp数组存储当前房屋区间可销售的最大价值
    let dp = new Array(n).fill(0);
    let first = offers.filter(item => item[1] === 0).sort((a, b) => b[2] - a[2])[0];
    dp[0] = first ? first[2] : 0;
    for (let i = 1; i < n; i++) {
        let current = offers.filter(item => item[1] === i).sort((a, b) => b[2] - a[2])[0];
        console.log("current", current);
        if (!current) {
            dp[i] = dp[i - 1];
        } else {
            dp[i] = Math.max(dp[i - 1], current[0] <= 0
                ? current[2] : current[2] + dp[current[0] - 1]);
        }

        console.log("after", dp[i]);
    }

    return dp[n - 1];
};

// const n = 5, offers = [[0, 0, 1], [0, 2, 2], [1, 3, 2]];
// const n = 5, offers = [[0, 0, 1], [0, 2, 10], [1, 3, 2]];
// const n = 4, offers = [[0, 0, 5], [3, 3, 1], [1, 2, 5], [0, 0, 7]];
const n = 4, offers = [[1, 3, 9], [0, 2, 10], [1, 3, 3], [0, 1, 3], [2, 2, 1], [3, 3, 7], [2, 2, 1], [1, 2, 9], [1, 2, 8]]
console.log(maximizeTheProfit(n, offers));

/**
 * 6467. 找出最长等值子数组
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {

};

const nums = [1, 3, 2, 3, 1, 3], k = 3;
console.log(longestEqualSubarray(nums, k));