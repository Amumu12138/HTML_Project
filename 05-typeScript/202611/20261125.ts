// interfaced 定义函数类型
interface RandomNumberGenerator {
    (min: number, max: number): number;
}

// 生成 [min, max] 范围内的随机整数
const getRandomIntCopy: RandomNumberGenerator = (min: number, max: number): number => {
    const lower = Math.ceil(Math.min(min, max));
    const upper = Math.floor(Math.max(min, max));
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

console.log(getRandomIntCopy(1, 10));

