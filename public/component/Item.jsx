import React, {Component} from 'react';
class Item extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">简介</a></li>
                            <li><a href="#">二手市场</a></li>
                            <li><a href="#">同学发布</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Item;