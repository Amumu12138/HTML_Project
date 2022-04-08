var i = 128;
console.log(~i + 1); // 取补码

var j = i & (~i + 1); // 取i最右边的1
console.log(j);

var arr = [1, 2, 3, 4, 12, 8, 6, 7];
arr.sort((a, b) => b - a);  // 系统默认排序
console.log('arr ->', arr);
// 算法测试
const test = 'ABCabc';
console.log(test.toLocaleLowerCase());
console.log(test.indexOf('a'));

function computeRepeatCount(str, char) {
    if (str.length < 1 || str.length > 1000) return -1;

    let newArr = str.toLocaleLowerCase().split('').filter((item) => {
        return item === char.toLocaleLowerCase();
    })
    return newArr.length;
}
console.log(computeRepeatCount(test, 'A'));

function split8Bit(str) {
    if (!str) return;

    let newArr = [];
    let bit = '';
    for (let i = 0; i < str.length; i++) {
        // if (str[i] === ' ') break;
        if (bit.length < 8) {
            bit += str[i] !== ' ' && str[i];
        } else {
            newArr.push(bit);
            bit = str[i] !== ' ' && str[i];
        }
    }
    console.log(bit);

    if (bit.length < 8 && bit.length > 0) {
        const len = 8 - bit.length;
        for (let j = 0; j < len; j++) {
            bit += '0';
        }
    }
    newArr.push(bit);

    return newArr.toString();
}

let str = '232332323';
console.log('str -->', split8Bit(str));

// 接受一个十六进制的数，输出该数值的十进制表
function hexToDecimal(hexStr) {
    if (hexStr.indexOf('0x')) return -1;

    let newHexStr = hexStr.substring(2, hexStr.length);
    let sum = 0;
    for (let i = 0; i < newHexStr.length; i++) {
        sum += hexBitChange(newHexStr[i], newHexStr.length - 1 - i);
    }

    return sum;
}

function hexBitChange(char, index) {
    let sum = 0;
    switch (char.toLocaleLowerCase()) {
        case 'f':
            sum = 15;
            break;
        case 'e':
            sum = 14;
            break;
        case 'd':
            sum = 13;
            break;
        case 'c':
            sum = 12;
            break;
        case 'b':
            sum = 11;
            break;
        case 'a':
            sum = 10;
            break;
        default:
            sum = parseInt(char);
            break;
    }

    return sum * Math.pow(16, index);
}

const hexStr = '0xAA11';
console.log(hexToDecimal(hexStr));
console.log(parseInt(hexStr, 16) === hexToDecimal(hexStr));
// 输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如180的质因子为2 2 3 3 5 ）
function getPrimeFactors(num) {
    if (num < 1) return -1;
    if (num === 1) return 1;

    let i = 2, factorArr = [];
    while (num !== 1) {
        if (num % i === 0) {
            num = num / i;
            factorArr.push(i);
        } else {
            i = hasFactor(++i) ? i : ++i;
        }
    }
    return factorArr;
}

// 判断是否是质因子
function hasFactor(num) {
    if (!num || num < 2) return false;

    let i = 2, hasFlag = true;
    while (i < Math.floor(num / i)) {
        if (num % i === 0) hasFlag = false;
        i++;
    }

    return hasFlag;
}

const factors = getPrimeFactors(64577);
let factorStr = factors[0] || '';
for (let i = 1; i < factors.length; i++) {
    factorStr += ' ' + factors[i];
}
// 
function similarNumber(num) {
    if (isNaN(num)) return;

    return num - Math.floor(num) >= 0.5 ? Math.ceil(num) : Math.floor(num);
}
console.log(similarNumber(5.5));

let num = 123456;
console.log(num.toString().split('').reverse().join(''));

//所有单词之间用一个空格隔开，语句中除了英文字母外，不再包含其他字符
function wordToReverse(str) {
    if (!str) return '';

    let strArr = str.split(' ');
    let newStr = '';
    strArr.reverse().forEach(element => {
        newStr += element + ' ';
    });

    return newStr;
}

