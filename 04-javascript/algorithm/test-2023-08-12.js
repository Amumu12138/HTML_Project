/**
 * 23. 合并 K 个升序链表
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const len = lists.length, newList = null;

    for (let i = 0; i < len; i++) {
        newList = mergeList(newList, lists[i]);
    }

    return newList;
};

// 合并两个链表
const mergeList = (head1, head2) => {
    const dummyHead = new ListNode(-1, null);
    let curNode = dummyHead;
    while (head1 && head2) {
        if (head1.value <= head2.value) {
            curNode.next = head1;
            head1 = head1.next;
        } else {
            curNode.next = head2;
            head2 = head2.next;
        }

        curNode = curNode.next;
    }

    curNode.next = head1 ? head1 : head2;

    return dummyNode.next;
}

const lists = [[1, 4, 5], [1, 3, 4], [2, 6]];
console.log(mergeKList(lists));