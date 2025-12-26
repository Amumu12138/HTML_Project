// 防抖
function debounce(func, wait = 500, immediate = false) {
    let timer = null

    return function () {
        if (immediate) {
            func(arguments);
            immediate = false;
            return;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            func(arguments)
        }, wait)
    }
}

const debounceFn = debounce(function () {
    console.log('debounce');
}, 500, true)
debounceFn()
debounceFn()
debounceFn()
debounceFn()

// 节流
function throttle(func, wait = 500, immediate = false) {
    let timer = null;
    return function () {
        const args = arguments;

        if (immediate) {
            func(arguments);
            immediate = false;
            return;
        }

        if (timer) return;
        timer = setTimeout(function () {
            func.call(this, args);
            clearTimeout(timer);
        }, wait)
    }
}

const throttleFn = throttle(function () {
    console.log('throttle');
}, 500, true)
throttleFn();
throttleFn();
throttleFn();
throttleFn();
