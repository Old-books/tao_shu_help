import React from 'react';
import {render} from 'react-dom';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import Nav from './navigation.jsx';
import '../css/share.css';

class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            name: '',
            press: '',
            images: [],
            count: '',
            price: '',
            index: this.props.params.id
        }
    }

    componentDidMount() {
        request
            .get(`/api/books/${this.props.params.id}`)
            .end((err, res) => {
                if (err) return alert('页面错误');
                return this.setState({
                    author: res.body.author,
                    name: res.body.name,
                    press: res.body.press,
                    images: res.body.images,
                    count: res.body.count,
                    price: res.body.price
                });
            });
    }

    _onClickCart() {
        return ()=> {
            console.log(this.state.index);
            request.post('/api/current/cart')
                .send({
                    index: this.state.index
                })
                .end((err, res) => {
                    if (err) {

                        if (res.statusCode === 401)
                            hashHistory.push('/login');
                        else {
                            return alert("加载错误!");
                        }
                    }
                    if (res.statusCode === 201) {
                        alert(res.text);
                    }
                })
        }
    }

    render() {
        return <div>
            <Nav/>
            <h3 className="book-name">{this.state.name}</h3>
            <div>
                {this.state.images.map(i => <img className="book-cover" key={i} src={i}/>)}
                <ul className="book-details">
                    <li>定价：<img src="../pictures/yuan.png"/>{this.state.price}</li>
                    <li>作者：{this.state.author}</li>
                    <li>出版社：{this.state.press}</li>
                    <li>数量：{this.state.count}</li>
                </ul>
                <button type="button" onClick={this._onClickCart()} className="add-cart">加入购物车
                </button>
                <Link to={'/connect/' + this.props.params.id}>
                    <button className="connect-owner">联系卖家</button>
                </Link>
            </div>
        </div>;
    }
}

export default Share;