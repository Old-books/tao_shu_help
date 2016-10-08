import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
require('../css/personal-page.css');

class Personal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'unknown',
            password: '******',
            phone: '',
            email: '',
            _id: '',
        };
    }

    componentWillMount() {
        request.get('/api/personal')
            .end((err, res) => {
                console.log(err);
                if (err) {
                    if (res.statusCode === 401) {
                        alert('please login!');
                        return hashHistory.push('/login');
                    } else {
                        return alert(err);
                    }
                }
                console.log("statusCode:" + res.statusCode);
                const {username, email, phone, password, _id} = res.body;
                this.setState({username, email, phone, password, _id});
            })
    }

    _onClickModify() {
        document.getElementById('username').disabled = false;
        document.getElementById('password').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('phone').disabled = false;
    }

    _onSubmit(event) {
        event.preventDefault();
        request.get('/api/personal')
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 401) {
                        alert('Please Login!');
                        hashHistory.push('/personal');
                    } else {
                        return alert(err);
                    }
                }
                request.post(`/api/personal/${this.props.params._id}`)
                    .send({
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        phone: this.state.phone
                    })
                    .end((err, res) => {
                        if (err) {
                            if (res.statusCode === 400 && res.text === 'Please finish the form') {
                                alert("Please finish the form!");
                            }
                            if (res.statusCode === 400 && res.text === 'The email is error') {
                                alert("The email is error!");
                            }
                            if (res.statusCode === 400 && res.text === 'The phone number is error') {
                                alert("The phone number is error!");
                            }
                            return console.error(err);
                        }
                        if (res.statusCode === 201) {
                            alert('修改成功！');
                        }
                    })
            });
        console.log('aaaaaaaaaaaaa');
    }

    _onUsernameChange() {
        this.setState({
            username: this.target.username
        });
    }

    _onPasswordChange() {
        this.setState({
            password: this.target.password
        });
    }

    _onPhoneChange() {
        this.setState({
            phone: this.target.phone
        });
    }

    _onEmailChange() {
        this.setState({
            email: this.target.email
        });
    }

    render() {
        return (<div className="container">
                <form role="form">
                    <h2>个人信息</h2>
                    <div className="form-group">
                        <label htmlFor="inputName">姓名</label>
                        <input type="username" className="form-control" id="username" placeholder="用户名" disabled={true}
                               required="required"
                               value={this.state.username} onChange={this._onUsernameChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">密码</label>
                        <input type="password" className="form-control" id="password" placeholder="密码" disabled={true}
                               required="required"
                               value={this.state.password} onChange={this._onPasswordChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">电子邮箱</label>
                        <input type="email" className="form-control" id="email" placeholder="邮箱" disabled={true}
                               required="required"
                               value={this.state.email} onChange={this._onEmailChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPhone">手机号码</label>

                        <input type="phone" className="form-control" id="phone" placeholder="手机" disabled={true}
                               required="required"
                               value={this.state.phone} onChange={this._onPhoneChange.bind(this)}/>
                    </div>
                    <button type="button" className="btn btn-primary modify" onClick={this._onClickModify.bind(this)}>
                        修改
                    </button>
                    <button type="submit" className="btn btn-primary" id="submitId" onClick={this._onSubmit.bind(this)}>
                        提交
                    </button>
                </form>
            </div>
        )
    }
}

export default Personal;