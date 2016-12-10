import {User,Book} from '../mongodb/schema';

function checkPassword(data, callback) {
    User.findOne({username: data.custom}, function (err, user) {
        if (err) return callback(err);
        callback(null, user);
    });
}

export{checkPassword};