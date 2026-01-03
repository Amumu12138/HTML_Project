
import { createContext } from 'react'
import Count from './containers/Count'
import UseEffect from './containers/UseEffect'
import UseRef from './containers/UseRef'
import UseContext from './containers/UseContext'
import PureComponent_ from './containers/PureComponent_'

export const UserContext = createContext();

export default function App() {

  return (
    <>
      {/* <Count /> */}
      {/* <UseEffect></UseEffect> */}
      {/* <UseRef></UseRef> */}
      {/* 祖孙组件与后代组件通信 */}
      {/* <UserContext.Provider value={{ userName: 'tom', age: 20 }}>
        <UseContext></UseContext>
      </UserContext.Provider> */}
      <PureComponent_></PureComponent_>
    </>
  )
}
