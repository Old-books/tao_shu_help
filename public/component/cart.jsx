import React from 'react';
import {render} from 'react-dom';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import _ from 'lodash';
import Nav from './navigation.jsx';
require('../css/cart.css');
let id_user = '';
let all_price = 0;
let element_id = [];
class Book_cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_book: [{
                publisher: '',
                name: '',
                images: '',
                price: '',
                _id: '',
                count: 1,

            }],
            all_price: 0
        };
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

                            let Book_list = [];
                            console.log(res.body.id_user);
                            id_user = res.body.id_user;
                            _.map(res.body.book_message, function ({
                                name, images, price, id, count, publisher
                            }) {
                                Book_list.push({
                                    publisher: publisher,
                                    name: name,
                                    images: images,
                                    price: price,
                                    _id: id,
                                    count: count
                                });
                                element_id.push(id);
                            });
                            // console.log(Book_list);
                            return (this.setState({cart_book: Book_list}));
                        }
                    });
            });
    }

    changePrice() {
        this.setState({all_price: parseInt(all_price)});
    }
    render() {
        let i = 0;
        const bookList = _.map(this.state.cart_book, ({name, images, price, _id, count, publisher}) =>
            <div key={_id + i++}>
                <Book_list list={
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

        return <div className="books">
            {bookList}
            <div>
                <input type="button" value='计算总价钱' onClick={this.changePrice.bind(this)}/>
                <br/>
                <Link to="/order">进入支付</Link>
            </div>
            <div className="total">
                <h3 id="count_price">{this.state.all_price}</h3>
            </div>
        </div>;
    }
}

class Book_list extends React.Component {
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

    _addCount() {
        let element = document.getElementById(this.state._id + 'add');
        if (_.isEqual(element.getAttribute('is_Press'), 'true') || (element.getAttribute('is_Press') === null)) {
            this.setState({
                count: this.state.count + 1
            });
        }
    }

    _reduceCount() {
        let element = document.getElementById(this.state._id + 'reduce');
        if (_.isEqual(element.getAttribute('is_Press'), 'true') || (element.getAttribute('is_Press') === null)) {
            if (this.state.count < 1) {
                return false;
            } else {
                var count = this.state.count - 1;
            }
            this.setState({
                count: count
            });
        }
    }

    _onClickDelete(event) {
        let element = document.getElementById(this.state._id + 'deleting');
        if (_.isEqual(element.getAttribute('is_Press'), 'true') || (element.getAttribute('is_Press') === null)) {
            document.getElementById(this.state._id + 'deleted').style.display = "none";
            request.post('/api/current/cart/delete')
                .send({_id: this.state._id, id_user: id_user})
                .end((err, res) => {
                    if (err) {
                        if (res.statusCode === 401)
                            hashHistory.push('/login');
                        else return alert('页面错误');
                    }
                    if (res.statusCode === 201)
                        alert("删除成功");
                    console.log("success /delete");
                })
        }
    }

    getCheck(id) {
        if (_.isEqual(isCheck(id), 'false')) {
            changeIs_True(id);
            all_price -= parseInt(this.state.price * this.state.count);
            document.getElementById('count_price').innerHTML = parseInt(all_price);
        }
        else {
            changeIs_False(id);
            all_price += parseInt(this.state.price * this.state.count);
            document.getElementById('count_price').innerHTML = parseInt(all_price);
        }

    }

    getPrice() {
        this.getCheck(this.state._id);
    }

    render() {
        let price = this.state.price * this.state.count;
        return <div id={this.state._id + 'deleted'}>
            <input type="checkbox" id={this.state._id} onClick={this.getPrice.bind(this)}/><br/>
            卖家:{this.state.publisher}<br/>
            <div className="pic">
                <Link to={"/share/" + this.state._id}><img src={this.state.images} width="180px" height="160px"/></Link>
            </div>
            <div className="book-item">
                <div className="book-name">
                    书名:{this.state.name}<br/>
                    单价:{this.state.price}<br/>
                </div>
                <label>数目:</label>
                <img src="../pictures/add.png" id={this.state._id + 'add'} onClick={this._addCount.bind(this)}/>
                <label className="book-count">{this.state.count}</label>
                <img src="../pictures/reduce.png" id={this.state._id + 'reduce'}
                     onClick={this._reduceCount.bind(this)}/>
                <button type="button" id={this.state._id + 'deleting'} onClick={this._onClickDelete.bind(this) }>
                    删除
                </button>
                <div id="all">小计:{price}
                </div>
            </div>
        </div>;
    }
}
function isCheck(id) {
    let element = document.getElementById(id);
    return element.getAttribute('is_Check');

}
function changeIs_True(id) {
    let elements1 = document.getElementById(id + 'add');
    let elements2 = document.getElementById(id + 'reduce');
    let elements3 = document.getElementById(id + 'deleting');
    let element = document.getElementById(id);
    element.setAttribute('is_Check', 'true');
    elements1.setAttribute('is_Press', 'true');
    elements2.setAttribute('is_Press', 'true');
    elements3.setAttribute('is_Press', 'true');
}
function changeIs_False(id) {
    let elements1 = document.getElementById(id + 'add');
    let elements2 = document.getElementById(id + 'reduce');
    let elements3 = document.getElementById(id + 'deleting');
    let element = document.getElementById(id);
    element.setAttribute('is_Check', 'false');
    elements1.setAttribute('is_Press', 'false');
    elements2.setAttribute('is_Press', 'false');
    elements3.setAttribute('is_Press', 'false');
}
export default Book_cart;
