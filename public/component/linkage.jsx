import React, {Component} from 'react';
class Linkage extends React.Component{
    render(){
        return (
            <div>
                <form>
                    <select>
                        <option>学院</option>
                        <option>计算机学院</option>
                    </select>
                    <select>
                        <option>专业</option>
                        <option>计算机科学与技术</option>
                        <option>软件工程</option>
                        <option>网络工程</option>
                    </select>
                    <select>
                        <option>年级</option>
                        <option>大一</option>
                        <option>大二</option>
                        <option>大三</option>
                        <option>大四</option>
                    </select>
                    <input type="button" value="搜索"/>
                </form>
            </div>
        );
    }
}

export default Linkage;