import React, { Component } from 'react'

export default class RenderPropsParent extends Component {
    state = { name: 'tom' }
    render() {

        const { name } = this.state;
        console.table(this.props); // Object {render: f(){}}

        return (
            <>
                RenderPropsParent
                <br />
                <hr />
                {this.props.render(name)}
            </>
        )
    }
}