console.log(wordToReverse('I am a boy'));

// 给定 n 个字符串，请对 n 个字符串按照字典序排列
function stringToSort(arr) {
    if (arr === null || arr.length < 2) return;

    return arr.sort();
}

let strArr = ['cap', 'to', 'cat', 'card', 'two', 'top', 'up'];
console.log(strArr.shift());
let newArr = stringToSort(strArr);
newArr.forEach((item) => {
    console.log(item);
})
console.log(String.fromCharCode('y'.toLocaleLowerCase().charCodeAt() + 1));

// 单词倒排
function stringToReverseWord(str) {
    if (!str) return "";

    const char = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ';
    let strArr = str.split('');
    for (let i = 0; i < strArr.length; i++) {
        if (char.indexOf(strArr[i]) === -1) {
            strArr[i] = ' ';
        }
    }
    let newStrArr = strArr.join('').split(' ')

    for (let j = 0; j < newStrArr.length; j++) {
        if (newStrArr[j] === '') newStrArr.splice(j, 1);
        newStrArr[j].split('').reverse().join('');
    }

    return newStrArr.reverse().join(' ');
}

let str02 = '$bo*y gi!r#l';
console.log(stringToReverseWord(str02));
// 使用字符"A"到"Z"、"a"到"z"、"0"到"9"表示
function strSort(str) {
    if (!str) return;

    const numberChar = '0123456789';
    const smallChar = 'abcdefghijklmnopqrtsuvwxyz';
    const bigChar = 'ABCDEFGHIJKLMNOPQRTSUVWXYZ';
    let numArr = [], smallCharArr = [], bigCharArr = [];
    let strArr = str.split('');
    for (let i = 0; i < strArr.length; i++) {
        if (numberChar.indexOf(str[i]) !== -1) numArr.push(str[i]);
        if (smallChar.indexOf(str[i]) !== -1) smallCharArr.push(str[i]);
        if (bigChar.indexOf(str[i]) !== -1) bigCharArr.push(str[i]);
    }
    numArr.sort();
    smallCharArr.sort();
    bigCharArr.sort();

    console.log(numArr.concat(smallCharArr));
    return numArr.concat(bigCharArr, smallCharArr).join('')
}

let str03 = 'Ihave1nose2hands10fingers';
console.log(strSort(str03));

// 蛇形矩阵
function setSnakeReact(n) {
    if (n <= 0) return [];

    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i].push([]);
        for (let j = 0; j < n; j++) {
            if (i === 0) {
                j === 0 && (arr[0][0] = 1);
                arr[0][j + 1] = arr[0][j] + j + 1;
            } else if (j === 0) {
                arr[i + 1][0] = arr[i][0] + i + 1;
            } else {
                arr[i][j + 1] = arr[i][j] + i + j + 2;
            }
        }
    }

    return arr;
}

let n = 4;
// console.log(setSnakeReact(n));

// 统计字符
function getCharCount(str) {
    const letters = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ';
    const number = '0123456789';
    let obj = {}, letterCount = 0, numberCount = 0, spaceCount = 0, otherCount = 0;
    for (let i = 0; i < str.length; i++) {
        if (letters.indexOf(str[i]) !== -1) {
            letterCount++;
        } else if (number.indexOf(str[i]) !== -1) {
            numberCount++;
        } else if (str[i] === ' ') {
            spaceCount++;
        } else {
            otherCount++;
        }
    }
    obj = {
        letters: letterCount,
        number: numberCount,
        space: spaceCount,
        other: otherCount
    }

    return obj;
}

const str04 = '1qazxsw23 edcvfr45tgbn hy67uj m,ki89ol.\\/;p0-=\\][';
let obj = getCharCount(str04);
console.log(obj);
for (const key in obj) {
    console.log(obj[key]);
}
// 统计每个月兔子的总数
function recursionFun(n) {
    if (n === 1 || n === 2) {
        return 1;
    }

    return recursionFun(n - 1) + recursionFun(n - 2);
}

console.log(recursionFun(8));

