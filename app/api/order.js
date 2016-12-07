import express from 'express';
import {Order, Cart, Book} from '../mongodb/schema';
import {checkPassword} from '../shared/check-password-validation';
import _ from 'lodash';
const router = express.Router();

router.post('/', function (req, res, next) {
    const {custom, pay_list, password, id_user} = req.body;
    let buyedBook = [], buyedCount = [], seller = [];
    _.map(pay_list, ({_id, count, publisher}) => {
        buyedBook.push(_id);
        buyedCount.push(count);
        seller.push(publisher);
        Book.findOne({_id: _id}, function (err, book_id) {
            let book_Count = book_id.count;
            Book.update({_id: _id}, {$set: {count: book_Count - count}}, function (err) {
                if (err) next(err);
            })

        });
    });
    Cart.findOne({id_user: id_user}, function (err, car) {
        if (err) next(err);
        if (car) {
            let id_books = car.id_books;
            let new_books = _.difference(id_books, buyedBook);
            Cart.update({id_user: id_user}, {$set: {id_books: new_books}}, function (err) {
                if (err) next(err);
            });
        }
    });

    const data = {custom, password};
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
