
class Postmessage {
    constructor() {
        // this.targetOrigin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:3011'
        this.targetOrigin = 'http://localhost:5173'
        this.postMessageType = {
            EVENT_CHANGE: 'EVENT_CHANGE',
        }
    }
    postMessage(type, json) {
        let message = {
            type: this.postMessageType[type],
            value: json
        }
        window.parent.postMessage(message, this.targetOrigin)
    }
    listenMessage() {
        window.addEventListener('message', (event) => {
            console.log(event, 'listenMessage message');

            if (event.origin === this.targetOrigin) {
                switch (event.data.type) {
                    case 'EVENT_CHANGE':
                        console.log(event.data, 'event.data');
                        break
                    default:
                }
            }
        }, false)
    }
}
export default new Postmessage()
