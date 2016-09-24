import express from 'express';
import {User} from '../mongodb/schema';
import {validateEmail, validatePhone} from '../shared/user-field-validation';
const router = express.Router();

function existEmpty(userData) {
    return !(userData.name === '' || userData.password === '' || userData.email === '' || userData.phone === '');
}

function isEmailRight(userData) {
    return validateEmail(userData) !== false;
}

function isPhoneRight(userData) {
    return validatePhone(userData) !== false;
}

function isUserInformationLegal(userData) {
    const isEmpty = existEmpty(userData);
    const isEmail = isEmailRight(userData);
    const isPhone = isPhoneRight(userData);

    if (isEmpty === false) {
        return {type: false, message: 'Please finish the form'};
    } else if (isEmail === false) {
        return {type: false, message: 'The email is error'};
    } else if (isPhone === false) {
        return {type: false, message: 'The phone number is error'};
    }
    return {type: true, message: 'type is true'};
}


function isExist(userData, next, callback) {
    User.findOne({username: userData.username}, function (err, doc) {
        if (err) return next(err);

        callback(null, doc);
    });
}

router.post('/', function (req, res, next) {
    const userData = req.body;
    const legal = isUserInformationLegal(userData);


    if (legal.type === true) {

        isExist(userData, next, function (err, doc) {
            if (err) return next(err);
            if (doc === null) {
                var user = new User({
                    username: userData.username,
                    password: userData.password,
                    email: userData.email,
                    phone: userData.phone
                });
                // User.remove({},function (user,err) {
                // if(err) next(err);
                //     console.log("re"+user);
                // });
                user.save(function (err) {
                    if (err) return next(err);
                    console.log('save status:', err ? 'failed' : 'success');
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
