import React from 'react';
import {render} from 'react-dom';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import '../css/nav.css';
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: ''
        };
    }

    render() {
        return <div className="container">
            <h1 className="logo">淘书帮</h1>
            <form className="form-container" onSubmit={this._onSubmit.bind(this)}>
                <input type="text" placeholder="书名 作者 出版社" className="search-input"
                       value={this.state.searchContent} onChange={this._searchContent.bind(this)}/>
                <img src="../../pictures/line.png" className="search-line"/>
                <input className="search-button" type="image" src="../../pictures/search-button.png"/>
            </form>
            <img src="../../pictures/cart.png" className="cart-picture"/>
            <Link to="#" className="cart-button">购物车</Link>
            <img src="../../pictures/own-center.png" className="own-center-picture"/>
            <Link to="#" className="own-center-button">个人中心</Link>
        </div>
    }

    _searchContent(event) {
        this.setState({
            searchContent: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        request
            .post('/api/books/search')
            .send({
                searchContent: this.state.searchContent
            })
            .end((err, res) => {
                if (err) return alert(res.text);
                if (res.statusCode === 201) {
                    return alert('找到相关书籍');
                }
                if (res.statusCode === 403) {
                    return alert(res.text);
                }
            });
    }
}

export default Nav;