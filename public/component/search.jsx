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
                {this.state.result.map(item => <div className="container">
                    <ul className="bigimg">
                        <li className="search-book-item">{item.images.map(i => <Link to={`/share/${item._id}`}><img key={i} src={i} className="book-image"/></Link>)}
                            <Link to={`/share/${item._id}`}>
                                <p className="name-in-book">{item.name}</p>
                            </Link>
                            <p>{item.press}</p>
                            <p>{item.price}</p>
                        </li>
                    </ul>
                </div>)}
            </div>
        )
    }
}
// [
//     {
//         "_id": "5832bbabb44df50e84444d84",
//         "author": "zhaotong",
//         "name": "Linux",
//         "press": "aaa",
//         "count": 1,
//         "price": 10,
//         "state": true,
//         "__v": 0,
//         "images": ["./uploaded-images/138-141022104353-1479719836488.jpg"]
//     }
// ]
export default SearchPage;