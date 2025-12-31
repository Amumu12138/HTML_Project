import React from 'react'
import { useLocation } from 'react-router-dom'

export default function StateDetail() {
    const { state: { id, title } } = useLocation()
    console.log(useLocation(), 'StateDetail');

    return (
        <div>
            ID: {id}
            <br />
            TITLE: {title}
        </div>
    )
}
