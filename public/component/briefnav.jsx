import React from 'react';
import Towcollections from './doublelinebooks.jsx';
class Brief extends React.Component {
    render() {
        return (
            <div className="container summary">
                <ul className="nav nav-tabs" role="tablist" id="feature-tab">
                    <li className="active"><a href="#tab-one" role="tab" data-toggle="tab">热卖图书</a></li>
                    <li><a href="#tab-tow" role="tab" data-toggle="tab">特价图书</a></li>
                    <li><a href="#tab-three" role="tab" data-toggle="tab">新书上架</a></li>
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