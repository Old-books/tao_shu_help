import React from 'react';
import request from 'superagent';
import {hashHistory, Link} from 'react-router';
require('../css/myAddress.css');
class Myaddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            province: '',
            city: '',
            county: '',
            specificAddress: '',
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
                const {_id, province, city, county, specificAddress} = res.body;
                this.setState({_id, province, city, county, specificAddress});
            });
    }

    _onDelete(event) {
        event.preventDefault();
        request.post(`/api/personal/deleteAddress/${this.state._id}`).end((err, res) => {
            if (err) {
                if (res.statusCode === 400) {
                    alert('未删除,请重试!');
                }
                if (res.statusCode === 404) {
                    alert('未找到!');
                }
            }
            if (res.statusCode === 201) {
                hashHistory.push('/address');
            }
        });

    }

    render() {
        return (
            <div className="my_address">
                <div>
                    省&nbsp;份：{this.state.province}<br/>
                    城&nbsp;市：{this.state.city}<br/>
                    地&nbsp;区：{this.state.county}<br/>
                    详&nbsp;情&nbsp;地&nbsp;址:{this.state.specificAddress}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="delete" className="button4" onClick={this._onDelete.bind(this)}>
                        删&nbsp;除
                    </button>
                </div>
            </div>);
    }
}

export default Myaddress;