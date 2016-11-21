import express from 'express';
import {Order} from '../mongodb/schema';
import {checkPassword} from '../shared/check-password-validation';

const router = express.Router();

router.post('/', function (req, res, next) {
    const {custom, buyedBook, buyedCount, seller, password} = req.body;
    const data = {custom, buyedBook, buyedCount, seller, password};
    checkPassword(data, function (err, user) {
        if (err) return next(err);
        if (user.password === password) {
            let order = new Order({
                custom: custom,
                buyedBook: buyedBook,
                buyedCount: buyedCount,
                seller: seller
            });

            order.save((err) => {
                if (err) return next(err);
                return res.status(201).send("支付成功");
            });
        } else {
            return res.status(403).send("密码有误");
        }
    });
});

export default router;
