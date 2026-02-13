import { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom'

// Effect Hook例子
export default function UseEffect() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('123')

    useEffect(() => {
        console.log('useEffect called')
        let timer = setInterval(() => {
            setCount(count + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [count])

    function unmount() {
        // unmountComponentAtNode已废弃
        // const appDom = document.getElementById('app')
        // ReactDOM.unmountComponentAtNode(appDom);
    }

    return (
        <div>
            UseEffect
            <br />
            <div>count: {count}</div>
            <div>name: {name}</div>
            <button onClick={() => (setCount(val => val + 1))}>add</button>
            <button style={{ margin: '0 20px' }} onClick={() => (setName('456'))}>change</button>
            <button onClick={() => unmount()}>卸载组件</button>
        </div>
    )
}
