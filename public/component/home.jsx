import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Nav from './navigation.jsx';
import ItemNav from './Item.jsx';
import Picture from './picturewall.jsx';
import TowCollections from './doublelinebooks.jsx';
import Brief from './briefnav.jsx';
import 'jquery';
import "bootstrap-webpack";

class Home extends Component {
    render() {
        return <div>
            <Nav/>
            <ItemNav/>
            <Picture/>
            <TowCollections/>
            <Brief/>
        </div>
    }
}
export default Home;