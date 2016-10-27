import React, {Component} from 'react';
import a from '../uploaded-images/c语言.jpg'
require('../css/singlebook.css');

class Single extends React.Component {

    render() {
        return <div>
            <div className="col-sm-6 col-md-3">
                <div className="thumbnail">
                    <div className="pic"><img className="book" src={a}/></div>
                    <div className="caption">
                        <h3><a href="#">Thumbnail label</a></h3>
                        <p>...</p>
                        <p><a href="#" className="btn btn-primary" role="button">Button</a>
                            <a href="#" className="btn btn-default" role="button">Button</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Single;