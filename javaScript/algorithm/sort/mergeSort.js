// 获取数组中的最大值
function getMax (arr) {
    if (arr === null || arr.length <= 0) return 'error';

    return process(arr, 0, arr.length - 1);
}

// arr[L...R]范围上求最大值
function process (arr, L, R) {
    if (L === R) {
        return arr[L];
    }
    var mid = L + ((R - L) >> 1);
    let left = process(arr, L, mid);
    let right = process(arr, mid + 1, R);
    return Math.max(left, right);
}

let a = [1, 2, 32, 22, 122, 3, 5, 7];
let max = getMax(a);
console.log('max -->', max);

// 合并排序实现
function mergeSort (arr) {
    if (arr === null || arr.length < 2) return;

    // 算法解析: https://www.runoob.com/w3cnote/merge-sort.html、
    let now = Date.now();
    mergeProcess(arr, 0, arr.length - 1);
    let duration = Date.now() - now;
    console.log('duration -->', duration);
}

// 递归查找最大值
function mergeProcess (arr, left, right) {
    if (left === right) {
        return arr[left];
    }

    var mid = left + ((right - left) >> 1);
    mergeProcess(arr, left, mid);
    mergeProcess(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// 合并实现
function merge (arr, left, mid, right) {
    let help = [];
    let i = 0, p1 = left, p2 = mid + 1;
    while (p1 <= mid && p2 <= right) {
        help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
    }
    while (p1 <= mid) {
        help[i++] = arr[p1++];
    }
    while (p2 <= right) {
        help[i++] = arr[p2++];
    }
    for (let j = 0; j < help.length; j++) {
        arr[left + j] = help[j];
    }
}

let arr = [1, 2, 34, 5, 6, 7];
mergeSort(arr);
console.log('mergeSort arr->', arr);

function defaultSort (arr) {
    if (arr === null || arr.length < 2) return;

    let now = Date.now();
    arr.sort((a, b) => a - b);
    let duration = Date.now() - now;
    console.log('duration 02 -->', duration);

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

    argA(randomArr);
    argB(randomArrCopy);
    console.log('after randomArr -->', randomArr, ' randomArrCopy -->', randomArrCopy);
    return JSON.stringify(randomArr) === JSON.stringify(randomArrCopy) ? 'true' : 'error';
}

let res = compare(mergeSort, defaultSort, 10000, 10000);
console.log('compare res -->', res);