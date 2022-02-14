// 冒泡排序实现
function bubbleSort (arr) {
    if (arr === null || arr.length < 2) return;

    // 算法展示(菜鸟课程): https://www.runoob.com/w3cnote/bubble-sort.html
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}

// 交换arr[i]和arr[j]的数据
function swap (arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

var a = [7, 6, 5, 4, 3, 2, 1];
bubbleSort(a);

console.log('bubbleSort a -->', a);