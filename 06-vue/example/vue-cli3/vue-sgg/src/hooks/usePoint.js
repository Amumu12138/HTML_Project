import { reactive, onMounted, onBeforeUnmount } from 'vue';

function savePoint() {
    let point = reactive({
        x: 0, y: 0
    })
    // 实现鼠标‘打点’相关的方法
    function savePoint(event) {
        point.x = event.pageX;
        point.y = event.pageY;
        console.log('Amumu point -->', point)
    }

    onMounted(() => {
        window.addEventListener('click', savePoint);
    })

    onBeforeUnmount(() => {
        window.removeEventListener('click', savePoint)
    })


    return point;
}

export default savePoint;