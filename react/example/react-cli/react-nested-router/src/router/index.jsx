import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'
import Search from '../pages/search/Search'
import SearchDetail from '../pages/search/SearchDetail'
import State from '../pages/state/State'
import StateDetail from '../pages/state/StateDetail'

const routes = [
    {
        path: '/',
        element: <Navigate to="about" />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'news',
                element: <News />
            },
            {
                path: 'message',
                element: <Message />,
                children: [
                    {
                        path: 'detail/:id',
                        element: <Detail />
                    },
                    {
                        path: 'search',
                        element: <Search />,
                        children: [
                            {
                                path: 'searchDetail',
                                element: <SearchDetail />,
                            }
                        ]
                    },
                    {
                        path: 'state',
                        element: <State />,
                        children: [
                            {
                                path: 'detail',
                                element: <StateDetail />,
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/about',
        element: <About />
    }
]

export default routes
