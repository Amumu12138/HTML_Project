import { Messager } from './utils/messager'

document.querySelector('#app').innerHTML = `
  <div>
   Hello World
   <br />
   <button id="btn" style="background-color: skyblue;" >send</button>
   <iframe id="previewIframe" src="http://localhost:3010" />
  </div>
`
const decorateOrigin = `http://localhost:3010`;
const EVENT_CHANGE = "EVENT_CHANGE"

const messager = new Messager(decorateOrigin)
const initMessage = () => {
  messager.on(EVENT_CHANGE, data => {
    console.log(data, 'EVENT_CHANGE called')
  })
}
initMessage()

document.getElementById('btn').onclick = function () {
  // postMessage-project项目向target-origin-project项目通信
  messager.emit(EVENT_CHANGE, {
    value: {
      origin: 'postMessage-project',
      target: 'target-origin-project'
    }
  })
}


