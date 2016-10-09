import React, {Component} from "react";
import request from 'superagent';
import {hashHistory, Link} from 'react-router';
require('../css/register.css');
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    }

    render() {
        return <form onSubmit={this._onSubmit.bind(this)}>
            <div className="register">
                <div className="title"><h3>欢迎注册</h3></div>
                <div className="form-group">
                    <label>用户名</label>
                    <input type="name" className="form-control" id="name"
                           placeholder="请设置用户名" required
                           value={this.state.username}
                           onChange={this._onNameChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>邮箱</label>
                    <input type="email" className="form-control" id="email"
                           placeholder="请输入邮箱" required
                           value={this.state.email}
                           onChange={this._onEmailChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>手机号码</label>
                    <input type="tel" className="form-control" id="phone"
                           placeholder="请输入手机号码" required pattern="^(\+86)?(1[0-9]{10})$"
                           value={this.state.phone}
                           onChange={this._onPhoneChange.bind(this)}/>
                </div>
                < div className="form-group">
                    <label>设置密码</label>
                    <input type="password" className="form-control" id="password"
                           placeholder="请输入密码(至少六位)" required pattern="^.{6,18}$"
                           value={this.state.password}
                           onChange={this._onPasswordChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>确认密码</label>
                    <input type="password" className="form-control" id="confirm-password"
                           placeholder="请确认密码(至少六位)" required pattern="^.{6,18}$"
                           value={this.state.confirmPassword}
                           onChange={this._onConfirmPasswordChange.bind(this)}/>
                </div>
                <input type="submit" value="注册" className="btn btn-primary"/>
                <span>有账号?<Link to='/login'>登陆</Link></span>
            </div>
        </form>
    }

    _onNameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    _onEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    _onPhoneChange(event) {
        this.setState({
            phone: event.target.value
        })
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    _onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    _onSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('密码不一致,请重新输入密码!');
        }
        else {
            request.post('/api/users')
                .send({
                    username: this.state.username,
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password,
                })
                .end((err, res) => {
                    if (res.statusCode === 400 && res.text === 'Please finish the form') {
                        alert("Please finish the form!");
                    }
                    if (res.statusCode === 400 && res.text === 'The email is error') {
                        alert("The email is error!");
                    }
                    if (res.statusCode === 400 && res.text === 'The phone number is error') {
                        alert("The phone number is error!");
                    }
                    if (res.statusCode === 409) {
                        alert("用户名已存在!");
                    }
                    if (res.statusCode === 201) {
                        alert("注册成功!");
                        hashHistory.push('/login');
                    }
                });
        }
    }
}