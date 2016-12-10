/**
 * Created by anfen on 16-12-9.
 */
import React from 'react';
import request from 'superagent';
import {hashHistory, Link} from 'react-router';
import _ from "lodash";
class Remind_sell extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            username: '',
            book: []
        });
    }

    componentWillMount() {
        request
            .get('/api/sessions/current')
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 403) {
                        alert('请先登录！');
                        return hashHistory.push('/login');
                    }
                }
                if (res.statusCode === 201) {
                    let username = res.text;
                    this.setState({username: username});
                    request.post('/api/order/remind')
                        .send({name: this.state.username})
                        .end((err, res) => {
                            if (err) {
                                if (res.statusCode === 401)
                                    hashHistory.push('/login');
                                else {
                                    return alert('页面错误');
                                }
                            }
                            if (res.statusCode === 201) {
                                console.log(res.body.user_order);
                                var books = res.body.user_order;
                                let Book_list = [];
                                _.map(books, ({custom, seller, buyedBook, buyedCount}) => {
                                    Book_list.push({
                                        seller: seller,
                                        buyedBook: buyedBook,
                                        buyedCount: buyedCount,
                                        custom: custom
                                    })
                                });
                                return this.setState({book: Book_list});
                            }
                        });
                }
            });
    }

    render() {
        var i = 0;
        const bookList = _.map(this.state.book, ({buyedBook, buyedCount, custom}) =>
            <div key={i++}>
                <Book_list list={
                    {
                        buyedBook: buyedBook, buyedCount: buyedCount, custom: custom
                    }}/>
            </div>);
        return (
            <div>
                {bookList}
            </div>
        )
    }
}

class Book_list extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyedBook: this.props.list.buyedBook,
            buyedCount: this.props.list.buyedCount,
            name: '',
            state: false,
            images: '',
            custom: this.props.list.custom,
            province: '',
            city: '',
            county: '',
            specificAddress: ''
        };
    }

    _onClik_More() {
        request.post('/api/personal/address')
            .send({custom: this.state.custom})
            .end((err, res) => {
                if (err) {
                    alert("页面错误");
                }
                if (res.statusCode === 201) {
                    console.log(res.body);
                    let {province, city, county, specificAddress} = res.body;
                    (  this.setState({
                            province: province,
                            city: city,
                            county: county,
                            specificAddress: specificAddress,
                            states: true
                        })
                    );
                    request
                        .get(`/api/books/${this.state.buyedBook}`)
                        .end((err, res) => {
                            if (err) {
                                alert("页面错误");
                            }
                            console.log(res.body);
                            if (res.statusCode === 200) {
                                return (   this.setState(
                                    {
                                        name: res.body.name,
                                        images: res.body.images[0],
                                    }
                                ))
                            }
                        })

                }
            });

    }

    render() {
        return <div>
            <button onClick={this._onClik_More.bind(this)}>点我查看</button>
            {this.state.states ? <div>被订购的书名{this.state.name}<br/>
                买书人:{this.state.custom}<br/>
                <img src={this.state.images} width="50px" height="50px"/>
                <div>
                    发货地址:{this.state.province}{this.state.city}{this.state.county}{this.state.specificAddress}
                </div>
            </div> : <div></div>}
        </div>;
    }
}

export default Remind_sell;