// 通过异或查找数组中的奇数项
function printOddTimesNum1 (arr) {
    var eor = 0;
    for (var i = 0; i < arr.length; i++) {
        eor ^= arr[i];
    }

    console.log('printOddTimesNum1 eor -->', eor);
}

var a = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4];
printOddTimesNum1(a);

// 通过异或查找数组中的两项奇数项
function printOddTimesNum2 (arr) {
    var eor = 0;
    var onlyOne = 0
    for (var i = 0; i < arr.length; i++) {
        eor ^= arr[i];
    }

    /**
     * eor = a ^ b 剩余两个奇数项的异或
     * eor != 0
     * eor必然有一个位置上是1
     */
    var rightOne = eor & (~eor + 1); //提取出最右的1
    for (var j = 0; j < arr.length; j++) {
        if ((arr[j] & rightOne) === 0) {
            onlyOne ^= arr[j];
        }
    }

    console.log('printOddTimesNum2 onlyOne -->', onlyOne, ' otherOne -->', eor ^ onlyOne);
}

var b = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
printOddTimesNum2(b);