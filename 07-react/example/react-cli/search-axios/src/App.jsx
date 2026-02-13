import React, { Component } from 'react'
import axios from 'axios'


export default class App extends Component {
  state = {
    students: [],
    cars: []
  }

  getStudents() {
    //3000-->到8080会有跨域问题 开启一个代理，解决跨域的问题
    //相当于在3000的机器上放置一个代理，发送一个请求之后，会先判断3000这个服务上是否有这个服务，如果有直接就返回，如果没有就去8080去找，
    //经过这个代理转发到8080这个机器上。
    // package.json -> 配置项: "proxy": "http://localhost:8080"
    axios.get('http://localhost:3000/api1/students').then(
      result => {
        const resData = result.data;
        this.setState({ students: resData });
        console.log("这个成功", result.data)
      },
      error => { console.log("失败", error) }
    )
  }

  getCars() {
    axios.get('http://localhost:3000/api2/cars').then(
      result => {
        console.log("card success", result.data);
        const resData = result.data;
        this.setState({ cars: resData });
      },
      error => { console.log("失败", error) }
    )
  }

  render() {
    const { students, cars } = this.state
    return (
      <div >
        <button style={{ 'margin': '20px' }} onClick={() => this.getStudents()}>查看学生</button>

        <button onClick={() => this.getCars()}>查看汽车</button>

        {
          students.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
        <hr />
        {
          cars.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
      </div>
    )
  }
}

