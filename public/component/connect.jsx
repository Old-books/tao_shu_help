import React from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import {Link, hashHistory} from 'react-router';
import Nav from './navigation.jsx';
import '../css/connect.css';

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            email: ''
        };
    }

    componentWillMount() {
        request
            .get(`/api/users/${this.props.params.publisher}`)
            .end((err, res) => {
                if (err) return alert('页面错误');
                return this.setState({
                    username: res.body.username,
                    phone: res.body.phone,
                    email: res.body.email
                })
            });
    }

    render() {
        return <div>
            <Nav/>
            <h3 className="message">卖家信息</h3>
            <label className="nike-name">卖家昵称：</label>
            <input className="form-control" value={this.state.username} readOnly="true"/>
            <label className="publisher-phone">卖家联系电话：</label>
            <input className="form-control" value={this.state.phone} readOnly="true"/>
            <label className="publisher-email">卖家邮箱：</label>
            <input className="form-control" value={this.state.email} readOnly="true"/>
        </div>
    }
}

export default Connect;