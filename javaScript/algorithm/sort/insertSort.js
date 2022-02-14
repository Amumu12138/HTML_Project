// 实现插入排序
function insertionSort (arr) {
    if (arr === null || arr.length < 2) return;

    /**
     * 算法展示(菜鸟课程):https://www.runoob.com/w3cnote/insertion-sort.html
     * i = 0 不需要排序
     * i >= 1 开始往前判断插入
     */
    for (var i = 1; i < arr.length; i++) {
        for (var j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
            swap(arr, j, j + 1);
        }
    }
}

// 交换arr[i]和arr[j]两个数据
function swap (arr, i, j) {
    arr[i] = arr[i] ^ arr[j];
    arr[j] = arr[i] ^ arr[j];
    arr[i] = arr[i] ^ arr[j];
}

// var a = [1, 2, 3, 4, 5, 6, 7];
var a = [7, 6, 5, 4, 3, 2, 1];

insertionSort(a);
console.log('insertionSort a-->', a)