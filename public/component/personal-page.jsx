import React from 'react';
import request from 'superagent';
import {hashHistory, Link} from 'react-router';
import Nav from './navigation.jsx';
require('../css/personal-page.css');

class PersonalCenter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'unknown',
            password: '*******',
            confirmPassword: '',
            phone: '',
            email: '',
            _id: '',
            status: false
        };
    }

    componentWillMount() {
        request.get('/api/personal')
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 401) {
                        alert('please login!');
                        return hashHistory.push('/login');
                    } else {
                        return alert(err);
                    }
                }
                const {username, email, phone, password, _id, province, city, county, specificAddress} = res.body;
                this.setState({username, email, phone, password, _id, province, city, county, specificAddress});
            });
    }

    _myAddress() {
        hashHistory.push('/address');
        /*const {history} =this.props;
        history.push({
            pathname: "/address",
           /!* state: {
                _id: this.state._id,
                province: this.state.province,
                city: this.state.city,
                county: this.state.county,
                specificAddress: this.state.specificAddress
            }*!/
        });*/
    }

    _onClickModify() {
        this.setState({
            status: true
        });
        document.getElementById('password').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('phone').disabled = false;
    }

    _onSubmit(event) {
        event.preventDefault();
        if (this.state.status === false) {
            alert('请您确认修改！');
        } else {
            if (this.state.password !== this.state.confirmPassword) {
                alert('密码不一致,请重新输入密码!');
            } else {
                request.post(`/api/personal/${this.state._id}`)
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
                        if (res.statusCode === 201 && res.text === '数据信息已存入数据库') {
                            alert('修改成功!');
                            request.delete('/api/sessions/current').end((err) => {
                                if (err)
                                    return console.error(err);
                            });
                            request.post('/api/sessions')
                                .send({
                                    username: this.state.username,
                                    password: this.state.password
                                })
                                .end((err, res) => {
                                    if (err) {
                                        return console.error(err);
                                    }
                                });
                            hashHistory.push('/personal');
                        }
                    });
            }
        }
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    _onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    _onPhoneChange(event) {
        this.setState({
            phone: event.target.value
        });
    }

    _onEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="container">
                    <ul className="nav nav-pills" role="tablist">
                        <li role="presentation" className="active"><a href="#tab-one" role="tab"
                                                                      data-toggle="tab">个人信息</a>
                        </li>
                        <li role="presentation"><a href="#tab-three" role="tab" data-toggle="tab">发布</a></li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="tab-one">
                            <div className="row feature-one">
                                <form role="form">
                                    <h2>个人信息</h2>
                                    <div className="form-group">
                                        <label htmlFor="inputName">姓名</label>
                                        <input type="username" className="form-control" id="username" placeholder="用户名"
                                               required="required"
                                               value={this.state.username} readOnly="true"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">密码</label>
                                        <input type="password" className="form-control" id="password" placeholder="密码"
                                               disabled={true}
                                               required="required" pattern="^.{6,18}$"
                                               value={this.state.password}
                                               onChange={this._onPasswordChange.bind(this)}/>

                                    </div>
                                    {this.state.status === false ? <div></div> :
                                        <div className="form-group">
                                            <label htmlFor="inputConfirmPassword">确认密码</label>
                                            <input type="confirmPassword" className="form-control" id="confirmPassword"
                                                   placeholder="密码"
                                                   required="required" pattern="^.{6,18}$"
                                                   value={this.state.confirmPassword}
                                                   onChange={this._onConfirmPasswordChange.bind(this)}/>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">电子邮箱</label>
                                        <input type="email" className="form-control" id="email" placeholder="邮箱"
                                               disabled={true}
                                               required="required"
                                               value={this.state.email} onChange={this._onEmailChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPhone">手机号码</label>
                                        <input type="phone" className="form-control" id="phone" placeholder="手机"
                                               disabled={true}
                                               required="required" pattern="^(\+86)?(1[0-9]{10})$"
                                               value={this.state.phone} onChange={this._onPhoneChange.bind(this)}/>
                                    </div>
                                    <div className="change">
                                        <button type="button" className="btn btn-primary modify"
                                                onClick={this._onClickModify.bind(this)}>
                                            修改
                                        </button>

                                        <button type="submit" className="btn btn-primary"
                                                onClick={this._onSubmit.bind(this)}>
                                            提交
                                        </button>
                                        <button type="button" className="btn btn-primary"
                                                onClick={this._myAddress.bind(this)}>
                                            我的地址
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                        <div className="tab-pane" id="tab-tow">
                            <div className="row feature-tow">
                            </div>
                        </div>

                        <div className="tab-pane" id="tab-three">
                            <div className="row feature-three">
                                <Link to='/publish'>
                                    <button type="publish" className="btn">我要发布</button>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
export default PersonalCenter;