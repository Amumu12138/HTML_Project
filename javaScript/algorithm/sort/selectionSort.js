// 选择排序实现
function selectionSort (arr) {
    if (arr == null || arr.length < 2) return;

    // 算法展示(菜鸟课程): https://www.runoob.com/w3cnote/selection-sort.html
    for (var i = 0; i < arr.length; i++) {
        var minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            minIndex = arr[j] < arr[minIndex] ? j : minIndex;
        }

        swap(arr, i, minIndex);
    }
}

// 交换arr[i]和arr[j]的数据
function swap (arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

var a = [5, 4, 6, 2, 7, 3, 1];
selectionSort(a);

console.log('selectionSort  a-->', a);