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
                        if (err) next(err);
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
router.post('/delete',function (req,res,next) {
   console.log("into car delete");
   let id=req.body._id;
   let id_user=req.body.id_user;
   Cart.findOne({id_user:id_user},function (err,car) {
       if(err) next(err);
       if(car) {
           let id_books = car.id_books;
           let _id = [id];
           let new_books = _.difference(id_books, _id);
           console.log('car:  ' + car);
           console.log(new_books);
           Cart.update({id_user: id_user}, {$set: {id_books: new_books}}, function (err, newcar) {
               if (err) next(err);
               console.log("new car " + newcar);
               return res.status(201);
           });
       }
       else   return res.status(401);
   });
   console.log("/delete id: "+id_user);
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
                    console.log("cart : " + cart);
                    _.map(cart.id_books, function (id_book) {
                        if (id_book) {
                            id_Cart.push(id_book);
                        }
                        else {
                            return res.status(200).send("亲爱的" + username + ": 你的的购物车目前空荡荡的,快去去采购吧");
                        }
                    });
                    getBook(id_Cart, function (book_message, err) {
                        if (err) next(err);
                        if (book_message.length === id_Cart.length) {
                           let deletebook=deleteRepeat(book_message);
                            console.log("publisher:  "+deletebook[0].publisher);
                            return res.status(201).json({book_message:deletebook,id_user:id_user});
                        }
                    });
                }
                else {
                    res.status(200).send("亲爱的" + username + ": 你的的购物车目前空荡荡的,快去去采购吧");
                }
            });
        }
    })

});
function getMessage(id, callback) {
    Book.findOne({_id: id}, function (err, book) {
        console.log("book~~~~~~~~~"+book);
        callback(book, null);
    });
}
function getBook(id_Cart, callback) {
    let message = [];
    _.map(id_Cart, function (id) {
        getMessage(id, function (book_message, err) {
            if (err) next(err);
            message.push({
                publisher:book_message.publisher,
                name: book_message.name,
                images: book_message.images[0],
                price: book_message.price,
                id: book_message._id
            });
            callback(message, null);
        })
    });

}
function deleteRepeat(book_message) {

    let book=[{
        publisher:book_message[0].publisher,
        name:book_message[0].name,
        images:book_message[0].images,
        price: book_message[0].price,
        id: book_message[0].id,
        count:1
    }];
    console.log("publisher:  "+book_message[0].publisher);
    let k=1;
    for(let i=1;i<book_message.length;i++)
    {
        let flage=true;
       for(let j=0;j<book.length;j++)
       {
           if(_.isEqual(book[j].id,book_message[i].id)===true)
           {
               flage=false;
               book[j].count+=1;break;
           }
       }
       if(flage===true)
       {
           book[k++]={
               publisher:book_message[i].publisher,
               name:book_message[i].name,
               images:book_message[i].images,
               price: book_message[i].price,
               id: book_message[i].id,
               count:1
           };
       }
    }
    return book;
}
export default router;