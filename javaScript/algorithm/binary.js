// 实现二分查找,在一个有序数组中，找出某个数是否存在
function binarySearch (arr, target) {
    if (arr === null || arr.length <= 0) return -1;
    if (arr.length === 1) return 0;

    let start = 0, end = arr.length - 1;
    while (start <= end) {
        // 取中位数，如果除不尽则向下取整
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] > target) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return -1;
}

var a = [1, 2, 3, 4, 5, 6, 7];
var middleIndex = binarySearch(a, 4);
console.log('binarySearch middleIndex -->', middleIndex);

// 在一个有序数组中，找出>=某个数最左侧的位置
function binarySearchLeft (arr, num) {
    if (arr === null || arr.length <= 0) return -1;
    if (arr.length === 1) return 0;

    let start = 0, end = arr.length - 1;
    let mid = -1;
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        // 中位数大于等于num,下标左移
        if (arr[mid] >= num) {
            end = mid - 1;
        } else {
            // 中位数小于num,下标右移
            start = mid + 1;
        }
    }

    return start > arr.length - 1 ? -1 : start;
}

var b = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5];
var midIndex = binarySearchLeft(b, 4);
console.log('binarySearchLeft midIndex -->', midIndex);


// 局部最小值问题(在一个无序数组中[相邻数一定不相等]，左侧的值和右侧的值都大于中间的值,求该值的索引)
function areaMinNum (arr) {
    if (arr === null || arr.length <= 0) return -1;
    if (arr[1] > arr[0]) return 0;
    if (arr[arr.length - 1] < arr[arr.length - 2]) return arr.length - 1;

    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] > arr[mid - 1]) {
            end = mid - 1;
        } else if (arr[mid] > arr[mid + 1]) {
            start = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;
}

var c = [7, 4, 5, 6, 1, 4, 5, 3, 4];
var minIndex = areaMinNum(c);
console.log('areaMinNum minIndex -->', minIndex);