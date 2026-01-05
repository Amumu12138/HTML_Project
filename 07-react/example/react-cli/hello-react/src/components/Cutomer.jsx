import { Component } from "react";
import customer from '../styles/customer.module.css';

console.log('customer', customer);

export default class Customer extends Component {
    render() {
        return <p className={customer.text}>Customer</p>
    }
}