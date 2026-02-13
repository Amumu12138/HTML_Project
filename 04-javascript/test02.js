//  有一个NxN整数矩阵，请编写一个算法，将矩阵顺时针旋转90度。
// 给定一个NxN的矩阵，和矩阵的阶数N,请返回旋转后的NxN矩阵。
// 输入：[[1,2,3],[4,5,6],[7,8,9]],3
// 返回值：[[7,4,1],[8,5,2],[9,6,3]]

function arrRotate90(arr, n) {
    if (!arr || arr.length < 0) return;

    let newArr = [];
    for (let i = 0; i < n; i++) {
        newArr[i] = [];
        for (let j = 0; j < n; j++) {
            console.log(n - j - 1, i, arr[n - j - 1])
            newArr[i][j] = arr[n - j - 1][i];
        }
    }
    return newArr;
}

function rotateMatrix(matrix, n) {
    // 第一步：转置矩阵（行变列，列变行）
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // 交换matrix[i][j]和matrix[j][i]
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    console.log(matrix)
    // 第二步：反转每一行
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }

    return matrix;
}

// let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
let newArr = rotateMatrix(arr, 4);
console.log(newArr);