// 节点
class Node {
    constructor (data) {
        this.data = data;
        this.next = null;
    }
}

// 单链表实现
class SingleList {
    // 构造函数
    constructor () {
        this.size = 0;                  // 单链表的长度
        this.head = new Node('head');   // 表头节点
        this.currNode = '';             // 当前节点的指向
    }

    // 在单链表中寻找item元素
    find (item) {
        let currNode = this.head;
        while (currNode && (currNode.data !== item)) {
            currNode = currNode.next;
        }

        return currNode;
    }

    // 向单链表中插入元素
    insert (item, element) {
        let itemNode = this.find(item);
        if (!itemNode) {
            return;
        }

        let newNode = new Node(element);
        newNode.next = itemNode.next;
        itemNode.next = newNode;
        this.size++;
    }

    // 在单链表中删除一个节点
    remove (item) {
        if (!this.find(item)) return;

        if (item === 'head') {
            if (!(this.isEmpty())) {
                return;
            } else {
                this.head.next = null;
                return;
            }
        }

        let currNode = this.head;
        while (currNode.next.data !== item) {
            // 企图删除不存在的节点
            if (!currNode.next) {
                return;
            }

            currNode = currNode.next;
        }

        currNode.next = currNode.next.next;
        this.size--;
    }

    // 在单链表的尾部添加元素
    append (element) {
        let currNode = this.findLast();
        let newNode = new Node(element);

        currNode.next = newNode;
        this.size++;
    }

    // 获取单链表的最后一个节点
    findLast () {
        let currNode = this.head;
        while (currNode.next) {
            currNode = currNode.next;
        }

        return currNode;
    }

    // 判断单链表是否为空
    isEmpty () {
        return this.size === 0;
    }

    // 显示当前节点
    show () {
        console.log(this.currNode.data);
    }

    // 获取单链表的长度
    getLength () {
        return this.size;
    }

    // 从当前节点向前移动n个位置
    advance (n, currNode) {
        this.currNode = currNode;

        while ((n--) && this.currNode.next) {
            this.currNode = this.currNode.next;
        }

        return this.currNode;
    }

    // 单链表的遍历显示
    display () {
        let result = '';
        let currNode = this.head;

        while (currNode) {
            result += currNode.data;
            currNode = currNode.next;
            if (currNode) {
                result += '->';
            }
        }
        console.log(result);
    }

    // 清空单链表
    clear () {
        this.head.next = null;
        this.size = 0;
    }
}

let myList = new SingleList();
let arr = [3, 4, 5, 6, 7, 8, 9];

console.log('arr -->', arr);
for (let i = 0; i < arr.length; i++) {
    myList.append(arr[i]);
}

myList.display();  // head->3->4->5->6->7->8->9