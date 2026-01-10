// 实现打印垂直居中的杨辉三角
function printYanghuiTriangle(n) {
    let arr = yanghuiTriangle(n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            process.stdout.write(arr[i][j] + ' ');
        }
        console.log('\n');
    }
}

// 实现杨辉三角
function yanghuiTriangle(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                arr[i][j] = 1;
            } else {
                arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
            }
        }
    }
    return arr;
}

console.log(printYanghuiTriangle(5));
