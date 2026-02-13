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

function defaultSort (arr) {
    if (arr === null || arr.length < 2) return;

    arr.sort((a, b) => a - b);
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

let res = compare(selectionSort, defaultSort, 10000, 50000);
console.log('compare res -->', res);