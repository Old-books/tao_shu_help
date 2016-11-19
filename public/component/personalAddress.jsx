import React from 'react';
import ReactMount from 'react';
import request from 'superagent';
import {hashHistory, Link} from 'react-router';
require('../css/personAddress.css');
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: this.props.location.state.province,
            city: this.props.location.state.city,
            specificAddress: this.props.location.state.specificAddress,
            addressState: false
        };
    }

    _onChangeAddress() {
        this.setState({
            addressState: true
        });
    }

    _onDelete() {

    }

    render() {
        let addAddress = this.state.addressState ? <AddressItem/> :
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
                        <label className="address-specificAddress">具体地址：</label>
                        <input className="address form-control" value={this.state.specificAddress} readOnly="true"/>
                        <div className="addressDelete">
                            <button type="delete" className="btn btn-primary" onClick={this._onDelete.bind(this)}>
                                删除
                            </button>
                        </div>
                    </div> : addAddress}
            </div>);
    }
}

class AddressItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: '',
            city: '',
            specificAddress: ''
        };
    }

    _onProvinceChange(event) {
        this.setState({
            province: event.target.value
        });
    }

    _onCityChange(event) {
        this.setState({
            city: event.target.value
        });
    }

    _onSpecificAddressChange(event) {
        this.setState({
            specificAddress: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        if (this.state.province === '' && this.state.city === '' && this.state.specificAddress === '') {
            alert('请您完善信息!');
        }
        else {
            request.post('/api/users')
                .send({
                    province: this.state.province,
                    city: this.state.city,
                    specificAddress: this.state
                })
                .end((err, res) => {
                    if (res.statusCode === 201) {
                        alert("添加成功!");
                    }
                    if (res.statusCode === 400) {
                        alert("添加有问题");
                    }
                });
        }
    }
    _onReturn(){
        hashHistory.push('/personal');
    }
    render() {
        return (
            <div className="row feature-one">
                <form role="form">
                    <h2>个人信息</h2>
                    <div className="form-group">
                        <label htmlFor="inputProvince">省份</label>
                        <input type="province" className="form-control"
                               value={this.state.province} onChange={this._onProvinceChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCity">城市</label>
                        <input type="city" className="form-control"
                               required="required"
                               value={this.state.city} onChange={this._onCityChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSpecificAddres">具体地址</label>
                        <input type="specificAddress" className="form-control"
                               required="required"
                               value={this.state.specificAddress} onChange={this._onSpecificAddressChange.bind(this)}/>
                    </div>

                    <div className="change">
                        <button type="submit" className="btn btn-primary"
                                onClick={this._onSubmit.bind(this)}>
                            提交
                        </button>
                    </div>
                    <div className="return">
                        <button type="submit" className="btn btn-primary"
                                onClick={this._onReturn.bind(this)}>
                            返回
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}
export default Address;