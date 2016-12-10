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

router.post('/remind', function (req, res, next) {
    let name = req.body.name;
    Order.find({seller: {$in: [name]}}, function (err, order) {
        if (err) next(err);
        let custome_orders = order;
        var user_order = [];
        for (let j = 0; j < custome_orders.length; j++) {
            var custom = custome_orders[j].custom;
            if (_.includes(custome_orders[j].seller, name) === true) {
                for (var i = 0; i < custome_orders[j].seller.length; i++) {
                    if (custome_orders[j].seller[i] == name) {
                        user_order.push({
                            custom: custom,
                            seller: custome_orders[j].seller[i],
                            buyedBook: custome_orders[j].buyedBook[i],
                            buyedCount: custome_orders[j].buyedCount[i]
                        });
                    }
                }
            }
        }
        return res.status(201).json({user_order: user_order});

    });
});
router.post('/personal', function (req, res, next) {
    const {custom} = req.body;
    console.log(custom);
    Order.find({custom: custom}, (err, doc) => {
        let buyedbooks = [];
        if (doc.length === 0) {
            return res.status(403).send('没有订单');
        }
        for (let i = 0; i < doc.length; i++) {
            buyedbooks.push(doc[i].buyedBook);
        }

        let booksDetail = [];
        for (let i = 0; i < buyedbooks.length; i++) {
            for (let j = 0; j < buyedbooks[i].length; j++) {
                findBooks(buyedbooks[i][j], (err, detail) => {
                    if (err) return next(err);
                    booksDetail.push(detail);
                    if (i === buyedbooks.length - 1 && j === buyedbooks[i].length - 1) {
                        res.status(201).send(booksDetail);
                    }
                });
            }
        }

        function findBooks(id, callback) {
            Book.find({_id: id}, (err, doc) => {
                if (err) callback(err);
                callback(null, doc);
            });
        }

    });
});

export default router;
