import React from 'react';
import github from '../pictures/tipimg/github.png';
import wechat from '../pictures/tipimg/wechat.png';
require('../css/buttom.css');
class Buttom extends React.Component {
    render() {
        return (
            <div className="container buttom">
                <div className="row feature">
                    <div className="col-md-5">
                        <h2 className="feature-heading">地址:</h2>
                        <p className="lead">陕西省 西安市 长安区 西安邮电大学 东区</p>
                    </div>

                    <div className="col-md-7">
                        <h2 className="feature-heading">联系我们:</h2>
                        <div className="col-md-1">
                            <a href="https://github.com/Old-books/tao_shu_help"><img className="pic" src={github}/></a>
                        </div>

                        <div className="col-md-1">
                            <div className="pic"><img src={wechat}/>
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="active"/>
                <footer>
                    <p className="pull-left">Copyright © 2016：程序员小分队</p>
                    <p className="pull-right"><a href="#">回到顶部</a></p>
                </footer>
            </div>
        )
    }
}

export default Buttom;
