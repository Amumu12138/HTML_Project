import { Component } from 'react'
import { connect } from 'react-redux'
import { decrementAction, incrementAction } from '../redux/actions/count'

// Count容器
class Count extends Component {
    addFun() {
        const { add } = this.props
        add(1)

    }
    reduceFun() {
        const { reduce } = this.props
        reduce(1)
    }
    render() {
        console.log(this.props);
        const { count, persons } = this.props


        return (
            <>
                <div>Count: {count} Person: {persons.length}</div>
                <button onClick={() => this.addFun()}>add</button>
                <button style={{ marginLeft: '20px' }} onClick={() => this.reduceFun()}>reduce</button>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
        persons: state.persons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: num => dispatch(incrementAction(num)),
        reduce: num => dispatch(decrementAction(num))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)
