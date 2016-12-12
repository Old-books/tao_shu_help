import React from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import '../css/order.css';
import _ from 'lodash';
import Address from './personalAddress.jsx';
import {hashHistory, Link} from 'react-router';
class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pay_list: this.props.location.state.pay_list,
            payPrice: this.props.location.state.payPrice,
            password: '',
            custom: this.props.location.state.custom,
            id_user: this.props.location.state.id_user
        };
    }

    _overlay() {
        request
            .post('/api/personal/address')
            .send({custom:this.state.custom})
            .end((err, res) => {
                if (err) {
                    return alert(err);
                }
                if (res.statusCode === 201) {
                    if (res.body.province !== "noExist" && res.body.city !== "noExist" && res.body.county !== "noExist" && res.body.specificAddress !== "noExist") {
                        let e = this.refs.overlay;
                        e.style.visibility = "visible";
                        this.setState({
                            password: ""
                        });
                    } else {
                        return alert('请填写收货地址');
                    }
                }

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
                password: this.state.password,
                id_user: this.state.id_user
            })
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 403) {
                        return alert(res.text);
                    }
                    return console.log(err);
                }
                if (res.statusCode === 201) {
                    hashHistory.push('/index');
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
            <div id="order">
                <div>
                    <Address/>
                </div>
                <div id="custom">顾&nbsp;客:&nbsp;{this.state.custom}</div>
                <div>
                    <div>
                        {bookList}
                    </div>
                    <div className="pay-for">
                        合&nbsp;计:<img src="../../pictures/yuan.png"
                                      className="yuan"/>{this.state.payPrice}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button typeof="button" className="button3" onClick={this._overlay.bind(this)} id="account">提交订单
                        </button>
                    </div>
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
        return <div className="goods">
            <div className="photo">
                <Link to={"/share/" + this.state._id}><img src={this.state.images}/></Link>
            </div>
            <div className="good-list">
                商品名称：{this.state.name}<br/>
                商品数量：{this.state.count}&nbsp;本<br/>
                发布人：{this.state.publisher}<br/>
                小计：<img src="../../pictures/yuan.png" className="yuan"/>{price}<br/>
            </div>
        </div>
    }
}
export default Payment;