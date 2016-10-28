import React from 'react';
class Tip extends React.Component{
    render(){
        return(
            <div className="modal fade" id="about-modal" tabindex="-1" role="dialog" aria-labelledby="modal-label"
                     aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span className="sr-only">关闭</span></button>
                            <h4 className="modal-title" id="modal-label">关于</h4>
                        </div>
                        <div className="modal-body">
                            <p>........................</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">了解了</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tip;