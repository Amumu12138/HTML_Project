// 斐波那契数列实现
const f = n => {
    if (n === 1 || n === 0) {
        return 1;
    }

    return f(n - 1) + f(n - 2)
}

console.log(f(4));
// 青蛙跳台阶问题跟斐波那契数列思路一致

// https://leetcode.cn/problems/unique-paths/description/
// 不同路径问题
