import React from 'react';
import Towcollections from './doublelinebooks.jsx';
class Brief extends React.Component {
    render() {
        return (
            <div className="container summary">
                <ul className="nav nav-tabs" role="tablist" id="feature-tab">
                    <li className="active"><a href="#tab-one" role="tab" data-toggle="tab">a</a></li>
                    <li><a href="#tab-tow" role="tab" data-toggle="tab">b</a></li>
                    <li><a href="#tab-three" role="tab" data-toggle="tab">c</a></li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active" id="tab-one">
                        <div className="row feature">
                            <Towcollections/>
                        </div>
                    </div>

                    <div className="tab-pane" id="tab-tow">
                        <div className="row feature">

                        </div>
                    </div>

                    <div className="tab-pane" id="tab-three">
                        <div className="row feature">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Brief;