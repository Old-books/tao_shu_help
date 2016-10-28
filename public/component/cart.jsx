import React from 'react';
import {render} from 'react-dom';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import _ from 'lodash';
require('../css/cart.css');
class Book_cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_book: [{
                name: '',
                images: '',
                price: '',
                _id: '',

            }],
            all_price: 0
        };
        this.changePrice = this.changePrice.bind(this)
    }

    componentWillMount() {
        request
            .get('/api/sessions/current')
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 403) {
                        alert('请先登录！');
                        return hashHistory.push('/login');
                    }
                }
                request.post('/api/current/cart/get_message')
                    .send({name: this.state.name})
                    .end((err, res) => {
                        if (err) {
                            if (res.statusCode === 401)
                                hashHistory.push('/login');
                            else {
                                return alert('页面错误');
                            }
                        }
                        if (res.statusCode === 200) {
                            alert(res.text);
                            hashHistory.push('/index');
                        }
                        if (res.statusCode === 201) {
                            console.log(res.body.book_message);
                            let Book_list = [];
                            _.map(res.body.book_message, function ({
                                name, images, price, id
                            }) {
                                Book_list.push({
                                    name: name,
                                    images: images,
                                    price: price,
                                    _id: id,
                                });

                            });
                            console.log(Book_list);
                            return (this.setState({cart_book: Book_list}));
                        }
                    });
            });
    }

    changePrice(price) {
        this.setState({all_price: price});
        //console.log("allprice: "+this.state.all_price);
    }

    render() {
        let i = 0;
        const bookList = _.map(this.state.cart_book, ({name, images, price, _id}) =>
            <div key={_id + i++}>
                    <Book_list list={
                    {
                        name: name, images: images, price: price, _id: _id, all_price: this.state.all_price
                    }} changePrice={this.changePrice.bind(this)}/>
            </div>);

        return<div className="books">
            {bookList}
            <div className="total">
                <h3> 总价:{this.state.all_price}</h3>
            </div>
        </div>;
    }
}

class Book_list extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.list.name,
            images: this.props.list.images,
            price: this.props.list.price,
            _id: this.props.list._id,
            count: 1,
            all_price: this.props.list.all_price,
            // cost: this.props.list.price
        };
    }

    _addCount() {
        this.setState({
            count: this.state.count + 1
        });
    }

    _reduceCount() {
        if (this.state.count < 1) {
            return false;
        } else {
            var count = this.state.count - 1;
        }
        this.setState({
            count: count
        });
    }

    _onClickDelete() {
        return ()=> {
            this.setState({
                name: '',
                images: '',
                price: '',
                _id: '',
                count: 0,

            });
        }
    }

    handleChange(price) {

        this.setState({
            all_price: price
        });
        //这个值怎么传给父组件
        //用传过来的changePrice属性(props)，是个函数，呼叫它把price交给父组件中的函数去处理
        this.props.changePrice(price)
    }

    render() {
        let price = this.state.price * this.state.count;
        return <div>
            <div className="pic">
                <Link to={"/share/" + this.state._id}><img src={this.state.images}/></Link>
            </div>
            <div className="book-item">
                <div className="book-name">
                    书名:{this.state.name}
                    单价:{this.state.price}
                </div>
                <label>数目:</label>
                <img src="../pictures/add.png" onClick={this._addCount.bind(this)}/>
                <label className="book-count">{this.state.count}</label>
                <img src="../pictures/reduce.png" onClick={this._reduceCount.bind(this)}/>
                <button type="button" onClick={this._onClickDelete.bind(this)}>删除</button>
                <div onChange={this.handleChange.bind(this)}>价钱:{price}</div>
            </div>
        </div>;
    }
}

export default Book_cart;