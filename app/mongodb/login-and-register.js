import {User} from './schema';

exports.remove = function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    User.remove({
        username: name,
        password: password
    }, function (e) {
        if (e) res.send(e.message);
        else res.send('删除成功');
    });
};