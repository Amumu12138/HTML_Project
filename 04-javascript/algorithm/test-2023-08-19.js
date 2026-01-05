const { createBinaryTree, TreeNode } = require("./tree/treeNode");

// 迭代法实现前序遍历
const preorderTraversal = (root) => {
    let stack = [], result = [];
    if (root === null) return "";
    stack.push(root);
    while (stack.length) {
        let node = stack.pop();
        console.log("node", node);
        // 中
        result.push(node.val);
        // 右（空节点不入栈）
        if (node.right) {
            stack.push(node.right)
        }
        // 左（空节点不入栈）
        if (node.left) {
            stack.push(node.left);
        }
    }

    return result.join("->");
}

const list = [0, null, 2, 3]
// const root = createBinaryTree(list);
// console.log("root", root);
// console.log(preorderTraversal(root));

// 迭代法实现中序遍历
const inorderTraversal = (root) => {
    if (!root) return [];
    const stack = [], result = [];
    let curNode = root;
    // 判断是否已遍历完整颗树: 当前节点不为空节点和栈不为空
    while (curNode || stack.length) {
        // 向左遍历左子树的左节点
        if (curNode) {
            stack.push(curNode);
            curNode = curNode.left;
        } else {
            // 弹出当前节点,再遍历右孩子
            curNode = stack.pop();
            result.push(curNode.val);
            curNode = curNode.right;
        }
    }

    return result.join("->");
}

// console.log(inorderTraversal(root));
// 统一迭代实现前序遍历
const preorderTraversal_iteror = (root) => {
    const stack = [], result = [];
    if (root) stack.push(root);
    // 前序遍历：中左右
    while (stack.length) {
        let node = stack.pop();
        if (node) {
            // 压栈顺序：右左中
            if (node.right) {
                stack.push(node.right);
            }
            if (node.left) {
                stack.push(node.left);
            }
            stack.push(node);
            stack.push(null);
        } else {
            // 节点弹出
            result.push(stack.pop().val);
        }
    }

    return result;
}

// console.log(preorderTraversal_iteror(root));
// 统一迭代实现中序遍历
const inorderTraversal_iteror = (root) => {
    const stack = [], result = [];
    if (root) stack.push(root);
    // 中序遍历：左中右
    while (stack.length) {
        let node = stack.pop();
        if (node) {
            // 压栈顺序：右中左
            if (node.right) {
                stack.push(node.right);
            }
            stack.push(node);
            stack.push(null);
            if (node.left) {
                stack.push(node.left);
            }
        } else {
            // 节点弹出
            result.push(stack.pop().val);
        }
    }

    return result;
}

// console.log(inorderTraversal_iteror(root));

// 统一迭代实现后序遍历
const postorderTraversal_iteror = (root) => {
    const stack = [], result = [];
    if (root) stack.push(root);
    // 后序遍历：左右中
    while (stack.length) {
        let node = stack.pop();
        if (node) {
            // 压栈顺序：中右左
            stack.push(node);
            stack.push(null);
            if (node.right) {
                stack.push(node.right);
            }
            if (node.left) {
                stack.push(node.left);
            }
        } else {
            // 节点弹出
            result.push(stack.pop().val);
        }
    }

    return result;
}

// console.log(postorderTraversal_iteror(root));

/**
 * 654. 最大二叉树
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
    if (nums.length === 1) {
        return new TreeNode(nums[0], null, null);
    }

    // 分治求左右子树
    let index = 0, max = 0;
    max = Math.max(...nums);
    index = nums.indexOf(max);
    let newNode = new TreeNode(max, null, null);
    // 设置newNode的左子树
    if (index > 0) {
        newNode.left = constructMaximumBinaryTree(nums.slice(0, index));
    }
    // 设置newNode的右子树
    if (index < nums.length - 1) {
        newNode.right = constructMaximumBinaryTree(nums.slice(index + 1, nums.length));
    }

    return newNode;
};

const nums = [3, 2, 1, 6, 0, 5];
// console.log(constructMaximumBinaryTree(nums));

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
    if (!root1) return root2;
    if (!root2) return root1;
    // 前序遍历: 中、左、右
    root1.val += root2.val;
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);

    return root1;
};

const root1 = [1, 3, 2, 5], root2 = [2, 1, 3, null, 4, null, 7];
const rootTree1 = createBinaryTree(root1);
// const rootTree2 = createBinaryTree(root2);
console.log(rootTree1);
// console.log(mergeTrees(rootTree1, rootTree2));

/**
 * 530. 二叉搜索树的最小绝对差
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
    // 迭代实现
    let min = Number.MAX_SAFE_INTEGER, pre = null;
    // 中序遍历: 左、中、右
    function inOrder(root) {
        if (!root) return;
        inOrder(root.left);
        if (pre) {
            min = Math.min(min, Math.abs(root.val - pre.val));
        }
        pre = root;
        inOrder(root.right);
    }

    inOrder(root);
    return min;
};

var getMinimumDifference_array = function (root) {
    // 数组存储实现
    let min = Number.MAX_SAFE_INTEGER, rootArr = [];
    // 中序遍历: 左、中、右
    function inOrder(root) {
        if (!root) return;

        inOrder(root.left);
        rootArr.push(root.val);
        inOrder(root.right);
    }

    inOrder(root);

    let preIndex = 0;
    for (let i = 1; i < rootArr.length; i++) {
        preIndex = i - 1;
        min = Math.min(min, Math.abs(rootArr[i] - rootArr[preIndex]));
    }
    return min;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
    // 递归实现
    let result = [], maxCount = 0, count = 0, pre = null;
    // 中序遍历: 左、中、右
    function inOrder(root) {
        if (!root) return;
        inOrder(root.left);
        // 当前节点值与上一节点值相等,频率++
        if (pre?.val === root.val) {
            count++;
        } else {
            // 否则(pre为空或值不相等),count初始化为1
            count = 1;
        }
        pre = root;
        // 当前频率与最大频率相等,将当前节点的值加入result
        if (count === maxCount) {
            result.push(root.val);
        }
        // 当前频率大于最大频率,更新最大频率,当前节点成为result唯一值
        if (count > maxCount) {
            maxCount = count;
            result = [root.val];
        }
        inOrder(root.right);
    }

    inOrder(root);
    return result;
};