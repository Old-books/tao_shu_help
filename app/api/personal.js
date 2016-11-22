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
                const {username, email, phone, password, _id, province, city, county, specificAddress} = user;
                return res.json({username, email, phone, password, _id, province, city, county, specificAddress});
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

router.post('/address/:_id', function (req, res, next) {
    const id = req.params._id;
    const userAddress = req.body;
    User.update({_id: id}, {
        $set: {
            province: userAddress.province,
            city: userAddress.city,
            county: userAddress.county,
            specificAddress: userAddress.specificAddress,
        }
    }, function (err) {
        if (err) return next(err);
        return res.status(201).send('地址已存入数据库');
    });
});

router.post('/deleteAddress/:_id', function (req, res, next) {
    const id = req.params._id;
    User.update({_id: id}, {
        $set: {
            province: 'noExist',
            city: 'noExist',
            county: 'noExist',
            specificAddress: 'noExist'
        }
    }, function (err) {
        if (err) return next(err);
        res.status(201).send('地址已删除!');
    });
});

export default router;

