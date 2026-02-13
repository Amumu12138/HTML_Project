// 桶排序实现
function radixSort (arr) {
    if (arr === null || arr.length < 2) return;

    //算法展示(菜鸟课程): https://www.runoob.com/w3cnote/bucket-sort.html 
    radixSortFun(arr, 0, arr.length - 1, maxbit(arr));
}

// 最大进位
function maxbit (arr) {
    if (arr === null) return -1;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i])
    }
    return max.toString().length;
}

// 获取x在d进位上的数字(321->个位:1,十位:2,百位:3)
function getDigit (x, d) {
    return (Math.floor((x / Math.pow(10, d - 1))) % 10);
}

// 桶排序实现
function radixSortFun (arr, left, right, digit) {
    const radix = 10;
    let i = 0, j = 0;
    // 有多少个数准备多少个辅助空间
    let bucket = [];

    // 有多少位就进出几次
    for (let d = 1; d <= digit; d++) {
        /**
         * count[0]: 当前位(d位)是0的数字有多少个
         * count[1]: 当前位(d位)是(0和1)的数字有多少个
         * count[2]: 当前位(d位)是(0,1,2)的数字有多少个
         * count[i]: 当前位(d位)是(0~i)的数字有多少个
         */
        let count = [];
        // 生成0~radix-1的radix个桶
        for (let k = 0; k < radix; k++) {
            count.push(0);
        }
        // 计算当前相同位数字有多少个
        for (i = left; i <= right; i++) {
            j = getDigit(arr[i], d);
            count[j]++;
        }
        // 获取当前位(d位)是(0~i)的数字有多少个
        for (i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1];
        }
        // 从右至左将数字依次放入对应的桶中
        for (i = right; i >= left; i--) {
            j = getDigit(arr[i], d);
            bucket[count[j] - 1] = arr[i];
            count[j]--;
        }
        // 将当前排序好的桶中数字倒入数组中
        for (i = left, j = 0; i <= right; i++, j++) {
            arr[i] = bucket[j]
        }
    }
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

let res = compare(radixSort, defaultSort, 100, 100);
console.log('compare res -->', res);
