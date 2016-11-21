import express from 'express';
import {Book, user_book, User} from '../mongodb/schema';
import {isEmpty} from '../shared/check-books-validation';

const router = express.Router();
router.post('/', function (req, res, next) {
    const {publisher, author, name, press, images, count, price, state} = req.body;
    const bookAttribute = {publisher, author, name, press, images, count, price, state};
    if (isEmpty(bookAttribute)) {
        let book = new Book({
            author: author,
            name: name,
            press: press,
            images: images,
            count: count,
            price: price,
            state: state
        });

        book.save((err, book) => {
            if (err) return next(err);
            User.findOne({username: publisher}, (err, user) => {
                var userBook = new user_book({
                    id_user: user._id,
                    id_book: book._id,
                    publishTime: Date.now()
                });

                userBook.save((err) => {
                    if (err) return next(err);
                });
            });
            return res.status(201).send(book);
        });

    } else {
        return res.status(400).send('内容不能为空');
    }
});

router.get('/search/:content', function (req, res, next) {
    const text = req.params.content;
    console.log("查找的内容：" + text);
    Book.find(
        {
            $or: [
                {name: {$regex: text, $options: 'i'}},
                {author: {$regex: text, $options: 'i'}},
                {press: {$regex: text, $options: 'i'}}
            ]
        }, (err, docs) => {
            if (err) {
                if (docs.length === 0) {
                    res.status(404).send("没有找到相关书籍");
                }
                return next(err);
            } else {
                res.status(201).send(docs);
            }
        });
});

router.get('/:id', function (req, res, next) {
    const bookId = req.params.id;
    Book.findOne({_id: bookId}, function (err, book) {
        if (err) return next(err);
        return res.status(200).json(book);
    });
});


export default router;