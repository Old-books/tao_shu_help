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

    }


    render() {
        return <div>
            <div className="col-sm-6 col-md-3">
                <div className="thumbnail">
                    <div className="pic"><Link to={"/share/" + this.state._id}><img className="book"
                                                                                    src={this.state.uploadedImages}/></Link>
                    </div>
                    <div className="caption">
                        <h5><Link to={"/share/" + this.state._id}>{this.state.book_name}</Link></h5>
                        <p>...</p>
                        <p><a href="#" className="btn btn-primary" role="button">Button</a>
                            <a href="#" className="btn btn-default" role="button">Button</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Single;