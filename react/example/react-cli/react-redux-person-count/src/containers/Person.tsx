import { nanoid } from 'nanoid';
import { Component } from 'react'
import { connect } from 'react-redux'
import { addPersonAction } from '../redux/actions/person';
// Person容器
class Person extends Component {
    addPersonFun() {
        const { addPerson } = this.props;
        addPerson({
            id: nanoid(),
            name: '123',
            age: 12
        })
    }
    render() {
        const { persons } = this.props;
        return (
            <>
                <div>Person</div>
                <br />
                <button onClick={() => this.addPersonFun()}>addPerson</button>
                <ul>
                    {
                        persons.map((item) => {
                            return <li key={item.id}>name:{item.name} -- age: {item.age}</li>
                        })
                    }
                </ul></>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPerson: data => dispatch(addPersonAction(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)

