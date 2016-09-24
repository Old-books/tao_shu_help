'use strict';
import express from 'express';
import _ from 'lodash';
import sha1 from 'sha1';
import {User} from '../mongodb/schema';
const router = express.Router();

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("name: " + username + "  password: " + password);
    if (_.isEmpty(username) || _.isEmpty(password)) {
        console.log("empty");
        return res.status(400).send('数据不能为空');
    }
    User.findOne({username: username}, function (err, user) {
        if (err) return next(err);
        if (user === null || user.password != password) {
            console.log("wrong " + user);
            return res.status(401).send("username or password wrong")
        }
        else {
            res.cookie('Info', generateInfo(username, password), {maxAge: 20 * 1000});
            return res.status(201).send('login success');
        }
    });
});
function generateInfo(userId, password) {
    return userId + ':' + sha1(password);
}
export default router;

