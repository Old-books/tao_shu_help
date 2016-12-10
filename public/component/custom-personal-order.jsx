// import React from 'react';
// import {hashHistory} from 'react-router';
// import request from 'supertest';
//
// class CustomOrder extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             custom: '',
//
//         }
//     }
//
//     componentWillMount() {
//         request
//             .get('/api/sessions/current')
//             .end((err, res) => {
//                 if (err) {
//                     if (res.statusCode === 403) {
//                         alert('请先登录！');
//                         return hashHistory.push('/login');
//                     }
//                 }
//                 return this.setState({
//                     custom: res.text
//                 });
//             });
//
//
//     }
//
//     render() {
//         return (
//
//         )
//     }
// }
//
// export default CustomOrder;