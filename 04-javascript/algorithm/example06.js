// 比较排序: 比较稳定排序和不稳定排序 时间复杂度
// 冒泡排序-稳定排序-时间复杂度O(N^2)
function bubbleSort (arr, compare) {
    if (arr === null || arr.length < 2) return;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (compare(arr[j], arr[j + 1])) {
                swap(arr, j, j + 1);
            }
        }
    }
}

// 插入排序-稳定排序-时间复杂度O(N^2)
function insertionSort (arr, compare) {
    if (arr === null || arr.length < 2) return;

    for (let i = 0; i < arr.length; i++) {
        let j = i;
        while (j > 0) {
            if (compare(arr[j - 1], arr[j])) {
                swap(arr, j - 1, j);
            }
            j--;
        }
    }
}

// 选择排序-不稳定排序-时间复杂度O(N^2)
function selectionSort (arr, compare) {
    if (arr === null || arr.length < 2) return;

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            minIndex = compare(arr[minIndex], arr[j]) ? j : minIndex;
        }
        swap(arr, i, minIndex);
    }
}
// 归并排序-稳定排序-时间复杂度O(N*logN)
function mergeSort (arr, compare) {
    if (arr === null || arr.length < 2) return;

    mergeProcess(arr, 0, arr.length - 1, compare);
}

// 合并过程递归实现
function mergeProcess (arr, left, right, compare) {
    if (arr[left] === arr[right]) {
        return arr[left];
    }

    let mid = left + ((right - left) >> 1);
    mergeProcess(arr, left, mid, compare);
    mergeProcess(arr, mid + 1, right, compare);
    merge(arr, left, mid, right, compare);
}

// 合并实现
function merge (arr, left, mid, right, compare) {
    let i = 0, p1 = left, p2 = mid + 1;
    let help = [];
    while (p1 <= mid && p2 <= right) {
        help[i++] = compare(arr[p1], arr[p2]) ? arr[p2++] : arr[p1++];
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

// 快速排序-不稳定排序-时间复杂度: O(N*logN)
function quickSort (arr, compare) {
    if (arr === null || arr.length < 2) return;

    quickSortFun(arr, 0, arr.length - 1, compare);
}

// 快速排序递归实现
function quickSortFun (arr, left, right, compare) {
    if (left < right) {
        // 将末尾的数据跟数组中的任意一个数据交换
        swap(arr, Math.floor(Math.random() * (right - left + 1)), right);
        // 得到基准值下标
        let partitionIndex = paration(arr, left, right, compare);
        // 左侧小于基准值区域
        quickSortFun(arr, left, partitionIndex - 1, compare);
        // 右侧大于等于基准值区域
        quickSortFun(arr, partitionIndex + 1, right, compare);
    }
}

// 分区操作
function paration (arr, left, right, compare) {
    let pivot = left, index = pivot + 1;

    // 将基准下标的值循环至最大值
    while (index <= right) {
        compare(arr[index], arr[pivot]) ? swap(arr, index++, pivot) : index++;
    }
    // 交换基准下标和最右侧的值,则最右侧为最大值
    swap(arr, pivot, index - 1);

    return index - 1;
}

// 堆排序-不稳定排序-时间复杂度O(N*logN)
function heapSort (arr, compare) {
    if (arr === null || arr.length < 2) return;

    let heapSize = arr.length;
    // 构造一个小根堆
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        heapify(arr, i, heapSize, compare);
    }
    swap(arr, 0, --heapSize);
    // 依次遍历堆中未排序的数据,并根据heapify操作排序
    while (heapSize > 0) {
        heapify(arr, 0, heapSize, compare);
        swap(arr, 0, --heapSize);
    }
}

// 堆上移操作
function heapInsert (arr, index) {
    if (arr === null || arr.length <= 0) return -1;

    while (arr[index] < arr[Math.floor((index - 1) / 2)]) {
        swap(arr, index, Math.floor((index - 1) / 2));
        index = Math.floor((index - 1) / 2);
    }
}

// 堆下移操作
function heapify (arr, index, heapSize, compare) {
    let left = index * 2 + 1; //左孩子节点下标
    // 判断左孩子未越界
    while (left < heapSize) {
        // 得到较大值的左孩子/右孩子下标
        let largest = (left + 1 < heapSize) && compare(arr[left + 1], arr[left]) ? left + 1 : left;
        // 得到父节点和较大值孩子节点中较大值的下标
        largest = compare(arr[largest], arr[index]) ? largest : index;
        if (largest === index) {
            break;
        }
        // 交换父子节点,并向下传递判断
        swap(arr, index, largest);
        index = largest;
        left = largest * 2 + 1;
    }
}

// 比较器
function compA (a, b) {
    return a.id > b.id;
}

// 交换数据
function swap (arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function randomString () {
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz";
    var a = t.length;
    var n = "";
    for (var i = 0; i < 4; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
    };
    return n;
}

let arr = [];
const MAX_VALUE = 10;
for (let i = 0; i < MAX_VALUE; i++) {
    arr.push({
        id: Math.floor(Math.random() * MAX_VALUE),
        name: randomString()
    });
}

let arrCopy = JSON.parse(JSON.stringify(arr));
console.log('arr before-->', arr);
arr.sort((a, b) => a.id - b.id);
console.log('default sort after -->', arr);
heapSort(arrCopy, compA);
console.log('heapSort arrCopy -->', arrCopy);
console.log('arr === arrCopy', JSON.stringify(arr) === JSON.stringify(arrCopy));