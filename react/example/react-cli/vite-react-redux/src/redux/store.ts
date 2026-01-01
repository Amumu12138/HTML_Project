import { legacy_createStore, applyMiddleware } from 'redux'
// 引入thunk用于支持异步action
import { thunk } from 'redux-thunk'
import countReducer from './reducer.ts'

const store = legacy_createStore(countReducer, applyMiddleware(thunk))

export default store