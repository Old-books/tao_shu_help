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
        };
    }


    _onSpecificAddressChange(event) {
        this.setState({
            specificAddress: event.target.value
        });
    }


    _onSubmit(event) {
        event.preventDefault();
        if (this.state.province === '' && this.state.city === '' && this.state.county === '' && this.state.specificAddress === '') {
            alert('请您完善信息!');
        }
        else {
            request.post(`/api/personal/address/${this.props._id}`)
                .send({
                    province: this.state.data.provinces[this.state.province].name,
                    city: this.state.data.provinces[this.state.province].citys[this.state.city].name,
                    county: this.state.data.provinces[this.state.province].citys[this.state.city].countys[this.state.county].name,
                    specificAddress: this.state.specificAddress
                })
                .end((err, res) => {
                    if (err) {
                        if (res.statusCode === 400) {
                            alert("添加有问题");
                        }
                    }
                    if (res.statusCode === 201 && res.text === '地址已存入数据库') {
                        /* hash	返回一个URL的锚部分
                         host	返回一个URL的主机名和端口
                         hostname	返回URL的主机名
                         href	返回完整的URL
                         pathname	返回的URL路径名。
                         port	返回一个URL服务器使用的端口号
                         protocol	返回一个URL协议
                         search*/
                       /* let thisURL = location.hash;
                        console.log("hash    :   " + thisURL);
                        console.log("host    :   " + location.host);
                        console.log("pathname    :   " + location.pathname);
                        console.log("search    :   " + location.search);
                        console.log("href:" + location.href);
                        let startPos = thisURL.toString().indexOf("#");
                        let endPos = thisURL.toString().indexOf("?");
                        console.log("window.location:" + startPos + "   " + endPos + "   " + thisURL.toString().substring(startPos+1, endPos));
                         alert("添加成功!");*/
                        hashHistory.push('/');
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
            county: event.target.value,
        });
    }

    // componentDidUpdate(){
    //     console.log(this.state.options.province);
    //     console.log(this.state.options.city);
    //     console.log(this.state.options.county);
    // }

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
                           value={this.state.specificAddress} onChange={this._onSpecificAddressChange.bind(this)}/>
                </div>
                <div className="change">

                    <button type="submit" className="btn btn-primary"
                            onClick={this._onSubmit.bind(this)}>
                        提交
                    </button>

                    {/*  <Link to = '/personal'>
                     <button type="submit" className="btn btn-primary">
                     返回
                     </button>
                     </Link>*/}
                </div>
            </form>
        </div>
    }

}
export default AddressItem;
