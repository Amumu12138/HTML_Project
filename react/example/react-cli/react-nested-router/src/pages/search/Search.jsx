import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Search() {
    return (
        <div>
            <Link to={`/home/search/searchDetail?id=${1}&title=${111}`}>search01</Link>
            <Outlet />
        </div>
    )
}
