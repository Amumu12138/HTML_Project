<template>
    <div class="event-root">
        <top-com></top-com>
        <!-- 阻止默认事件 (.prevent) -->
        <a
            href="http://www.atguigu.com"
            target="_blank"
            @click.prevent="showInfo"
            >阻止默认事件
        </a>
        <!-- 阻止事件冒泡 (.stop) -->
        <div class="demo1" @click="showInfo">
            <button @click.stop="showInfo">阻止事件冒泡</button>
        </div>
        <!-- 事件只触发一次(.once) -->
        <button @click.once="showInfo">点我只触发一次</button>
        <!-- 使用事件的捕获模式(.capture) -->
        <div class="box1" @click.capture="showMsg(1)">
            div1
            <div class="box2" @click="showMsg(2)">div2</div>
        </div>
        <!-- 只有event.target是当前操作的元素时才触发事件 -->
        <div class="demo1" @click.self="showInfo">
            <button @click="showInfo">.self触发</button>
        </div>
        <!-- 事件的默认行为立即执行,无需等待事件回调执行完毕(.passive) -->
        <ul class="list" @wheel.passive="wheel" @scroll="scroll">
            <!-- wheel: 监听鼠标滚轮行为 scroll: 监听页面滑动事件 -->
            <li>2</li>
            <li>1</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'event',
    methods: {
        showInfo(event) {
            console.log('event -->', event);
            alert('显示信息');
        },
        showMsg(value) {
            alert(value);
        },
        wheel() {
            for (let i = 0; i < 1000000; i++) {
                console.log('wheel called');
            }
        },
        scroll() {
            console.log('scroll called');
        },
    },
};
</script>

<style lang="less" scoped>
.event-root {
    .demo1 {
        background: red;
    }
    .box1 {
        width: 100%;
        height: 50px;
        background: firebrick;
    }
    .box2 {
        width: 100%;
        height: 20px;
        background: yellow;
    }
    .list {
        width: 100px;
        height: 100px;
        overflow: hidden auto;
        background: skyblue;
        li {
            width: 100px;
            height: 50px;
            background: salmon;
        }
    }
}
</style>
