import React, {Component} from 'react';
import {render} from 'react-dom';
import 'jquery';
import "bootstrap-webpack";
import {Link} from 'react-router';
require('../css/singlebook.css');

class Single extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: this.props.booklist.author,
            book_name: this.props.booklist.book_name,
            press: this.props.booklist.press,
            uploadedImages: this.props.booklist.uploadedImages,
            price: this.props.booklist.price,
            states: this.props.booklist.states,
            _id: this.props.booklist._id
        };
        console.log("fds" + this.state._id);

    };


    render() {
        return <div>
            <div className="col-sm-6 col-md-3">
                <div className="thumbnail">
                    <div className="pic"><Link to={"/share/" + this.state._id}><img className="book"
                                                                                    src={this.state.uploadedImages}/></Link>
                        <ul className="singlebook-list">
                            <li><Link to={"/share/" + this.state._id}
                                  className="singlebook-detail">{this.state.book_name}</Link></li>
                            <li className="singlebook-price"><img src="../pictures/yuan.png"/>{this.state.price}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Single;