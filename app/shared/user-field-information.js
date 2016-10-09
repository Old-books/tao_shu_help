import {User} from '../mongodb/schema';
import {validateEmail, validatePhone} from './user-field-validation';
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
module.exports = {
    isUserInformationLegal,
    isExist
};