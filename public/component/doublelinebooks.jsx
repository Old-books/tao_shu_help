import React, {Component} from 'react';
import {render} from 'react-dom';
import 'jquery';
import "bootstrap-webpack";
import _ from 'lodash';
import request from 'superagent';
import Single from './singlebook.jsx';
class TowCollections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booklist: [{
                author: "",
                book_name: "",
                press: "",
                uploadedImages: "",
                count: 0,
                price: 0,
                states: "",
                _id: ""
            }]
        };
    }

    componentWillMount() {
        request.post('/api/current/people-books')
            .end((err, res)=> {
                if (err) return alert('页面错误');
                if (res.statusCode === 201) {
                    // console.log(res.body.people_books);
                    let Booklist = [];
                    _.map(res.body.people_books, function ({
                        author, name, press, images, count, price, state, _id}) {
                        Booklist.push({
                            author: author, book_name: name, press: press, uploadedImages: images[0], price: price,
                            count: count, states: state, _id: _id
                        });
                    });
                    (this.setState({booklist: Booklist}));
                    // console.log("fsddf"+this.state.booklist)
                }

            });
    }

    render() {
        const bookList = _.map(this.state.booklist, ({book_name, uploadedImages, price, _id, author, states}) =>
            <div key={_id}>
                <div>
                    <Single booklist={
                    {
                        book_name: book_name, uploadedImages: uploadedImages, price: price, _id: _id,
                        states: states, author: author
                    }}/>
                </div>
            </div>
        );
        return (
            <div>
                <hr/>
                <div className="row">
                    {bookList}
                </div>
            </div>

        );
    }
}
export default TowCollections;