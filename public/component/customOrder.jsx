import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';
import _ from "lodash";

class Customorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            order: []
        }
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
                    request
                        .post('/api/order/personal')
                        .send({custom: this.state.username})
                        .end((err, res) => {
                            if (err) {
                                console.log(err);
                            }
                            if (res.statusCode === 201) {
                                this.setState(
                                    {
                                        order: res.body.book,
                                    }
                                );
                            }
                        })
                }
            });
    }

    render() {
        var i = 0;
        const bookList = _.map(this.state.order, ({_id, name, publisher, images, count, order_id}) =>
            <div key={i++}>
                <Book_list list={
                    {
                        book_id: _id, name: name, publisher: publisher, images: images, count: count, order_id: order_id
                    }}/>
            </div>);
        return ( <div>
            {bookList}
        </div>)

    }
}
class Book_list extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book_id: this.props.list.book_id,
            order_id: this.props.list.order_id,
            name: this.props.list.name,
            publisher: this.props.list.publisher,
            images: this.props.list.images[0],
            count: this.props.list.count,
            isremove: false

        };
    }

    get_Goods() {
        request
            .post('/api/order/remove')
            .send({
                book_id: this.state.book_id,
                order_id: this.state.order_id,
                count: this.state.count,
                seller: this.state.publisher
            })
            .end((err, res) => {
                if (err) alert("页面错误");
                if (res.statusCode === 201) {
                    this.setState({isremove: true});
                    document.getElementById(this.state.book_id).style.display = "none";
                    alert(res.text);
                }
                hashHistory.push('/index');
            });
    }

    render() {
        return <div id={this.state.book_id}>
            <div>
                <h4>书名：{this.state.name}</h4>
                <h4>卖家：{this.state.publisher}</h4>
                <h4>数量:{this.state.count}</h4>
                <img src={this.state.images} width="200px" height="200px"/><br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.get_Goods.bind(this)} className="btn btn btn-success">确认收货</button>

            </div>
        </div>;
    }
}

export default Customorder;