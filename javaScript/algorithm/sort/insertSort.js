

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
console.log('insertionSort a-->', a);

function defaultSort (arr) {
    if (arr === null || arr.length < 2) return;


}

// 获取随机不超过maxSize数量且最大值不超过maxValue的数组
function getRandomArray (maxSize, maxValue) {
    let arr = [];
    let radomSize = Math.floor(Math.random() * (maxSize + 1));
    for (let i = 0; i < radomSize; i++) {
        arr.push(Math.floor((maxValue + 1) * Math.random() - Math.floor(maxSize * Math.random())));
    }

    return arr;
}

// 算法比较
function compare (argA, argB, maxSize, maxValue) {
    let randomArr = getRandomArray(maxSize, maxValue);
    // 获取复制randomArr的数组
    let randomArrCopy = JSON.parse(JSON.stringify(randomArr));
    console.log('before randomArr -->', randomArr, ' randomArrCopy -->', randomArrCopy);

    let now = Date.now();
    argA(randomArr);
    let duration = Date.now() - now;
    console.log('duration -->', duration);

    let now02 = Date.now();
    argB(randomArrCopy);
    let duration02 = Date.now() - now02;
    console.log('duration02 -->', duration02);

    console.log('after randomArr -->', randomArr, ' randomArrCopy -->', randomArrCopy);
    return JSON.stringify(randomArr) === JSON.stringify(randomArrCopy) ? 'true' : 'error';
}

let res = compare(insertionSort, defaultSort, 10000, 10000);
console.log('compare res -->', res);