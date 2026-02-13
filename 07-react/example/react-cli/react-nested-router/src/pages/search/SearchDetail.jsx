import { useSearchParams } from 'react-router-dom'

export default function SearchDetail() {
    // search为map数据结构
    const [search] = useSearchParams()
    console.log(search, useSearchParams(), 'SearchDetail');
    // search 是 URLSearchParams类型,内置的 JavaScript 类
    console.log(search instanceof URLSearchParams, 'search type'); // true



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
