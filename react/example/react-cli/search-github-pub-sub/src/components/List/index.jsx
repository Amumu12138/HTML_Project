import React, { Component } from 'react'
import ReactDOM from 'react-dom/client';
import PubSub from 'pubsub-js'
import Item from '../Item'

export default class List extends Component {
    state = {
        // 用户列表
        user: [],
        // 是否是第一次查询
        isFirst: true,
        // 是否开启loading
        isLoading: false,
        // 报错
        error: ''
    }


    token = null;
    componentDidMount() {
        // 完成消息订阅
        this.token = PubSub.subscribe('updateState', (msg, data) => {
            console.log('List subsctibe ', data);

            this.setState(data)
        })
        console.log('token', this.token);

    }

    componentWillUnmount() {
        console.log('componentWillUnmount called', this.token);

        // 卸载前取消消息订阅
        PubSub.unsubscribe(this.token)
        this.token = null
    }

    listRef = React.createRef()
    handleDelete() {
        // console.log('handleDelete', this.listRef.current);

        // ReactDOM.unmountComponentAtNode(this.listRef.current);
    }
    render() {
        let { user = [], isFirst, isLoading, error } = this.state
        if (isFirst) {
            return <h2>请输入关键词以搜索用户</h2>
        } else if (isLoading) {
            return <h2>Loading...</h2>
        } else if (error) {
            return <h2>{error}</h2>
        } else {
            return (
                <div ref={this.listRef} className="row">
                    {
                        user.map((item) => {
                            return <Item key={item.id} {...item} />
                        })
                    }
                    {/**<button onClick={() => this.handleDelete()}>卸载</button> */}
                </div>
            )
        }
    }
}