// 二叉树节点
const TreeNode = function (val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

// 使用前序顺序生成
const createBinaryTree = (list) => {
    if (!list?.length) return null;
    let data = list.shift();
    let root = null;

    if (!isNaN(parseFloat(data)) && isFinite(data)) {
        root = new TreeNode(data, null, null);
        root.left = createBinaryTree(list);
        root.right = createBinaryTree(list);
    }

    return root;
}

module.exports = { createBinaryTree, TreeNode };

// const list = [1, 3, 2, 5];
// const root = createBinaryTree(list);

// 递归实现前序遍历: 中、左、右
const preorderTraversal = function (root) {
    let result = [];
    function dfs(root) {
        if (root === null) {
            return null;
        }
        result.push(root.val);
        dfs(root.left);
        dfs(root.right);
    }

    dfs(root);
    console.log("preorderTraversal result", result);
    return result.join("->")
}

// 递归实现中序遍历: 左、中、右
const inorderTraversal = function (root) {
    let result = [];
    function dfs(root) {
        if (root === null) {
            return null;
        }

        dfs(root.left);
        result.push(root.val);
        dfs(root.right);
    }

    dfs(root);
    console.log("inorderTraversal result", result);
    return result.join("->")
}

// 递归实现后序遍历: 左、右、中
const postorderTraversal = function (root) {
    let result = [];
    function dfs(root) {
        if (root === null) {
            return null;
        }

        dfs(root.left);
        dfs(root.right);
        result.push(root.val);
    }

    dfs(root);
    console.log("postorderTraversal result", result);
    return result.join("->")
}

// console.log(postorderTraversal(root));