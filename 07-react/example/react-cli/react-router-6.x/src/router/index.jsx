import { Navigate } from 'react-router-dom'
import About from "../pages/About"
import Home from '../pages/Home';
import Message from '../pages/children/Message';

const routes = [
    // Navigate: 重定向路由标签
    {
        path: '/',
        element: <Navigate to='/about' />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'message',
                element: <Message />,
            }
        ]
    }
]

export default routes;