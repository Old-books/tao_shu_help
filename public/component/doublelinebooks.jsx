import React, {Component} from 'react';
import Single from './singlebook.jsx';
class TowCollections extends React.Component {
    render() {
        return (
            <div className="aa">
                <hr/>
                <div className="row">
                    <Single/>
                    <Single/>
                    <Single/>
                    <Single/>
                    <Single/>
                    <Single/>
                    <Single/>
                    <Single/>
                </div>
            </div>

        );
    }
}
export default TowCollections;