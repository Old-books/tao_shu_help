import React from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import '../css/order.css';

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }

    _overlay() {
        let e = this.refs.overlay;
        e.style.visibility = "visible";
        this.setState({
            password: ""
        });
    }

    _getPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    _closeWindow() {
        let e = this.refs.overlay;
        e.style.visibility = "hidden";
    }

    _verify() {
        event.preventDefault();
        let e = this.refs.overlay;
        e.style.visibility = "hidden";
        let buyedBooks = [];
        let buyedCount = [];
        let seller = [];
        let bookname = this.refs.bookName;
        buyedBooks.push(bookname.innerHTML);
        let bookCount = this.refs.bookCount;
        buyedCount.push(bookCount.innerHTML);
        let customName = this.refs.custom;
        let custom = customName.innerHTML;
        let publisher = this.refs.publisher;
        seller.push(publisher.innerHTML);
        request
            .post("/api/order")
            .send({
                custom: custom,
                buyedBook: buyedBooks,
                buyedCount: buyedCount,
                seller: seller,
                password: this.state.password
            })
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 403) {
                        return alert(res.text);
                    }
                    return console.log(err);
                }
                if (res.statusCode === 201) {
                    return alert(res.text);
                }
            })
    }


    render() {
        return (
            <div>
                <ul>
                    <li>顾客:<a ref="custom">赵悦妮</a></li>
                    <li>商品名称：<a ref="bookName">c语言</a></li>
                    <li>商品数量：<a ref="bookCount">3</a></li>
                    <li>发布人：<a ref="publisher">nike</a></li>
                    <li>小计：<a ref="subTotal">30</a>元</li>
                    <li>总计：<a ref="total">30</a>元</li>
                </ul>
                <button typeof="button" onClick={this._overlay.bind(this)} id="account">结算</button>
                <div id="modal-overlay" ref="overlay">
                    <div id="popup">
                        <a><img src="../pictures/false.png" id="close" onClick={this._closeWindow.bind(this)}/></a>
                        <h1 className="logo-payment">淘书帮</h1>
                        <label className="text-mark">请输入支付密码: <input type="password" id="pay"
                                                                     value={this.state.password}
                                                                     onChange={this._getPassword.bind(this)}
                                                                     autoFocus="autoFocus" maxLength="6"/>
                        </label>
                        <button type="button" id="verify" onClick={this._verify.bind(this)}>确认支付</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;