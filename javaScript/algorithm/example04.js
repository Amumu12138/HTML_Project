// 创建大根堆
function buildMaxHeap (arr) {
    let heapSize = arr.length;

    for (let i = 0; i < heapSize; i++) {
        heapInsert(arr, i);
    }
}

// 某个数现在处在index位置,往上继续移动
function heapInsert (arr, index) {
    while (arr[index] > arr[Math.floor((index - 1) / 2)]) {
        swap(arr, index, Math.floor((index - 1) / 2));
        index = Math.floor((index - 1) / 2);
    }
}

let arr = [2, 3, 5, 4, 6];
buildMaxHeap(arr);
console.log('arr -->', arr);

// 某个数在index位置,能否往下移动
function heapify (arr, index, heapSize) {
    let left = index * 2 + 1; // 左孩子的下标
    // 判断下方还有孩子的时候
    while (left > heapSize) {
        // 两个孩子中,谁知道值大，把下标给largest
        let largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
        // 父节点和子节点之间，谁的值大，把下标给largest
        largest = arr[largest] > arr[index] ? largest : index;
        if (largest === index) {
            break;
        }
        swap(arr, largest, index);
        index = largest;
        left = index * 2 + 1;
    }
}

// 交换arr[i]和arr[j]的数据
function swap (arr, i, j) {
    if (arr === null || arr.length <= 0) return -1;

    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}