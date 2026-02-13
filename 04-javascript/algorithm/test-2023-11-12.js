/**
 * 100120. 找出强数对的最大异或值 I
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j])) {
                max = Math.max(max, nums[i] ^ nums[j]);
            }
        }
    }

    return max;
};

// const nums = [1, 2, 3, 4, 5];
// const nums = [10, 100];
// const nums = [5, 6, 25, 30];
// console.log(maximumStrongPairXor(nums));

/**
 * 100128. 高访问员工
 * @param {string[][]} access_times
 * @return {string[]}
 */
var findHighAccessEmployees = function (access_times) {
    const result = [], maxCount = 3, employeeMap = new Map();

    for (let i = 0; i < access_times.length; i++) {
        if (employeeMap.has(access_times[i][0])) {
            employeeMap.get(access_times[i][0]).push(access_times[i][1]);
        } else {
            employeeMap.set(access_times[i][0], [access_times[i][1]]);
        }
    }
    console.log(employeeMap);

    for (const employee of employeeMap) {
        console.log(employee);
        if (employee[1].length >= maxCount) {
            employee[1].sort((a, b) => a - b);
            console.log(employee[1]);
            for (let i = 0; i < employee[1].length - 2; i++) {
                if (employee[1][i + 2] - employee[1][i] < 100 && employee[1][i + 1] - employee[1][i] < 100) {
                    result.push(employee[0]);
                    break;
                }
            }
        }
    }

    return result;
};

// const access_times = [["a", "0549"], ["b", "0457"], ["a", "0532"], ["a", "0621"], ["b", "0540"]];
// const access_times = [["d", "0002"], ["c", "0808"], ["c", "0829"], ["e", "0215"], ["d", "1508"], ["d", "1444"], ["d", "1410"], ["c", "0809"]];
// const access_times = [["cd", "1025"], ["ab", "1025"], ["cd", "1046"], ["cd", "1055"], ["ab", "1124"], ["ab", "1120"]];
// console.log(findHighAccessEmployees(access_times));

