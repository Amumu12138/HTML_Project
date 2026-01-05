import { useState } from "react";

// Count容器
export default function Count() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>Count: {count} </div>
            <button onClick={() => setCount(count + 1)}>add</button>
            <button style={{ marginLeft: '20px' }} onClick={() => setCount(count - 1)}>reduce</button>

        </div>
    )

}

