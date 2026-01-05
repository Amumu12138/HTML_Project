import React from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const { id } = useParams()


    const details = [
        {
            id: "01",
            title: 'title01',
            content: "content02"
        },
        {
            id: "02",
            title: 'title02',
            content: "content02"
        },
        {
            id: "03",
            title: 'title03',
            content: "content03"
        }
    ]

    const { id: curId, title, content } = details.find(item => item.id === id);
    return (
        <div>
            <li>ID: {curId}</li>
            <li>Title: {title}</li>
            <li>Content: {content}</li>
        </div>
    )

}
