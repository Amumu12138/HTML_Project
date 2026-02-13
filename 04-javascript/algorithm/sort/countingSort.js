// 基数排序实现
function countingSort (arr) {
    if (arr === null || arr.length < 2) return;

    //算法展示(菜鸟课程): https://www.runoob.com/w3cnote/counting-sort.html
    let maxValue = getMaxValue(arr);
    let bucket = new Array(maxValue + 1), sortIndex = 0, arrLen = arr.length, bucketLen = maxValue + 1;

    // 根据arr数组中的数据，bucket的次数依次增加
    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    // 将排序好的数据从bucket中倒入arr中
    for (let j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortIndex++] = j;
            bucket[j]--;
        }
    }
}

// 获取当前数组中最大值
function getMaxValue (arr) {
    if (arr === null || arr.length <= 0) return;

    let max = Number.MIN_VALUE;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
    }

    return max;
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
        arr.push(Math.abs(Math.floor((maxValue + 1) * Math.random() - Math.floor(maxSize * Math.random()))));
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

let res = compare(countingSort, defaultSort, 10000, 10000);
console.log('compare res -->', res);