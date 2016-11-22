import React from 'react';
import {render} from 'react-dom';
import {hashHistory} from 'react-router';
import request from 'superagent';
import Nav from './navigation.jsx';
import _ from 'lodash';
import '../css/publish.css';

class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisher: '',
            author: '',
            name: '',
            selectedImage: null,
            press: '',
            uploadedImages: [],
            count: 0,
            price: 0
        }
    }

    componentWillMount() {
        request
            .get('/api/sessions/current')
            .end((err, res) => {
                if (err) {
                    if (res.statusCode === 403) {
                        alert('请先登录！');
                        return hashHistory.push('/login');
                    }
                }
                return this.setState({
                    publisher: res.text
                });
            });
    }

    render() {
        return <div>
            <Nav/>
            <div className="publish-page">
                <form onSubmit={this._onSubmit.bind(this)}>
                    <label>发布者</label>
                    <input type="text" value={this.state.publisher} className="book-attribute" required="required"
                           disabled="true"/>
                    <label htmlFor="images">上传封面</label>
                    {this.state.uploadedImages.map(i => <img className="img-responsive" key={i} src={i}/>)}
                    <input type="file" id="images" className="upload-images"
                           accept=".jpg,.jpeg,.png,.gif" required="required"
                           onChange={(e)=>this._handleImageChange(e)}/>
                    <button className="upload-images-button" onClick={this._onImgUpload.bind(this)}>上传
                    </button>
                    <div>
                        <label>书名:</label>
                        <input type="text" placeholder="请输入书名" className="book-attribute" required="required"
                               value={this.state.name} onChange={this._bookNameOnChange.bind(this)}/>
                        <label>作者:</label>
                        <input type="text" placeholder="请输入作者" className="book-attribute" required="required"
                               value={this.state.author} onChange={this._authorOnChange.bind(this)}/>
                        <label>出版社:</label>
                        <input type="text" placeholder="请输入出版社" className="book-attribute" required="required"
                               value={this.state.press} onChange={this._pressOnChange.bind(this)}/>
                        <label>售价:</label>
                        <input type="text" placeholder="请输入售价" className="book-attribute" required="required"
                               value={this.state.price} onChange={this._priceOnchange.bind(this)}/>
                        <label>数目:</label>
                        <img src="../pictures/add.png" onClick={this._addCount.bind(this)}/>
                        <label className="book-count">{this.state.count}</label>
                        <img src="../pictures/reduce.png" onClick={this._reduceCount.bind(this)}/>
                        <button className="publish-button" type="submit">
                            发布
                        </button>
                    </div>
                </form>
            </div>
        </div>
    }

    _bookNameOnChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    _authorOnChange(event) {
        this.setState({
            author: event.target.value
        });
    }

    _pressOnChange(event) {
        this.setState({
            press: event.target.value
        });
    }

    _priceOnchange(event) {
        this.setState({
            price: event.target.value
        });
    }

    _handleImageChange(event) {
        const file = event.target.files[0];
        this.setState({
            selectedImage: file
        });
    }

    _onImgUpload(event) {
        const formData = new FormData();
        formData.append('image', this.state.selectedImage);
        request.post('/api/uploaded-images')
            .send(formData)
            .end((err, res) => {
                if (err) return alert('上传失败!');
                const uploadedImagePath = res.text;
                this.setState({
                    uploadedImages: _.concat(this.state.uploadedImages, uploadedImagePath)
                });
            })
    }

    _addCount(event) {
        this.setState({
            count: this.state.count + 1
        });
    }

    _reduceCount(event) {
        if (this.state.count < 1) {
            return false;
        } else {
            var count = this.state.count - 1;
        }
        this.setState({
            count: count
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        request
            .post('/api/books')
            .send({
                publisher: this.state.publisher,
                author: this.state.author,
                name: this.state.name,
                press: this.state.press,
                images: this.state.uploadedImages,
                count: this.state.count,
                price: this.state.price,
                state: true
            })
            .end((err, res) => {
                if (err) return alert(res.text);
                if (res.statusCode === 400) {
                    return alert(res.text);
                }
                if (res.statusCode === 201) {
                    alert('success');
                    return hashHistory.push('/share/' + res.body._id);
                }
            });
    }
}
export default Publish;