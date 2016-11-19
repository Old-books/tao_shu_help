import express from 'express';
import _ from 'lodash';
import {User} from '../mongodb/schema';
import {validateToken, getUsernameFromToken, generateToken} from './cookies';
import {isUserInformationLegal, isExist} from '../shared/user-field-information'

const router = express.Router();

router.get('/', function (req, res, next) {
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        return res.sendStatus(401);
    }
    else {
        validateToken(token, function (err, isValidateToken, user) {
            if (err) return next(err);
            if (isValidateToken) {
                const {username, email, phone, password, _id, province, city, specificAddress} = user;
                return res.json({username, email, phone, password, _id, province, city, specificAddress});
            }
            return res.sendStatus(401);
        });
    }
});

router.post('/:_id', function (req, res, next) {
    const id = req.params._id;
    const userData = req.body;
    const legal = isUserInformationLegal(userData);
    if (legal.type === true && legal.message === 'type is true') {
        User.update({_id: id}, {
            $set: {
                password: userData.password,
                phone: userData.phone,
                email: userData.email,
            }
        }, function (err) {
            if (err)  return next(err);
            res.status(201).send('数据信息已存入数据库');
        });
    }
    else {
        console.log(legal.message);
        return res.status(400).send(legal.message);
    }
});

export default router;