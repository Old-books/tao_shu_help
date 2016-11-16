import React from 'react';
import {render} from 'react-dom';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
require('../css/nav.css');
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            isLongIn: false
        };
    }

    componentWillMount(){
        request.get('/api/sessions/current')
            .end((err, res) => {
                if (res.statusCode === 201) {
                    return this.setState({
                        isLongIn: true,
                        publisher: res.text
                    });
                }
            });
    }

    render() {
        return <div className="container">
            <h1 className="logo"><Link to="/index"className="logo-button">淘书帮</Link></h1>
            <form className="form-container" onSubmit={this._onSubmit.bind(this)}>
                <input type="text" placeholder="书名 作者 出版社" className="search-input"
                       value={this.state.content} onChange={this._searchContent.bind(this)}/>
                <img src="../../pictures/line.png" className="search-line"/>
                <input className="search-button" type="image" src="../../pictures/search-button.png"/>
            </form>
            {this.state.isLongIn ?
                <div className="check-login">
                    <img src="../../pictures/cart.png" className="cart-picture"/>
                    <Link to="/cart" className="cart-button">购物车</Link>
                    <img src="../../pictures/own-center.png" className="own-center-picture"/>
                    <Link to="/personal" className="own-center-button">个人中心</Link>
                    <Link to='' className="quit" onClick={this._dropUp.bind(this)}>退出</Link>
                </div> :
                <div className="check-login">
                    <img src="../../pictures/login.png" className="cart-picture"/>
                    <Link to="/login" className="cart-button">登录</Link>
                    <img src="../../pictures/register.png" className="own-center-picture"/>
                    <Link to="/register" className="own-center-button">注册</Link>
                </div>
            }
        </div>
    }

    _searchContent(event) {
        this.setState({
            content: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        hashHistory.push('/search/' + this.state.content);
    }

    _dropUp(){
        request
            .delete('/api/sessions/current')
            .end((err, res)=> {
                if (err) alert(err);
                if(res.statusCode === 200) {
                    this.setState({
                        isLongIn: false
                    });
                    hashHistory.push('/index');
                }
            });
    }
}

export default Nav;