// 快速排序实现
function quickSort (arr) {
    if (arr === null || arr.length < 2) return;

    quickSortFun(arr, 0, arr.length - 1);
}

// arr[left..right]排序实现
function quickSortFun (arr, left, right) {
    if (left < right) {
        // 随机在arr中取比较值arr[right]
        swap(arr, Math.floor(left + Math.random() * (right - left + 1)), right);
        let p = partition(arr, left, right);
        quickSortFun(arr, left, p[0] - 1);  // 小于区域排序
        quickSortFun(arr, p[1] + 1, right); // 大于区域排序
    }
}

/**
 * 处理arr[left...right]的函数
 * 默认以arr[right]作划分(分为<p, ==p, >p)
 * 返回等于区域(左边界、右边界),所以返回一个长度为2的数组res
 */
function partition (arr, left, right) {
    let less = left - 1; // 小于区域右边界
    let more = right;   // 大于区域左边界
    while (left < more) {
        // left表示当前数的位置,arr[right]为排序划分值
        if (arr[left] < arr[right]) {
            // 当前数 < 划分值
            swap(arr, ++less, left++);
        } else if (arr[left] > arr[right]) {
            // 当前数 > 划分值
            swap(arr, --more, left);
        } else {
            // 当前数 == 划分值
            left++;
        }
    }
    swap(arr, more, right);
    return [less + 1, more];
}

// 交换数据
function swap (arr, i, j) {
    if (arr === null || arr.length <= 0) return -1;

    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

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

let res = compare(quickSort, defaultSort, 10000, 10000);
console.log('compare res -->', res);

