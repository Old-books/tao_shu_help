import SignIn from './component/login.jsx'
import Register from './component/register.jsx'
import App from './component/app.jsx';
import Home from './component/home.jsx';
import Picture from './component/picturewall.jsx';
import Publish from './component/publish.jsx';
import Share from './component/share.jsx';
import Book_cart from './component/cart.jsx';
import Personal from './component/personal-page.jsx';
import Connect from './component/connect.jsx';
import TowCollections from './component/doublelinebooks.jsx';
import Brief from './component/briefnav.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
require('jquery');
require("bootstrap-webpack");

const router = <Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to='/index'/>
        <Route path='/publish' component={Publish}/>
        <Route path='/index' component={Home}/>
        <Route path='/picture' component={Picture}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={SignIn}/>
        <Route path='/share/:id' component={Share}/>
        <Route path='/personal' component={Personal}/>
        <Route path='/connect/:id' component={Connect}/>
        <Route path='/TowCollections' component={TowCollections}/>
        <Route path='/Brief' component={Brief}/>
        <Route path='/cart' component={Book_cart}/>
    </Route>
</Router>;

ReactDOM.render(
    router,
    document.getElementById("content")
);

console.log($('#content').text());

if (module.hot) {
    module.hot.accept();
}
