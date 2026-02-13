/**
 * 小和问题
 * 在一个数组中，每一个左边比当前数小的数累加起来，叫做这个数组的小和，求一个数组的小和
 * 例子: 数组[1,3,4,2,5] 1 左边比1小的数，没有; 3 左边比3小的数, 1; 4 左边比4小的数,1、3; 2左边比2小的数,* * 1;5左边比5小的数, 1、3、4、2; 所以小和为1+1+3+1+1+3+4+2 = 16
 */

// 1、暴力解法
function getMinSum (arr) {
    if (arr === null || arr.length <= 0) return 'error';

    let sum = 0;
    for (let i = 1; i <= arr.length - 1; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] > arr[j]) {
                sum += arr[j];
            }
        }
    }

    return sum;
}

let a = [1, 3, 4, 2, 5];
let sum01 = getMinSum(a);
console.log('sum01 -->', sum01);

// 实现小和问题(归并排序的衍生实现)
function getMergeSum (arr) {
    if (arr === null || arr.length <= 0) return 'error';

    return process(arr, 0, arr.length - 1);
}

// 递归实现 
function process (arr, left, right) {
    if (left === right) {
        return 0;
    }

    let mid = left + ((right - left) >> 1);
    return process(arr, left, mid) + process(arr, mid + 1, right) + merge(arr, left, mid, right);
}

// 归并
function merge (arr, left, mid, right) {
    let help = [];
    let i = 0; p1 = left, p2 = mid + 1;
    let sum = 0;
    while (p1 <= mid && p2 <= right) {
        sum += arr[p1] < arr[p2] ? (right - p2 + 1) * arr[p1] : 0;
        help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];

    }
    while (p1 <= mid) {
        help[i++] = arr[p1++];
    }
    while (p2 <= right) {
        help[i++] = arr[p2++];
    }
    for (let i = 0; i < help.length; i++) {
        arr[left + i] = help[i];
    }

    console.log('sum -->', sum);
    return sum;
}
let sum02 = getMergeSum(a);
console.log('sum02 -->', sum02, ' a-->', a);

/**
 * 逆序对问题
 * 在一个数组中，左边的数如果比右边的数大,则这两个数构成一个逆序对，请打印所有的逆序对
 * 例子: 数组[3,2,4,0,5] => (3,2) (3,0) (2,0) (4,0)
 */
// 暴力解法
function getReverseCount (arr) {
    if (arr === null || arr.length <= 1) return -1;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                console.log('reverseNums -->', arr[i] + ',' + arr[j]);
            }
        }
    }
}

let b = [3, 2, 4, 0, 5];
getReverseCount(b);

// 实现逆序对问题(归并排序的衍生实现)
function getMergeReverseCount (arr) {
    if (arr === null || arr.length <= 1) return -1;

    return reverseProcess(arr, 0, arr.length - 1);
}

function reverseProcess (arr, left, right) {
    if (left === right) {
        return 0;
    }

    let mid = left + ((right - left) >> 1);
    return reverseProcess(arr, left, mid) +
        reverseProcess(arr, mid + 1, right) +
        reverseMerge(arr, left, mid, right);
}

function reverseMerge (arr, left, mid, right) {
    let help = [];
    let i = 0, p1 = left; p2 = mid + 1;
    let count = 0;
    while (p1 <= mid && p2 <= right) {
        let temp1 = p1;
        // 打印逆序对
        while (arr[temp1] > arr[p2]) {
            count++;
            console.log('reverseMerge -->', arr[temp1++] + ',' + arr[p2]);
        }
        help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
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

    return count;
}

let count = getMergeReverseCount(b);
console.log('count -->', count, ' b-->', b);