import { mockTasks } from './data.js'

console.log(mockTasks);

// 打折价格变化动画
function animation(duration, from, to, onProgress) {
    const dis = to - from
    const speed = dis / duration
    const startTime = Date.now()

    let value = from
    onProgress(value)


    function _run() {
        const now = Date.now()
        const time = now - startTime
        if (time >= duration) {
            value = to
            onProgress(value)
            return
        }

        const d = time * speed
        value = from + d
        console.log(value, '_run value');
        onProgress(value)

        requestAnimationFrame(_run)
    }

    requestAnimationFrame(_run)
}

// < !--并发执行任务 tasks: 任务数组 parallelCount: 并发任务数量-- >
function paralleTask(tasks, parallelCount = 2) {
    return new Promise((resolve) => {
        if (tasks.length === 0) {
            resolve()
            return
        }

        let nextIndex = 0
        let finishCount = 0
        function _run() {
            // < !--运行下一个任务 -->
            const task = tasks[nextIndex]
            nextIndex++
            task.then((res) => {
                console.log('task called', res);

                finishCount++
                if (nextIndex < tasks.length) {
                    // < !--继续执行下一个任务 -->
                    _run();
                } else if (finishCount === tasks.length) {
                    // <!--  任务完成 -->
                    resolve()
                }
            })
        }

        for (let i = 0; i < parallelCount && i < tasks.length; i++) {
            _run()
        }

    })
}

const tasks = mockTasks(10)
// console.log(tasks, 'tasks');
paralleTask(tasks, 4).then(() => {
    console.log('全部完成');
})