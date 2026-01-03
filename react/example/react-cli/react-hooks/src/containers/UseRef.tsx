import { useRef } from "react"

// useRef 例子
export default function UseRef() {
    const inputRef = useRef(null)

    const print = () => {
        console.log(inputRef);
        alert(inputRef?.current?.value)

    }
    return (
        <div>
            UseRef
            <br />
            <input ref={inputRef} type="text" />
            <br />
            <button onClick={() => print()}>print</button>
        </div>
    )
}
