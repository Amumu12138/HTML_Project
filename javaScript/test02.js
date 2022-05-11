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
            newArr[i][j] = arr[n - j - 1][i];
        }
    }
    return newArr;
}

// let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
let newArr = arrRotate90(arr, 4);
console.log(newArr);