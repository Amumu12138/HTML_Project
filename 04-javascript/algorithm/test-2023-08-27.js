const path = require("path");

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    // 每日一题:2023.08.27
    if (!intervals.length) return [];
    // 排序
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= result[result.length - 1][1]) {
            result[result.length - 1][1] = Math.max(intervals[i][1], result[result.length - 1][1]);
        } else {
            result.push(intervals[i]);
        }
    }

    return result;
};

// const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
// const intervals = [[1, 4], [4, 5]];
// console.log(merge(intervals));

/**
 * 8015. 距离原点最远的点
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function (moves) {
    const size = moves.length;
    let LStep = 0, RStep = 0;
    for (const item of moves) {
        if (item === "L") {
            LStep++;
        } else if (item === "R") {
            RStep++;
        }
    }

    return Math.abs(LStep - RStep) + (size - LStep - RStep);
};

// const moves = "L_RL__R";
// const moves = "_R__LL_";
// // const moves = "_______";
// console.log(furthestDistanceFromOrigin(moves));

/**
 * 8022. 找出美丽数组的最小和
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minimumPossibleSum = function (n, target) {
    let result = [], start = 0;

    while (result.length < n) {
        start++;
        if (start < target && result.includes(target - start)) {
            continue;
        }
        result.push(start);
    }

    return result.reduce((x, y) => x + y);
};

// const n = 3, target = 3;
// const n = 1, target = 1;
// const n = 2, target = 3;
// console.log(minimumPossibleSum(n, target));

/**
 * 8021. 使子序列的和等于目标的最少操作次数
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var minOperations = function (nums, target) {
    if (nums.reduce((x, y) => x + y) < target) return -1;
    let count = 0, size = nums.length;
    nums.sort((a, b) => a - b);

};

// 使子序列的和等于目标值
const isValid = (nums, target) => {
    let path = [];
    function backtracking(nums, startIndex) {
        if (path.reduce((x, y) => x + y) === target) {
            return true;
        }

        for (let i = startIndex; i < nums.length; i++) {
            path.push(nums[i]);
            backtracking(nums, i + 1);
            path.pop();
        }
    }

    backtracking(nums, 0);
    return false;
}

// const nums = [1, 2, 8], target = 7;
// console.log(minOperations(nums, target));
// console.log(isValid([1, 2, 4, 4], 7));

/**
 * 47. 全排列 II
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    const result = [], path = [], size = nums.length;
    // 排序
    nums.sort((a, b) => a - b);
    const used = new Array(size).fill(false);

    // 回溯+树层去重+剪枝
    function backtracking(nums, used) {
        if (path.length === size) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < size; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && used[i - 1] || used[i]) {
                continue;
            }

            used[i] = true;
            path.push(nums[i]);
            backtracking(nums, used);
            used[i] = false;
            path.pop();
        }
    }

    backtracking(nums, used);
    return result;
};

// const nums = [1, 1, 2];
// const nums = [1, 2, 3];
// const nums = [1, 1, 1];
// console.log(permuteUnique(nums));

/**
 * 51. N 皇后
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const result = [], path = [];
    const chessboard = new Array(n).fill().map(() => new Array(n).fill("."));

    // 回溯算法
    function backtracking(chessboard, row) {
        if (row === n) {
            let chessboardStr = chessboard.map(item => item.join(""));
            result.push(JSON.parse(JSON.stringify(chessboardStr)));
            //  result.push(transformBoard(chessboardStr));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (!isValidQueens(chessboard, n, row, col)) {
                continue;
            }
            chessboard[row][col] = "Q";
            backtracking(chessboard, row + 1);
            chessboard[row][col] = ".";
        }
    }

    backtracking(chessboard, 0);
    return result;
};

// 判断放皇后的位置是否有效
const isValidQueens = (chessboard, n, row, col) => {
    // 判断同列是否存在皇后
    for (let i = 0; i < row; i++) {
        if (chessboard[i][col] === "Q") {
            return false;
        }
    }

    // 判断斜45度角方向是否存在皇后
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (chessboard[i][j] === 'Q') {
            return false
        }
    }

    // 判断斜135度角方向是否存在皇后
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (chessboard[i][j] === 'Q') {
            return false
        }
    }

    return true;
}

// 深拷贝数组
const transformBoard = (board) => {
    const resArr = [];
    board.forEach(row => {
        let rowStr = "";
        row.forEach(value => {
            rowStr += value;
        });
        resArr.push(rowStr);
    })

    return resArr;
}

// const n = 4;
// console.log(solveNQueens(n));


/**
 * 37. 解数独
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
    // 回溯算法
    function backTracking() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] !== '.') continue
                for (let val = 1; val <= 9; val++) {
                    if (isValidSudo(board, i, j, `${val}`)) {
                        board[i][j] = `${val}`
                        if (backTracking()) {
                            return true;
                        }

                        board[i][j] = `.`;
                    }
                }
                return false;
            }
        }
        return true;
    }
    backTracking(board);
    return board;
};

// 判断数独填入的值是否有效
const isValidSudo = (board, row, col, val,) => {
    let len = board.length
    // 行不能重复
    for (let i = 0; i < len; i++) {
        if (board[row][i] === val) {
            return false
        }
    }
    // 列不能重复
    for (let i = 0; i < len; i++) {
        if (board[i][col] === val) {
            return false
        }
    }
    let startRow = Math.floor(row / 3) * 3
    let startCol = Math.floor(col / 3) * 3

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === val) {
                return false
            }
        }
    }

    return true
}

const board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
console.log(solveSudoku(board));