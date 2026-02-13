import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Message() {
    const navigate = useNavigate();
    function toHome() {
        console.log('toHome navigate', navigate);
        navigate('/home', { replace: false })
    }
    return (
        <div>
            Message
            <br />
            <button onClick={() => toHome()}>前往Home</button>
        </div>
    )
}
