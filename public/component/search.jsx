import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import request from 'superagent';
import Nav from './navigation.jsx';
import '../css/search.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.params.content,
            result: []
        }
    }

    componentWillMount() {
        request
            .get(`/api/books/search/${this.props.params.content}`)
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 404) {
                        return alert(res.text);
                    }
                }
                if (res.statusCode === 201) {
                    this.setState({
                        result: res.body
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <Nav/>
                {this.state.result.map(item => <ul className="container bigimg">
                    <li className="search-book-item">{item.images.map(i => <Link to={`/share/${item._id}`}><img
                        key={i} src={i} className="book-image"/></Link>)}
                        <Link to={`/share/${item._id}`}>
                            <p className="name-in-book">{item.name}</p>
                        </Link>
                        <p className="author-in-book">{item.author}</p>
                        <p className="name-in-press">{item.press}</p>
                        <p className="price-in-book"><img src="../pictures/yuan.png"/>{item.price}元</p>
                    </li>
                </ul>)}
            </div>
        )
    }
}

export default SearchPage;