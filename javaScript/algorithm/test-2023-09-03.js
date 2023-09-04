/**
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */
var eliminateMaximum = function (dist, speed) {
    let steps = [];
    for (let i = 0; i < dist.length; i++) {
        steps.push(Math.ceil(dist[i] / speed[i]));
    }
    // 按距离城市步数最近排序
    steps.sort((a, b) => a - b);

    // 贪心策略: 消灭目前距离城市步数最近的怪兽
    for (let i = 0; i < steps.length; i++) {
        if (steps[i] <= i) {
            return i;
        }
    }

    return steps.length;
};

// const dist = [1, 3, 4], speed = [1, 1, 1];
// cosnt dist = [1, 1, 2, 3], speed = [1, 1, 1, 1];
// const dist = [3, 2, 4], speed = [5, 3, 2];
// const dist = [4, 2, 3], speed = [2, 1, 1];
const dist = [46, 33, 44, 42, 46, 36, 7, 36, 31, 47, 38, 42, 43, 48, 48, 25, 28, 44, 49, 47, 29, 32, 30, 6, 42, 9, 39, 48, 22, 26, 50, 34, 40, 22, 10, 45, 7, 43, 24, 18, 40, 44, 17, 39, 36],
    speed = [1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 3, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 8, 1, 1, 1, 3, 6, 1, 3, 1, 1];
console.log(eliminateMaximum(dist, speed));

/**
 * 7020. 统计对称整数的数目
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countSymmetricIntegers = function (low, high) {
    let count = 0;

    for (let i = low; i <= high; i++) {
        let numArr = i.toString().split("");
        let left = 0, right = numArr.length - 1, leftSum = 0, rightSum = 0;
        while (numArr.length % 2 === 0 && left < right) {
            leftSum += parseInt(numArr[left]);
            rightSum += parseInt(numArr[right]);
            left++;
            right--;
        }

        if (leftSum > 0 && leftSum === rightSum) {
            count++;
        }
    }

    return count;
};

// const low = 1, high = 100;
// const low = 1200, high = 1230;
// console.log(countSymmetricIntegers(low, high));

/**
 * 8040. 生成特殊数字的最少操作
 * @param {string} num
 * @return {number}
 */
var minimumOperations = function (num) {
    let minCount = Number.MAX_SAFE_INTEGER, size = num.length;
    let lastZeroIndex = num.lastIndexOf("0"), startZeroIndex = lastZeroIndex - 1;
    while (startZeroIndex >= 0) {
        if (["5", "0"].includes(num[startZeroIndex])) {
            break;
        }
        startZeroIndex--;
    }
    let zeroCount = size - startZeroIndex - 2;

    let lastFiveIndex = num.lastIndexOf("5"), startFiveIndex = lastFiveIndex - 1;
    while (startFiveIndex >= 0) {
        if (["2", "7"].includes(num[startFiveIndex])) {
            break;
        }
        startFiveIndex--;
    }
    let fiveCount = startFiveIndex < 0 ? size : size - startFiveIndex - 2;

    console.log(zeroCount, fiveCount);

    // 贪心策略:取删除字符最小
    minCount = Math.min(zeroCount, fiveCount);
    return minCount;
};

// const num = "1";
// console.log(minimumOperations(num));

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var minOperationsQueries = function (n, edges, queries) {
    const nodes = createTree(n, edges)
    const root = nodes[0]
    setWeights(root, createWeight())

    const ans = []
    for (let [u, v] of queries) {
        const parent = findLCA(nodes[u], nodes[v])
        const wu = sub(nodes[u].weights, parent.weights)
        const wv = sub(nodes[v].weights, parent.weights)
        const wuv = add(wu, wv)
        const max = Math.max(...wuv)
        ans.push(sum(wuv) - max)
    }
    return ans

    function setWeights(root, weights) {
        root.weights = [...weights]
        for (let [child, weight] of root.children) {
            weights[weight]++
            setWeights(child, weights)
            weights[weight]--
        }
    }
    function findLCA(u, v) {
        const minLevel = Math.min(u.level, v.level)
        while (u.level > minLevel) u = u.parent
        while (v.level > minLevel) v = v.parent
        while (u !== v) {
            u = u.parent
            v = v.parent
        }
        return u
    }
};

function sum(l) {
    let ans = 0
    for (let i = 1; i <= 26; i++) ans += l[i]
    return ans
}
function sub(l, r) {
    let ans = [...l]
    for (let i = 1; i <= 26; i++) ans[i] -= r[i]
    return ans
}
function add(l, r) {
    let ans = [...l]
    for (let i = 1; i <= 26; i++) ans[i] += r[i]
    return ans
}
function createWeight() {
    return Array(27).fill(0)
}
function createTree(N, edges) {
    const nodes = Array(N).fill(0).map((x, i) => ({ i, children: new Map() }))
    const G = Array(N).fill(0).map(x => new Map())
    for (const [u, v, w] of edges) {
        G[u].set(v, w)
        G[v].set(u, w)
    }
    const root = nodes[0]
    root.level = 0

    const added = new Set([root])
    for (const node of added) {
        for (const [j, w] of G[node.i]) {
            if (!added.has(nodes[j])) {
                node.children.set(nodes[j], w)
                nodes[j].parent = node
                nodes[j].level = node.level + 1
                added.add(nodes[j])
            }
        }
    }
    return nodes
}