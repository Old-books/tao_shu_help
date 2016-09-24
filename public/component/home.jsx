import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import 'jquery';
import "bootstrap-webpack";

class Home extends Component {
    render() {
        return <div>
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
        </div>
    }
}
export default Home;