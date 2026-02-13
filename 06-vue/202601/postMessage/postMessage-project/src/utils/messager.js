/**
 * @name: 父级窗口搭建页面与H5预览页面跨源通信函数
 * @param {Window} win  要接收消息的目标窗口
 * @param {String} targetOrigin  指定win中可以接收到消息的origin
 */
export class Messager {
    // 构造实例函数
    constructor(targetOrigin) {
        this.targetOrigin = targetOrigin
        this.actions = {}
        // 监听传送数据的实例函数
        this.messageListener = (event) => {
            // 判断接收的消息是否是指定的域发送、是否有监听指定的事件，符合则执行监听事件
            const type = event.data && event.data.type
            if (event.origin === this.targetOrigin && type && this.actions[type]) {
                this.actions[type](event.data.value)
            }
        }
        window.addEventListener('message', this.messageListener)
    }
    /**
     * @name: 设置指定名称的消息监听
     * @param {String} type  监听的消息名称
     * @param {Function} cb  监听执行的回调函数
     */
    on(type, cb) {
        this.actions[type] = cb
        return this
    }
    /**
     * @name: 发送指定名称的消息
     * @param {String} type   发送的消息名称
     * @param {Object} value  发送的数据
     */
    emit(type, value) {
        var win = document.getElementById('previewIframe').contentWindow
        win.postMessage(
            {
                type,
                value
            },
            this.targetOrigin
        )
        console.log(win, this.targetOrigin, 'win');

        return this
    }
    // 移除消息的监听
    destroy() {
        window.removeEventListener('message', this.messageListener)
    }
}