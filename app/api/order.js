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
        if (doc.length === 0) {
            return res.status(403).send('没有订单');
        }
        order_id = [];
        let order_personal = [];
        let length = doc.length;
        for (let j = 0; j < length; j++) {
            let sum=_.reduce(doc[j].buyedBook,function (total,n) {
                return total+n;
            });
            if(sum==0)
            {
                Order.remove({_id:doc[j]._id},function (err,doc) {
                    if(err) next(err);
                })
            }
            order_personal.push({
                buyedbooks: doc[j].buyedBook,
                buyedCount: doc[j].buyedCount,
                order_id: doc[j]._id
            });
        }
        findBooks(order_personal, (err, book, j) => {
            if (j == (order_personal.length))
                res.status(201).json({book: book});
        });
    });
});

function findBooks(order_personal, callback) {
    let j = 0, books = [];
    _.map(order_personal, ({buyedbooks, buyedCount, order_id}) => {
        get_Book(buyedbooks, order_id, buyedCount, function (err, book, i) {
            j++;
            if ((i == (buyedbooks.length-1))&&(book!=undefined)) {
                for(let personal_book of book)
                {
                    books.push(personal_book);
                }
            }
             if (j == order_personal.length) {
             callback(null, books, j);
             }
        });

    });
}
function get_Book(buyedbooks, order_id, buyedCount, callback) {
    let books = [],i=0;
   _.map(buyedbooks,(book_id)=>{
       Book.find({_id:book_id}, (err, docs) => {
           let doc = docs;
           if(docs!=undefined) {
               books.push({
                   _id: doc[0]._id,
                   order_id: order_id,
                   publisher: doc[0].publisher,
                   author: doc[0].author,
                   name: doc[0].name,
                   press: doc[0].press,
                   count: buyedCount[i],
                   price: doc[0].price,
                   images: doc[0].images,
               });
               if (i == (buyedbooks.length - 1)) {
                   callback(null, books, i);
               }
           }
       i++;
       });
   });
}

router.post('/remove', function (req, res, next) {
    const {book_id, order_id, count, seller} = req.body;
    Order.update({_id: order_id, buyedBook: book_id}, {$set: {"buyedBook.$": 0}}, function (err, order) {
        if (err) next(err);
        return res.status(201).send("确认收货成功")
    });
});
export default router;
