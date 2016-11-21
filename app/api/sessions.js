'use strict';
import express from 'express';
import _ from 'lodash';
import sha1 from 'sha1';
import {validateToken, getUsernameFromToken} from './cookies';
import {User, Book, user_book,Cart} from '../mongodb/schema';
const router = express.Router();

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("name: " + username + "  password: " + password);
/*    Cart.remove({
    }, function (e) {
        if (e) res.send(e.message);
        else console.log('cart 删除成功');
    })
    User.remove({
    }, function (e) {
        if (e) res.send(e.message);
        else console.log('user 删除成功');
    })
    Book.remove({
    }, function (e) {
        if (e) res.send(e.message);
        else console.log('book 删除成功');
    })
    user_book.remove({
    }, function (e) {
        if (e) res.send(e.message);
        else console.log('userbook  删除成功');
    })*/
    if (_.isEmpty(username) || _.isEmpty(password)) {
        console.log("empty");
        return res.status(400).send('数据不能为空');
    }
    User.findOne({username: username}, function (err, user) {
        if (err) return next(err);
        if (user === null || user.password != password) {
            console.log("wrong " + user);
            res.status(401).send("username or password wrong");
        }
        else {
            res.cookie('token', generateToken(username, password));
            res.status(201).send('login success');
        }
    });
});

router.get('/current', function (req, res, next) {
    const token = req.cookies['token'];
    validateToken(token, function (err, validToken) {
        if (err) return next(err);
        if (validToken) {
            const username = getUsernameFromToken(token);
            return res.status(201).send(username);
        }
        return res.sendStatus(403);
    });
});

router.delete('/current', function (req, res) {
    res.cookie('token', ':').sendStatus(200);
});

function generateToken(username, password) {
    return username + ':' + sha1(password);
}
export default router;
// {maxAge: 30*1000}
