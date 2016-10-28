import React from 'react';
import request from 'superagent';
import {Link,hashHistory} from 'react-router';
require('../css/login-page.css');
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    _onSubmit(event) {
        event.preventDefault();
        request.post('/api/sessions')
            .send({
                username: this.state.username,
                password: this.state.password
            })
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 400 || res.statusCode === 401) {
                        alert(res.text);
                        hashHistory.push('/login');
                    }
                    return console.error(err);
                }
                if (res.statusCode === 201) {
                    alert(res.text);
                    hashHistory.push('/personal');
                }
            })
    }

    onChangeUserId(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return <div className="container">
            <form className=" col-md-5 col-md-offset-5 form-horizontal login" onSubmit={this._onSubmit.bind(this)}>
                <p className="login_title distance">BOOK</p>
                <div className="form-group">
                    <label htmlFor="userId" className="col-md-2 control-label distance">用户</label>
                    <div className="col-md-10">
                        <input type="text" value={this.state.username} className="form-control distance" id="username"
                               placeholder="Student ID"
                               onChange={this.onChangeUserId.bind(this)}/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="col-md-2 control-label distance">密码</label>
                    <div className="col-md-10">
                        <input type="password" value={this.state.password} className="form-control distance"
                               id="password"
                               placeholder="Password"
                               onChange={this.onChangePassword.bind(this)}/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="button-center">
                        <button type="submit" className="btn btn-primary">登录</button>
                        无账号?<Link to='/register'>注册</Link>
                    </div>
                </div>
            </form>
        </div>
    }
}

class LoginPage extends React.Component {
    render() {
        return (
            <div className="loginPage">
                <Login />
            </div>
        )
    }
}
export default LoginPage;
