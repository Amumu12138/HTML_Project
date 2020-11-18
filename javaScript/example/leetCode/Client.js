//LeetCode实训项目
var Example = Example || {};
/**
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，
 * 并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
 */
function ListNode(val, node) {
    this.val = val;
    this.next = node;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
Example.addTwoNumbers = function (l1, l2) {
    if (l1 == null || l2 == null) {
        if (l1 != null) {
            return l1;
        }
        if (l2 != null) {
            return l2;
        }
        return null;
    } else {
        var sum = l1.val + l2.val;
        var carryBit = Math.floor(sum / 10);
        var result = new ListNode(sum % 10);
        var listNode = result;
        while (l1.next != null || l2.next != null) {
            if (l1.next == null) {
                l1.next = new ListNode(0, null);
            }
            if (l2.next == null) {
                l2.next = new ListNode(0, null);
            }

            l1 = l1.next;
            l2 = l2.next;

            sum = l1.val + l2.val + carryBit;
            listNode.next = new ListNode(sum % 10, null);
            carryBit = Math.floor(sum / 10);
            listNode = listNode.next;
        }

        if (carryBit == 1) {
            listNode.next = new ListNode(carryBit, null);
        }

        return result;
    }
};

/**给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。 
 * 示例：
 * 输入 "abcabcbb"
 * 输出 3
 */
/**
 * @param {string} str
 * @return {number}
 */
Example.lengthOfLongestSubstring = function (s) {
    if (s.length <= 0 || typeof (s) !== "string") return 0;

    let arr = [],
        max = 0;
    for (let i = 0; i < s.length; i++) {
        let index = arr.indexOf(s[i]);
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        arr.push(s.charAt(i));
        max = Math.max(arr.length, max);
    }
    return max;
}

/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
示例 1:
输入: 123
输出: 321

示例 2:
输入: -123
输出: -321

示例 3:
输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 */
Example.reverse = function (x) {
    var max = Math.pow(2, 31) - 1;
    var min = -Math.pow(2, 31);

    var mod = 0;
    var sum = 0;
    var arr = new Array();

    //取模存放到数组arr中
    if(x > 0) {
        while(x > 0) {
            mod = x % 10;
            x = Math.floor(x / 10);
            arr.push(mod);
        } 
    } else {
        while(x < 0) {
            mod = x % 10;
            x = Math.ceil(x / 10);
            arr.push(mod);
        }
    }

     //反转
    for(var i = 0; i < arr.length; i++) {
        sum = sum * 10 + arr[i];
    }
   
    if(sum > max || sum < min) return 0 ;
    return sum;
}

/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
示例 1:
输入: 121
输出: true

示例 2:
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

示例 3:
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
 * @param {*} x 
 */
Example.isPalindrome = function(x) {
    var origin = x, mod = 0, sum = 0;
    var arr = new Array();

    if(x < 0) {
        return false;
    } else {
        while(x > 0) {
            mod = x % 10;
            x = Math.floor(x / 10);
            arr.push(mod);
        }

        for(var i = 0; i < arr.length; i++) {
            sum = sum * 10 + arr[i];
        }

        if(sum == origin) return true;
    }

    return false;
}

/**
 * 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

示例 1:
输入: "III"
输出: 3

示例 2:
输入: "IV"
输出: 4

示例 3:
输入: "IX"
输出: 9

示例 4:
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.

示例 5:
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
 
提示：
题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。
IC 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。
关于罗马数字的详尽书写规则，可以参考 罗马数字 - Mathematics 。
 * @param {*} s 
 */
Example.romanToInt = function(s) {

}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}