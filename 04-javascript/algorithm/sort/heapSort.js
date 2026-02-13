// 堆排序实现
function heapSort (arr) {
    if (arr === null || arr.length < 2) return;

    //算法展示(菜鸟课程):https://www.runoob.com/w3cnote/heap-sort.html  
    let heapSize = arr.length;
    // for (let i = 0; i < arr.length; i++) { // O(N)
    //     heapInsert(arr, i); // O(logN)
    // }
    // 算法优化
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) { // O(N/2)
        heapify(arr, i, heapSize);// O(logN)
    }

    swap(arr, 0, --heapSize);
    while (heapSize > 0) { // 时间复杂度: O(N)
        heapify(arr, 0, heapSize); // O(logN)
        // 将排序好的大根堆第一个数据与最后一个数据交换
        swap(arr, 0, --heapSize); // O(1)
    }
}

// 堆插入
function heapInsert (arr, index) {
    if (arr === null) return;

    // 遍历形成大根堆
    while (arr[index] > arr[Math.floor((index - 1) / 2)]) {
        swap(arr, Math.floor((index - 1) / 2), index);
        index = Math.floor((index - 1) / 2);
    }
}

// 堆调整
function heapify (arr, index, heapSize) {
    if (arr === null || arr.length <= 0) return;

    let left = index * 2 + 1;   //左孩子节点下标
    // 判断下方还有孩子
    while (left < heapSize) {
        // 比较左节点和右节点值大小,获取较大值的下标
        let largest = (left + 1) < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
        // 比较孩子较大值和父节点比较，获取较大值的下标
        largest = arr[largest] > arr[index] ? largest : index;
        // 如果父节点较大，则跳出循环
        if (largest === index) {
            break;
        }
        // 否则,交换父子节点数据,index变为子节点下标,left变为子节点的左孩子
        swap(arr, largest, index);
        index = largest;
        left = index * 2 + 1;
    }

}

// 交换arr[i]和arr[j]的数据
function swap (arr, i, j) {
    if (arr == null || arr.length <= 0) return;

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
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

let res = compare(heapSort, defaultSort, 10000, 10000);
console.log('compare res -->', res);