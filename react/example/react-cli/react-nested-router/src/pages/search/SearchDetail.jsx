import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SearchDetail() {
    const [search] = useSearchParams()
    console.log(search, useSearchParams(), 'SearchDetail');

    const id = search.get('id')
    const title = search.get('title')
    console.log(id, title, 'search');

    return (
        <div>
            ID:{id}
            <br />
            TITLE: {title}
        </div>
    )
}
