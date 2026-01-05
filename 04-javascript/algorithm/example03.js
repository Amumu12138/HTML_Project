/**
 * 问题一
 * 给定一个数组arr和一个数num，请把小于等于num的数放在数组左边,大于num的数放在数组右边
 * 要求额外空间复杂度O(1),时间复杂度0(N)
 */
// 暴力解法(不符合额外空间复杂度)
function pushArrRule (arr, num) {
    if (arr === null || arr.length <= 0) return -1;

    let leftArr = [], rightArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= num) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    return leftArr.concat(rightArr);
}

let a = [2, 3, 6, 8, 5, 2, 3, 4, 9];
let copyA = JSON.parse(JSON.stringify(a));
let newArr = pushArrRule(a, 5);
console.log('newArr -->', newArr);

// 快排衍生实现
function quickArrRule (arr, num) {
    if (arr === null || arr.length <= 0) return -1;

    let i = 1, more = arr.length - 1;
    while (i < more) {
        // 小于等于num的数放在数组左边
        if (arr[i] <= num) {
            i++;
        } else {
            // 大于num的数放在数组右边
            swap(arr, i, --more);
        }
    }

    return arr;
}

// 交换数据
function swap (arr, i, j) {
    if (arr === null || arr.length <= 0) return -1;

    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

let newArr02 = quickArrRule(copyA, 5);
console.log('newArr02 -->', newArr02);


/**
 * 问题二(荷兰国旗问题)
 * 给定一个数组arr和一个数num,请把小于num的数放在数组左边,等于num的数放在数组中间，
 * 大于num的数放在数组的右边。要求额外空间复杂度O(1),时间复杂度O(N)
 */
// 暴力解法(不符合额外空间复杂度)
function heLanArrRule (arr, num) {
    if (arr === null || arr.length <= 0) return -1;

    let leftArr = [], midArr = [], rightArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < num) {
            leftArr.push(arr[i]);
        } else if (arr[i] === num) {
            midArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    return leftArr.concat(midArr, rightArr);
}

let b = [2, 3, 5, 8, 5, 2, 3, 5, 9];
let copyB = JSON.parse(JSON.stringify(b));
let heLanArr = heLanArrRule(b, 5);
console.log('heLanArr -->', heLanArr);

// 快排衍生实现
function quickHelLanArrRule (arr, num) {
    if (arr === null || arr.length <= 0) return -1;

    let left = -1, i = 0, right = arr.length;
    while (i < right) {
        // 小于num的数放在数组左边
        if (arr[i] < num) {
            swap(arr, ++left, i++);
        } else if (arr[i] > num) {
            // 大于num的数放在数组的右边
            swap(arr, --right, i);
        } else {
            // 等于num的数放在数组中间
            i++;
        }
    }

    return arr;
}

let heLanArr02 = quickHelLanArrRule(copyB, 5);
console.log('heLanArr02 -->', heLanArr02);
