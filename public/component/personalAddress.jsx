import React from 'react';
import request from 'superagent';
import AddressItem from './selectAddress.jsx';
import {hashHistory, Link} from 'react-router';
require('../css/personAddress.css');
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*  _id: this.props.location.state._id,
             province: this.props.location.state.province,
             city: this.props.location.state.city,
             county: this.props.location.state.county,
             specificAddress: this.props.location.state.specificAddress,*/
            _id: '',
            province: '',
            city: '',
            county: '',
            specificAddress: '',
            addressState: false
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
                this.setState({_id, province, city, county, specificAddress});
            });
    }

    _onChangeAddress() {
        this.setState({
            addressState: true
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
                event.preventDefault();
                this.setState({
                    addressState: false
                });
                /* let thisURL =location.hash;
                 console.log("hash    :   "+thisURL);
                 console.log("host    :   "+location.host);
                 console.log("pathname    :   "+location.pathname);
                 console.log("search    :   "+location.search);
                 console.log("href:" +location.href);
                 let startPos = thisURL.toString().indexOf("#");
                 let endPos = thisURL.toString().indexOf("?");
                 console.log("window.location:" + startPos + "   " + endPos + "   " + thisURL.toString().substring(startPos+1, endPos));
                 // alert("添加成功!");
                 hashHistory.push(thisURL.toString().substring(startPos+1, endPos));*/
              //  hashHistory.push('/')
            }
        });

    }

    render() {
        let addAddress = this.state.addressState ? <AddressItem _id={this.state._id}/> :
            <button className="cart-button" onClick={this._onChangeAddress.bind(this)}>
                <span className="glyphicon glyphicon-plus">添加收货地址</span>
            </button>;
        return (
            <div>
                <h3>管理地址</h3>
                {this.state.province !== 'noExist' && this.state.city !== 'noExist' && this.state.specificAddress !== 'noExist' ?
                    <div className="address">
                        <label className="address-province">省份：</label>
                        <input className="address form-control" value={this.state.province} readOnly="true"/>
                        <label className="address-city">城市：</label>
                        <input className="address form-control" value={this.state.city} readOnly="true"/>
                        <label className="address-county">地区：</label>
                        <input className="address form-control" value={this.state.county} readOnly="true"/>
                        <label className="address-specificAddress">具体地址：</label>
                        <input className="address form-control" value={this.state.specificAddress} readOnly="true"/>
                        <div className="addressDelete">
                            <button type="delete" className="btn btn-primary" onClick={this._onDelete.bind(this)}>
                                删除
                            </button>
                            {/*<Link to='/personal'>
                             <button type="return" className="btn btn-primary">
                             返回
                             </button>
                             </Link>*/}
                        </div>
                    </div> : addAddress}
            </div>);
    }
}

export default Address;