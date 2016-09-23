import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }

    }

    render() {
        return (
            <form onSubmit={this._onSubmit.bind(this)}>
                <div>
                    <input className="input-field" type="text" placeholder="请输入用户名或邮箱" id="name"
                           value={this.state.name}
                           onChange={this._onNameChange.bind(this)}/>
                </div>
                <div className="password">
                    <input className="input-field" id="password" type="password" placeholder="请输入密码"
                           value={this.state.password}
                           onChange={this._onPasswordChange.bind(this)}/>
                </div>
                <div>
                    <a className="setTextColor">忘记密码?</a>
                    <a className="setTextColor">注册</a>
                    <input type="submit" value="登录" className="btn btn-primary"/>
                </div>
            </form>
        )
    }

    _onNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        request.post('/api/sessions')
            .send({
                name: this.state.name,
                password: this.state.password
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    alert('login success');
                    $("#div1").html('Welcome:' + '<a href="/#/personalPage">' + this.state.name + '</a>');
                    hashHistory.push('/index-rent');
                } else if (res.statusCode === 400 && res.text == 'name and password can not be null') {
                    alert(res.text);
                }
                else if (res.statusCode === 401 && res.text === 'name or password is wrong') {
                    alert(res.text);
                }
            })
    }
}

