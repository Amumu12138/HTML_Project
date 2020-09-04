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
function ListNode(val) {
    this.val = val;
    this.next = null;

}
/**
 * @param {ListNode} l1 
 * @param {ListNode} l2 
 * @return {ListNode}
 */
Example.addTwoNumbers = function (l1, l2) {
    var root = new ListNode(0);
    var cursor = root;
    var carry = 0;
 

    while (l1 != null || l2 != null || carry != 0) {
        var l1Val = l1 != null ? l1.val : 0;
        var l2Val = l2 != null ? l2.val : 0;
        var sumVal = l1Val + l2Val + carry;
        carry = sumVal / 10;

        sumNode = new ListNode(sumVal % 10);
        cursor.next = sumNode;
        cursor = sumNode;

        if (l1 != null) l1 = l1.next;
        if (l2 != null) l2 = l2.next;
    }

    return root.next;
}



if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}