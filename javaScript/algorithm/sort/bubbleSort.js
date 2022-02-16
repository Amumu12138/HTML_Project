// 冒泡排序实现
function bubbleSort (arr) {
    if (arr === null || arr.length < 2) return;

    // 算法展示(菜鸟课程): https://www.runoob.com/w3cnote/bubble-sort.html
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}

// 交换arr[i]和arr[j]的数据
function swap (arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

var a = [7, 6, 5, 4, 3, 2, 1];
bubbleSort(a);

console.log('bubbleSort a -->', a);

// 生成随机最大数量maxSize且最大值不超过maxValue的数组
function getRandomArray (maxSize, maxValue) {
    let arr = [];
    let radomSize = Math.floor(Math.random() * (maxSize + 1));
    for (let i = 0; i < radomSize; i++) {
        arr.push(Math.floor((maxValue + 1) * Math.random() - Math.floor(maxSize * Math.random())));
    }

    return arr;
}

// 对数器实现
var maxSize = 100, maxValue = 100;
var randomArr = getRandomArray(maxSize, maxValue);
var randomArrCopy = JSON.parse(JSON.stringify(randomArr));
console.log('randomArr -->', randomArr, ' randomArrCopy -->', randomArrCopy);

randomArr.sort((a, b) => a - b);
console.log('randomArr.sort -->', randomArr);

bubbleSort(randomArrCopy);
console.log('bubbleSort  -->', randomArrCopy);

console.log('randomArr === randomArrCopy -->', randomArr.toString() === randomArrCopy.toString());
console.log('randomArr === randomArrCopy 02-->', JSON.stringify(randomArr) === JSON.stringify(randomArrCopy));