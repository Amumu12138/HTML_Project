/**
 * 给定一个大小为 n 的整数数组，找出其中所有出现超过 n/3 次的元素。
示例 1：
输入：[3,2,3]
输出：[3]

示例 2：
输入：nums = [1]
输出：[1]

示例 3：
输入：[1,1,1,3,3,2,2,2]
输出：[1,2]
 */

function getMoreArr(arr) {
    if (!arr || arr.length < 0) return;

    const Len = arr.length;
    const moreNum = Len / 3;
    let newArr = [], obj = new Object();
    for (let i = 0; i < Len; i++) {
        if (obj.hasOwnProperty(arr[i].toString())) {
            obj[arr[i].toString()]++;
        } else {
            obj[arr[i].toString()] = 1;
        }
    }

    for (const o in obj) {
        if (obj[o] > moreNum) {
            newArr.push(parseInt(o));
        }
    }

    return newArr;
}

// const arr = [1, 1, 1, 3, 3, 2, 2, 2];
const arr = [3, 2, 3]
const newArr = getMoreArr(arr);
console.log('newArr -->', newArr);