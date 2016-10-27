'use strict';
import express from 'express';
import {Cart, Book} from '../mongodb/schema';
import {getUsernameFromToken, findUser} from './cookies';
import _ from 'lodash';
const router = express.Router();
router.post('/', function (req, res, next) {
    let id_book = req.body.index;
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        return res.sendStatus(401);
    }
    if (token === null || token === undefined || token.length === 0 || !token.includes(':')) {
        return res.sendStatus(401);
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
    /*   Cart.remove({
     }, function (e) {
     if (e) res.send(e.message);
     else console.log('删除成功');
     });
     */

});
/*router.post('/get_message', function (req, res, next) {
    let id_Cart = [];
    const token = req.cookies['token'];
    if (_.isEmpty(token)) {
        return res.sendStatus(401);
    }
    if (token === null || token === undefined || token.length === 0 || !token.includes(':')) {
        return res.sendStatus(401);
    }
    var id_user = '';
    let username = getUsernameFromToken(token);
    findUser(username, function (err, user) {
        if (err) next(err);
        if (user) {
            id_user = user._id;
            Cart.findOne({id_user: id_user}, function (err, cart) {
                if (err) next(err);
                //console.log("user cart: " + cart);
                if (cart) {
                    console.log("-------------: " + cart.id_books);
                    _.map(cart.id_books, function (id_book) {
                        console.log(" id_book:  " + id_book);
                        if (id_book) {
                            //console.log("id_user: " + id_user + " id_books:  " + id_book);
                            id_Cart.push(id_book)
                        }
                        else {
                            return res.status(404).send("购物车为空");
                        }
                        // console.log("id_Cart: " + id_Cart);
                    });
                    _.map(id_Cart, function (id) {
                        getMessage(id_Cart, function (book_message, err) {
                            if (err) next(err);
                            console.log("book message is " + book_message);
                            console.log("       ");
                            //return res.status(201).json({book_message:book_message});
                        })
                    })

                }
                else {
                    res.status(401).send("没有登陆和注册");
                }
            });
        }
    })

});
function getMessage(id_Cart, callback) {
    let message = [{
        name: '', images: '', price: ''
    }], i = 0;
    /!* _.map(id_Cart, function (id) {*!/
    Book.findOne({_id: id_Cart}, function (err, book) {
        console.log(" book message " + book);

        message.push({name: book.name, images: book.images, price: book.price});
        // console.log("fdbgfdbdg: " + message[0].name);
    });
    /!* });*!/
    callback(message, null);
}*/
export default router;