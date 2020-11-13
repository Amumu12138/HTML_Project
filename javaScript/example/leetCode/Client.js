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

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
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

         //反转
        for(var i = 0; i < arr.length; i++) {
            sum = sum * 10 + arr[i];
        }
    } else {
        while(x < 0) {
            mod = x % 10;
            x = Math.ceil(x / 10);
            arr.push(mod);
        }

        //反转
        for(var i = 0; i < arr.length; i++) {
            sum = sum * 10 + arr[i];
        }
    }
   
    if(sum > max || sum < min) return 0 ;
    return sum;
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}