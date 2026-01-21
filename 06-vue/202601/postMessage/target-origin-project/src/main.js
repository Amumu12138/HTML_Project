import Postmessage from './postMessage'

document.querySelector('#app').innerHTML = `
  <div>
    target-origin-porject
    <br />
    <button id="target-btn" style="background-color: red">send</button>
  </div>
`
// 注册postmessage事件监听
Postmessage.listenMessage()
document.querySelector('#target-btn').onclick = function () {
  // target-origin-project项目向postMessage-project项目通信
  Postmessage.postMessage('EVENT_CHANGE', {
    origin: 'target-origin-project',
    target: 'postMessage-project'
  })
}