
import { useNavigate } from 'react-router-dom'

export default function UseNavigateDemo() {
    const navigate = useNavigate();
    console.log(navigate, 'navigate');

    const toHome = () => {
        navigate('/home', { replace: false })
    }
    return (
        <div style={{ margin: '10px' }}>
            UseNavigateDemo
            <br />
            <button onClick={() => toHome()}>前往home</button>
        </div>
    )
}


