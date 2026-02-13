import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
    myRef = React.createRef()

    search = () => {
        // 获取输入
        let keyWord = this.myRef.current.value
        if (keyWord.trim() === '') {
            return alert('请输入内容')
        }
        // 发生github请求
        let URL = `https://api.github.com/search/users?q=${keyWord}`
        // localhost:3000/api通过setupProxy代理请求本地app3.js 端口3010服务器
        // const URL = `http://localhost:3000/api/search/users?q=${keyWord}`

        // 更新状态
        // 更新状态
        PubSub.publish('updateState', {
            user: [],
            isFirst: false,
            isLoading: true,
            error: ''
        })
        axios.get(URL)
            .then((value) => {
                console.log('value', value);

                PubSub.publish('updateState', {
                    user: value.data.items,
                    isFirst: false,
                    isLoading: false,
                    error: ''
                })
            })
            .catch((error) => {
                PubSub.publish('updateState', {
                    user: [],
                    isFirst: false,
                    isLoading: false,
                    error: error.message
                })
            })
        // 清空输入
        this.myRef.current.value = ''
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="请输入关键字" ref={this.myRef} />&nbsp;
                <button onClick={this.search}>搜索</button>
            </div>
        )
    }
}