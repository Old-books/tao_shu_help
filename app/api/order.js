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
            book_Count -= count;
            if (book_Count <= 0) book_Count = 0;
            Book.update({_id: _id}, {$set: {count: book_Count}}, function (err) {
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
    let order_id;
    Order.find({custom: custom}, (err, doc) => {
        let buyedbooks = [], buyedCount = [];
        if (doc.length === 0) {
            return res.status(403).send('没有订单');
        }
        order_id = [];
        for (let i = 0; i < doc.length; i++) {
            buyedbooks.push(doc[i].buyedBook);
            let length = doc[i].buyedBook.length;
            for (let j = 0; j < length; j++) order_id.push(doc[i]._id);
            buyedCount.push(doc[i].buyedCount)
        }
        buyedbooks = _.flattenDeep(buyedbooks);
        buyedCount = _.flattenDeep(buyedCount);
        findBooks(buyedbooks, buyedCount, order_id, (err, book) => {
            res.status(201).json({book: book});
        });
    });
});
function findBooks(buyedbooks, buyedCount, order_id, callback) {
    let i = 0, books = [];
    _.map(buyedbooks, (id) => {
        Book.find({_id: id}, (err, docs) => {
            if (err) callback(err);
            let doc = docs;
            books.push({
                _id: doc[0]._id,
                order_id: order_id[i],
                publisher: doc[0].publisher,
                author: doc[0].author,
                name: doc[0].name,
                press: doc[0].press,
                count: buyedCount[i],
                price: doc[0].price,
                images: doc[0].images,
            });
            i++;
            if (i == buyedbooks.length) {
                callback(null, books)
            }
        });
    });
}

router.post('/remove', function (req, res, next) {
    const {book_id, order_id,count,seller} = req.body;
    console.log("into remove " + book_id + " " + seller);
   /* Order.update({_id: order_id}, {$pull: {"buyedBook":book_id,"buyedCount":count,"seller":seller}}, function (err,order) {
        if (err) {
            console.log(err);
        }
        console.log("QQQQQQQQQQQQQQ: "+order);
    });*/
});
export default router;
