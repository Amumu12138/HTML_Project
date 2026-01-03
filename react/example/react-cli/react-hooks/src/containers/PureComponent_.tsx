import React, { Component, PureComponent } from 'react'

export default class PureComponent_ extends PureComponent {

    state = { name: 'tom' }
    changeName() {
        // 继承Component 不修改数据也会调用render,继承PureComponent则不会
        this.setState({})
        // 正常调用render
        this.setState({ name: 'jerry' })
    }

    render() {
        console.log('render called');

        const { name } = this.state;

        return (
            <div>
                name:{name}
                <br />
                <button onClick={() => this.changeName()}>change</button>
            </div>
        )
    }
}
