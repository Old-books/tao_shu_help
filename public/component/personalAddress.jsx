import React from 'react';
import request from 'superagent';
import AddressItem from './selectAddress.jsx';
import My_address from './myAddress.jsx';
import {hashHistory, Link} from 'react-router';
require('../css/personAddress.css');
import Nav from './navigation.jsx';
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                if (res.statusCode === 201) {
                    let {_id, province, city, county, specificAddress} = res.body;
                    return (  this.setState({
                            _id: _id,
                            province: province,
                            city: city,
                            county: county,
                            specificAddress: specificAddress
                        })
                    )
                }
            });
    }

    _onChangeAddress() {
        this.setState({
            addressState: true
        });
    }

    render() {
        let addAddress = this.state.addressState ? <AddressItem _id={this.state._id}/> :
            <button className="cart-button" onClick={this._onChangeAddress.bind(this)}>
                <span className="glyphicon glyphicon-plus">添加收货地址</span>
            </button>;
        return (
            <div>
                <div>
                    <Nav/>
                </div>
                <h3>管理地址</h3>
                {(this.state.province != 'noExist' && this.state.city != 'noExist' && this.state.specificAddress != 'noExist') ?
                    <div>
                        <My_address/>
                    </div> : addAddress}
            </div>);
    }
}

export default Address;