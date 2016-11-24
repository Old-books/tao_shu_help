import React from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import '../css/order.css';
import _ from 'lodash';
import {hashHistory, Link} from 'react-router';
class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pay_list: this.props.location.state.pay_list,
            payPrice: this.props.location.state.all_price,
            password: '',
            custom:this.props.location.state.custom
        };
        console.log(this.state.custom);
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
        request
            .post("/api/order")
            .send({
                custom: this.state.custom,
                pay_list: this.state.pay_list,
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
        let i = 0;
        const bookList = _.map(this.state.pay_list, ({name, images, price, _id, count, publisher}) =>
            <div key={_id + i++}>
                <Book_pay list={
                    {
                        publisher: publisher,
                        name: name,
                        images: images,
                        price: price,
                        _id: _id,
                        count: count,
                        all_price: this.state.all_price
                    }} ref={"book_list"}/>
            </div>);
        return (
            <div>
                顾客:{this.state.custom}
                {bookList}
                <br/>
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
class Book_pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.list._id,
            publisher: this.props.list.publisher,
            name: this.props.list.name,
            images: this.props.list.images,
            price: this.props.list.price,
            count: this.props.list.count,
            all_price: this.props.list.price * this.props.list.count,
        };

    }

    render() {
        let price = this.state.price * this.state.count;
        return <div>
            <div className="pic">
                <Link to={"/share/" + this.state._id}><img src={this.state.images} width="180px" height="160px"/></Link>
            </div>
            <ul>
                <li>商品名称：<a >{this.state.name}</a></li>
                <li>商品数量：<a>{this.state.count}</a></li>
                <li>发布人：<a >{this.state.publisher}</a></li>
                <li>小计：<a>{price}</a>元</li>
            </ul>
        </div>;
    }
}
export default Payment;