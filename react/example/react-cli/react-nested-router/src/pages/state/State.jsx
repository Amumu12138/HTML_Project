import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function State() {
    return (
        <div>
            <Link
                to={`/home/state/stateDetail`}
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
