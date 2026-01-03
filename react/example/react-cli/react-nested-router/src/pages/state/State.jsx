import { Link, Outlet } from 'react-router-dom'

export default function State() {
    return (
        <div>
            <Link
                to={`/home/message/state/detail`}
                state={{
                    id: 'id',
                    title: 'title',
                }}>
                stateDetail
            </Link>
            <Outlet />
        </div>
    )
}
