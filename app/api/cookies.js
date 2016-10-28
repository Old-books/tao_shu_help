'use strict';
import {User} from '../mongodb/schema';
import sha1 from 'sha1';
import _ from 'lodash';

function generateToken(username, password) {
    return username + ':' + sha1(password);
}

function validateToken(token, callback) {
    if (token === null || token === undefined || token.length === 0 || !token.includes(':')) {
        return callback(null, false);
    }
    const username = getUsernameFromToken(token);
    findUser(username, function (err, user) {
        if (err)  return callback(err);
        if (user) {
            const {username, password} = user;
            callback(null, generateToken(username, password) === token, user);
        }
    });
}

function getUsernameFromToken(token) {
    const index = _.lastIndexOf(token, ':');
    return token.substring(0, index);
}

function findUser(username, callback) {
    User.findOne({username}, function (err, user) {
        if (err) return callback(err);
        callback(null, user);
    });
}
export {
    validateToken,
    getUsernameFromToken,findUser
};
