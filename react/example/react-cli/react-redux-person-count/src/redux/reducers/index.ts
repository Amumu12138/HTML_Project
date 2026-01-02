import { combineReducers } from "redux";
import countReducer from "./countReducer";
import personReducer from "./personReducer";

// combineReducers: 连接多个reducer,实现数据共享 
export default combineReducers({
    count: countReducer,
    persons: personReducer
})