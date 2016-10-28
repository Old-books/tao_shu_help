import React, {Component} from 'react';
import {render} from 'react-dom';
import bk from '../pictures/bk.jpg'
import bw from '../pictures/bw.jpg'
import pb from '../pictures/pb.jpg'
import {Link} from 'react-router';
require('../css/picturewall.css');
class Picture extends React.Component{
    render(){
        return (
            <div id="myCarousel" className="carousel slide">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="item active">
                        <img src={bk} alt="First slide"/>
                    </div>
                    <div className="item">
                        <img src={bw} alt="Second slide"/>
                    </div>
                    <div className="item">
                        <img src={pb} alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                <a className="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
            </div>
        );
    }
}

export default Picture;