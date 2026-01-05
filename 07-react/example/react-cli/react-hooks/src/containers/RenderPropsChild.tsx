import { Component } from 'react'

export default class RenderPropsChild extends Component {
    render() {
        return (
            <>
                RenderPropsChild
                <br />
                name: {this.props.data}
            </ >
        )
    }
}
