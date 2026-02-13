import { Component } from "react";
/* 样式模块化(import xxx from 'xxx'导入 + xxx.module.css 命名) */
import mycomponent from '../styles/mycomponent.module.css'

console.log(mycomponent);

export default class MyComponent extends Component {
    render() {
        return <p className={mycomponent.text}>Hello React</p>
    }
}