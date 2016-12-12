import React, {Component} from 'react';

import '../css/picturewall.css';
class Slider extends React.Component {
    render() {
        return (
            <div id="myCarousel" className="carousel slide" data-ride="carousel"  data-interval="4000">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="item active">
                        <img src="../pictures/one.jpg" alt="First slide" className="slider-image"/>
                    </div>
                    <div className="item">
                        <img src="../pictures/two.jpg" alt="Second slide" className="slider-image"/>
                    </div>
                    <div className="item">
                        <img src="../pictures/bk.jpg" alt="Third slide" className="slider-image"/>
                    </div>
                </div>

                <a className="carousel-control left" href="#myCarousel"
                   data-slide="prev">&lsaquo;
                </a>
                <a className="carousel-control right" href="#myCarousel"
                   data-slide="next">&rsaquo;
                </a>
            </div>
        )
    }
}

export default Slider;