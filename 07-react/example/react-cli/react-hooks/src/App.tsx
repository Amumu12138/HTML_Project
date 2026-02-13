
import { createContext } from 'react'
import Count from './containers/Count'
import UseEffect from './containers/UseEffect'
import UseRef from './containers/UseRef'
import UseContext from './containers/UseContext'
import PureComponent_ from './containers/PureComponent_'
import RenderPropsParent from './containers/renderPropsParent'
import RenderPropsChild from './containers/renderPropsChild'

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
      {/* 纯组件,只有state/props数据有修改才会出发render重新绘制 */}
      {/* <PureComponent_></PureComponent_> */}
      {/* render props 通过组件标签属性render传入结构 */}
      {/* <RenderPropsParent
        render={data => <RenderPropsChild data={data} />}>
      </RenderPropsParent> */}
    </>
  )
}
