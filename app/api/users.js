import express from 'express';
import {User} from '../mongodb/schema';
const router = express.Router();
import {isUserInformationLegal, isExist} from '../shared/user-field-information';

router.post('/', function (req, res, next) {
    const userData = req.body;
    const legal = isUserInformationLegal(userData);
    if (legal.type === true && legal.message === 'type is true') {

        isExist(userData, next, function (err, doc) {
            if (err) return next(err);
            if (doc === null) {
                var user = new User({
                    username: userData.username,
                    password: userData.password,
                    email: userData.email,
                    phone: userData.phone,
                    province: 'noExist',
                    city: 'noExist',
                    county: 'noExist',
                    specificAddress: 'noExist'
                });
                user.save(function (err) {
                    if (err) return next(err);
                    res.status(201).send('register success');
                });
            }
            else if (doc !== null) {
                res.status(409).send('the name is exist');
            }
        });
    }
    else {
        res.status(400).send(legal.message);
    }
});


export default router;
