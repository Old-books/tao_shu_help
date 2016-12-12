import React from 'react';
import request from 'superagent';
import {hashHistory, Link} from 'react-router';
import areaData from '../../shared/areaData.js';
let _ = require('lodash');
class AddressItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                province: '110000',
                city: '110100',
                county: '110101',
                defaultText: ['省份', '城市', '县区']
            },
            data: areaData,
            specificAddress: '',
            addressState: true,
            addressPhone:''
        };
    }


    _onSpecificAddressChange(event) {
        this.setState({
            specificAddress: event.target.value
        });
    }


    _onSubmit(event) {
        event.preventDefault();
        if (this.state.province === '' && this.state.city === '' && this.state.county === '' && this.state.specificAddress === '' && this.state.phone) {
            alert('请您完善信息!');
        }
        else {
            request.post(`/api/personal/address/${this.props._id}`)
                .send({
                    province: this.state.data.provinces[this.state.province].name,
                    city: this.state.data.provinces[this.state.province].citys[this.state.city].name,
                    county: this.state.data.provinces[this.state.province].citys[this.state.city].countys[this.state.county].name,
                    specificAddress: this.state.specificAddress,
                    addressPhone:this.state.addressPhone
                })
                .end((err, res) => {
                    if (err) {
                        if (res.statusCode === 400) {
                            alert("添加有问题");
                        }
                    }
                    if (res.statusCode === 201 && res.text === '地址已存入数据库') {
                        this.setState({
                            addressState: false
                        });
                        hashHistory.push('/My_address');
                    }
                });
        }
    }

    selectProvince(event) {
        this.setState({
            province: event.target.value,
            city: '',
            county: ''
        });
    }

    selectCity(event) {
        this.setState({
            city: event.target.value,
            county: ''
        });
    }

    selectCounty(event) {
        this.setState({
            county: event.target.value
        });
    }

    onPhoneChange(event) {
        this.setState({
           addressPhone: event.target.value
        });
    }


    render() {
        var data = this.state.data, options = $.extend({
            defaultName: ['provinceId', 'cityId', 'countyId'],
            defaultText: ['请选择', '请选择', '请选择']
        }, this.state.options);

        var provs = [], citys = [], countys = [];
        for (var i in data.provinces) {
            provs.push([i, data.provinces[i].name])
        }
        provs = _.map(provs, (item) => {
            return <option value={item[0]}>{item[1]}</option>;
        });

        if (this.state.province) {
            for (var i in data.provinces[this.state.province].citys) {
                citys.push([i, data.provinces[this.state.province].citys[i].name])
            }
            citys = _.map(citys, (item) => {
                return <option value={item[0]}>{item[1]}</option>;
            });
        }

        if (this.state.province && this.state.city) {
            for (var i in data.provinces[this.state.province].citys[this.state.city].countys) {
                countys.push([i, data.provinces[this.state.province].citys[this.state.city].countys[i].name]);
            }
            countys = _.map(countys, (item) => {
                return <option value={item[0]}>{item[1]}</option>;
            });
        }
        return <div>
            <div className="J_area_selector" key={i}>
                <select className="J_area_prov" name={options.defaultName[0]} value={this.state.province}
                        onChange={this.selectProvince.bind(this)}>
                    <option value="">{options.defaultText[0]}</option>
                    {provs}
                </select>
                <select className="J_area_city" name={options.defaultName[1]} value={this.state.city}
                        onChange={this.selectCity.bind(this)}>
                    <option value="">{options.defaultText[1]}</option>
                    {citys}
                </select>
                <select className="J_area_county" name={options.defaultName[2]} value={this.state.county}
                        onChange={this.selectCounty.bind(this)}>
                    <option value="">{options.defaultText[2]}</option>
                    {countys}
                </select>
            </div>
            <form role="form">
                <div className="form-group">
                    <label htmlFor="inputSpecificAddres">具体地址</label>
                    <input type="specificAddress" className="form-control"
                           required="required"
                           value={this.state.specificAddress} onChange={this._onSpecificAddressChange.bind(this)}/><br/>
                    <label>联系电话：</label>
                    <input type="text" value={this.state.addressPhone} onChange={this.onPhoneChange.bind(this)}/>
                </div>
                <div className="change">

                    <button type="submit" className="btn btn-primary"
                            onClick={this._onSubmit.bind(this)}>
                        保存
                    </button>
                </div>
            </form>
        </div>
    }

}
export default AddressItem;
