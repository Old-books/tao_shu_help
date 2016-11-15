'use strict';
import express from 'express';
import {Cart, Book} from '../mongodb/schema';
import {getUsernameFromToken, findUser} from './cookies';
import _ from 'lodash';
const router = express.Router();
router.post('/', function (req, res, next) {
    /*Cart.remove({
     }, function (e) {
     if (e) res.send(e.message);
     else console.log('删除成功');
     });*/
    let id_book = req.body.index;
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        return res.status(401).send("请先登陆注册");
    }
    if (token === null || token === undefined || token.length === 0 || !token.includes(':')) {
        return res.status(401).send("请先登陆注册");
    }
    var id_user = '';
    let username = getUsernameFromToken(token);
    findUser(username, function (err, user) {
        if (err) next(err);
        if (user) {
            id_user = user._id;
            console.log("用户的id :" + id_user);
            Cart.findOne({id_user: id_user}, function (err, cart) {
                if (err) next(err);
                // console.log("usercart: " + cart);
                if (cart) {
                    //console.log("该用户存在进入更新: " + id_user);
                    Cart.update({id_user: id_user}, {$push: {id_books: id_book}}, function (err, updatecart) {
                        if (err)  next(err);
                        return res.status(201).send("已经加入购物车!");
                        //console.log(updatecart);
                    })
                }
                else {
                    //console.log(id_book + " 书没有,现在存入数据库");
                    new Cart({
                        id_user: id_user, id_books: id_book
                    }).save(function (err, savacart) {
                        if (err) next(err);
                        return res.status(201).send("已经加入购物车");
                        //console.log("Cart: " + savacart);
                    });
                }

            });
        }
        else return res.status(401).send("没有登陆和注册");
    });


});
router.post('/get_message', function (req, res, next) {
    let id_Cart = [];
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        return res.status(401).send("请先登陆注册");
    }
    if (token === null || token === undefined || token.length === 0 || !token.includes(':')) {
        return res.status(401).send("请先登陆注册");
    }
    var id_user = '';
    let username = getUsernameFromToken(token);
    //   console.log("username" + username);
    findUser(username, function (err, user) {
        if (err) next(err);
        if (user) {
            id_user = user._id;
            Cart.findOne({id_user: id_user}, function (err, cart) {
                if (err) next(err);
                if (cart) {
                    console.log("cart : "+cart);
                    _.map(cart.id_books, function (id_book) {
                        if (id_book) {
                            id_Cart.push(id_book);
                        }
                        else {
                            return res.status(200).send("亲爱的aaaa"+username+": 你的的购物车目前空荡荡的,快去去采购吧");
                        }
                    });
                    getBook(id_Cart, function (book_message, err) {
                        if (err) next(err);
                        if (book_message.length === id_Cart.length) {
                            return res.status(201).json({book_message: book_message});
                        }
                    });
                }
                else {
                    res.status(200).send("亲爱的"+username+": 你的的购物车目前空荡荡的,快去去采购吧");
                }
            });
        }
    })

});
function getMessage(id, callback) {
    Book.findOne({_id: id}, function (err, book) {
        callback(book, null);
    });
}
function getBook(id_Cart, callback) {
    let message = [];
    _.map(id_Cart, function (id) {
        getMessage(id, function (book_message, err) {
            if (err) next(err);
            message.push({
                name: book_message.name,
                images: book_message.images[0],
                price: book_message.price,
                id:book_message._id
            });
            callback(message, null);
        })
    });

}
export default router;