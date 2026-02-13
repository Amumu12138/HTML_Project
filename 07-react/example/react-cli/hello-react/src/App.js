import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import MyComponent from './components/MyCompoent';
import Customer from './components/Cutomer';

// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit 111<code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// 类声明组件
// const { Component } = React;
console.table('Component', Component);

// 暴露并创建App组件
export default class App extends Component {
  state = {
    count: 1
  }
  render() {

    return (
      <div className="title">
        <h1 >123</h1>
        <MyComponent></MyComponent>
        <Customer></Customer>
      </div>
    )
  }
}

