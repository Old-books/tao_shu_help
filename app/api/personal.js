import express from 'express';
import _ from 'lodash';
import {validateToken, getUsernameFromToken} from './cookies';

const router = express.Router();

router.get('/', function (req, res, next) {
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        return res.sendStatus(401);
    }
    else {
        validateToken(token, function (err, isValidateToken,user) {
            if (err) return next(err);
            if (isValidateToken) {
                // console.log(user);
                // const username = getUsernameFromToken(token);
                const {username, email, phone,password,_id} = user;
                return res.json({username,email,phone,password,_id});
            }
            return res.sendStatus(401);
        });
    }
});

router.post('/modify',function (req,res,next) {

});

export default router;

