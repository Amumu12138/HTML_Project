// 桶排序、基数排序、计数排序(非比较排序)
// 计数排序
function countingSort (arr, maxValue) {
    if (arr === null || arr.length < 2) return;

    let sortIndex = 0, arrLen = arr.length, bucket = new Array(maxValue + 1), bucketLen = maxValue + 1;
    // 将arr数组中的数据一一放入bucket中
    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    // 依次将bucket中的数据倒入arr中
    for (let j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortIndex++] = j;
            bucket[j]--;
        }
    }
}

// 桶排序
function bucketSort (arr) {
    if (arr === null || arr.length < 2) return;

    bucketSortFun(arr, 0, arr.length - 1, maxbit(arr));
}

// 桶排序实现
function bucketSortFun (arr, left, right, digit) {
    const radix = 10;
    let bucket = [];
    let i = 0, j = 0;
    for (let d = 1; d <= digit; d++) {
        let count = [];
        // 默认计数次数都为0
        for (let k = 0; k < radix; k++) {
            count.push(0);
        }
        // 根据arr数组中的d位进行计数
        for (i = left; i <= right; i++) {
            j = getDigit(arr[i], d);
            count[j]++;
        }
        // 当前计数 += 前一个d位数字计数
        for (i = 1; i < radix; i++) {
            count[i] += count[i - 1];
        }
        // 将数据根据计数倒入桶中
        for (i = right; i >= left; i--) {
            j = getDigit(arr[i], d);
            bucket[count[j] - 1] = arr[i];
            count[j]--;
        }
        // 再将数据依次从桶中倒入arr中
        for (i = left, j = 0; i <= right; i++, j++) {
            arr[i] = bucket[j];
        }
    }
}

// 基数排序
function radixSort (arr) {
    if (arr === null || arr.length < 2) return;

    let counter = [], mod = 10, dev = 1;
    let maxDigit = maxbit(arr);
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        // 将arr中的数据依次倒入counter中
        for (let j = 0; j < arr.length; j++) {
            let bucket = parseInt((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }

        let pos = 0;
        // 将counter排序好的数据倒入arr中
        for (let k = 0; k < counter.length; k++) {
            let value = null;
            if (counter[k] != null) {
                while ((value = counter[k].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
}

// 获取num在d进位上数字
function getDigit (num, d) {
    let strNum = num.toString();
    return parseInt(strNum[strNum.length - d]) || 0;
}

// 获取arr数组中数据最大进位
function maxbit (arr) {
    if (arr === null) return -1;

    let max = Number.MIN_VALUE;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
    }

    return max.toString().length;
}

let arr = [];
let MAX_VALUE = 100;
for (let i = 0; i < MAX_VALUE; i++) {
    arr.push(Math.floor(Math.random() * MAX_VALUE));
}
console.log('arr -->', arr);
// // countingSort(arr, MAX_VALUE);
bucketSort(arr);
console.log('before arr -->', arr);
