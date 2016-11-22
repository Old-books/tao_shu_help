import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import '../css/picturewall.css';
class Picture extends React.Component {
    render() {
        return (
            <div id="container">
                <div id="list" style={{left:-600 + 'px'}}>
                    <img src="../pictures/three.jpg"/>
                    <img src="../pictures/one.jpg"/>
                    <img src="../pictures/two.jpg"/>
                    <img src="../pictures/three.jpg"/>
                    <img src="../pictures/one.jpg"/>
                </div>
                <div id="buttons">
                    <span tabindex="1" class="on"></span>
                    <span tabindex="2"></span>
                    <span tabindex="3"></span>
                </div>
                <a href="javascript:;" id="prev" className="arrow">&lt;</a>
                <a href="javascript:;" id="next" className="arrow">&gt;</a>
            </div>
        );
    }
}

export default Picture;