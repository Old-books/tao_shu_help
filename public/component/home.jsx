import React, {Component} from 'react';
import {render} from 'react-dom';
import Nav from './navigation.jsx';
import Picture from './picturewall.jsx';
import TowCollections from './doublelinebooks.jsx';
import Buttom from './buttom.jsx';
import 'jquery';
import "bootstrap-webpack";

class Home extends Component {
    render() {
        return <div>
            <Nav/>
            <Picture/>
            <TowCollections/>
            <Buttom/>
        </div>
    }
}

export default Home;