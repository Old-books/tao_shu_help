import React, {Component} from 'react';
import {render} from 'react-dom';
import Nav from './navigation.jsx';
import 'jquery';
import "bootstrap-webpack";
import _ from 'lodash';
import request from 'superagent';
import {Link} from 'react-router';
class Home extends Component {
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
                    let Booklist = [];
                    _.map(res.body.people_books, function ({
                        author, name, press, images, count, price, state, _id
                    }) {
                        Booklist.push({
                            author: author, book_name: name, press: press, uploadedImages: images[0], price: price,
                            count: count, states: state, _id: _id
                        });

                    });
                    return (this.setState({booklist: Booklist}));

                }

            });
    }


    render() {
        const bookList = _.map(this.state.booklist, ({author, book_name, press, uploadedImages, count, price, _id}) =>
            <div key={_id} >
                <div>
                    <Link to={"/share/" + _id}><  img src={uploadedImages}/></Link>
                    <h4>书名:{book_name}<br/>
                        作者:{book_name}<br/>
                        出版社:{press}<br/>
                        单价:{price}<br/>
                        剩余数量:{count}<br/>
                    </h4>
                    <br/><br/>
                </div>
            </div>
        );

        return <div>
            <Nav/>
            <div>
                <form>
                    <select>
                        <option>学院</option>
                        <option>计算机学院</option>
                    </select>
                    <select>
                        <option>专业</option>
                        <option>计算机科学与技术</option>
                        <option>软件工程</option>
                        <option>网络工程</option>
                    </select>
                    <select>
                        <option>年级</option>
                        <option>大一</option>
                        <option>大二</option>
                        <option>大三</option>
                        <option>大四</option>
                    </select>
                    <input type="button" value="搜索"/>
                </form>
            </div>
            <div id="myCarousel" className="carousel slide">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="item active">
                        <img src="#" alt="First slide"/>
                    </div>
                    <div className="item">
                        <img src="#" alt="Second slide"/>
                    </div>
                    <div className="item">
                        <img src="#" alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control left" href="#myCarousel"
                   data-slide="prev">&lsaquo;
                </a>
                <a className="carousel-control right" href="#myCarousel"
                   data-slide="next">&rsaquo;
                </a>
            </div>
            <div>
                <h2>热销榜</h2>
                <ul>
                    <li><Link to="#">图书1</Link></li>
                    <li><Link to="#">图书2</Link></li>
                    <li><Link to="#">图书3</Link></li>
                    <li><Link to="#">图书4</Link></li>
                    <li><Link to="#">图书5</Link></li>
                </ul>
            </div>
            <div>
                <Link to="#"><img src="#"/></Link>
                <Link to="#"><img src="#"/></Link>
                <Link to="#"><img src="#"/></Link>
            </div>
            <div>
                <br/><br/>
                <h2>书的走廊:</h2>
            </div>
            <div>
                {bookList}
            </div>

        </div>

    }
}
export default Home;