// 创建大根堆
function buildMaxHeap (arr) {
    let heapSize = arr.length;

    // for (let i = 0; i < heapSize; i++) {
    //     heapInsert(arr, i);
    // }
    // 算法优化
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        heapify(arr, i, heapSize);
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
    while (left < heapSize) {
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

// 小根堆实现
class MinHeap {
    // 构造函数
    constructor () {
        this.heap = [];
    }
    // 数据交换
    swap (i1, i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    // 获取左孩子下标
    getLeftIndex (index) {
        return index * 2 + 1;
    }
    // 获取右孩子下标
    getRightIndex (index) {
        return index * 2 + 2;
    }
    // 获取父节点下标
    getParentIndex (index) {
        return (index - 1) >> 1;
    }
    // 上移操作
    _shiftUp (index) {
        if (index === 0) return;
        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this._shiftUp(parentIndex);
        }
    }
    // 下移操作
    _shiftDown (index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if (this.heap[leftIndex] < this.heap[index]) {
            this.swap(index, leftIndex);
            this._shiftDown(leftIndex);
        }
        if (this.heap[rightIndex] < this.heap[index]) {
            this.swap(index, rightIndex);
            this._shiftDown(rightIndex);
        }
    }
    //  插入元素
    insert (value) {
        this.heap.push(value);
        this._shiftUp(this.heap.length - 1);
    }
    // 删除最后一个元素
    pop () {
        let first = this.heap[0]
        this.heap[0] = this.heap.pop();
        this._shiftDown(0);
        return first;
    }
    // 获取第一个元素
    get peek () {
        return this.heap[0];
    }
    // 获取长度
    get size () {
        return this.heap?.length;
    }
}

// const h = new MinHeap();
// h.insert(7);
// h.insert(10);
// h.insert(8);
// h.insert(1);
// console.log('heap before -->', h);
// h.pop();
// console.log('heap after -->', h);
// h.insert(2);
// console.log('heap 03 -->', h);

/**
 * 堆排序扩展题目
 * 已知一个几乎有序的数组,几乎有序是指，如果把数组排好序的话，每个元素移动的距离可以
 * 不超k,并且相对于数组来说比较小。请选择一个合适的排序算法针对这个数据进行排序
 */
function sortedArrDistanceLessK (arr, k) {
    // 创建小根堆
    let minHeap = new MinHeap();
    let index = 0;
    for (; index < Math.min(arr.length, k); index++) {
        minHeap.insert(arr[index]);
    }
    console.log('minHeap -->', minHeap);
    let i = 0;
    for (; index < arr.length; i++, index++) {
        minHeap.insert(arr[index]);
        arr[i] = minHeap.pop();
        console.log('minHeap 111-->', minHeap);
        console.log('arr[i] 111-->', arr[i]);
    }
    console.log('minHeap 02-->', minHeap);
    while (!minHeap.size) {
        arr[i++] = minHeap.pop();
    }
}

let testArr = [1, 2, 7, 12, 8, 9, 6];
sortedArrDistanceLessK(testArr, 3);
console.log('testArr -->', testArr);
