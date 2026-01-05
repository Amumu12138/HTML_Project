/**
 * 1423. 可获得的最大点数
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
    // 滑动窗口,滑动窗口大小为 n-k
    let n = cardPoints.length, windowSize = n - k;
    let sum = 0;
    // 选前 n-k 个作为初始值
    for (let i = 0; i < windowSize; i++) {
        sum += cardPoints[i];
    }

    let minSum = sum;
    for (let i = windowSize; i < n; i++) {
        // // 滑动窗口每向右移动一格，增加从右侧进入窗口的元素值，并减少从左侧离开窗口的元素值
        sum += cardPoints[i] - cardPoints[i - windowSize];
        minSum = Math.min(minSum, sum);
    }

    return cardPoints.reduce((x, y) => x + y) - minSum;
};

const cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3;
console.log(maxScore(cardPoints, k));