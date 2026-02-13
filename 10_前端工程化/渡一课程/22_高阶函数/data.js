export const mockTasks = (num) => {
    const promises = []
    for (let i = 0; i < num; i++) {
        const p = new Promise((resolve) => {
            console.log(`任务${i + 1} 开始`);

            setTimeout(() => {
                console.log(`setTimeout callled ${i + 1}`);

                resolve(`任务${i + 1} 结束`)
            }, Math.random() * 1000)
        })
        // p.then((res) => {
        //     console.log(res);
        // })
        // console.log('p');

        promises.push(p)
    }
    return promises
}