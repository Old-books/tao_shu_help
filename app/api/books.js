import express from 'express';
import {Book, user_book, User} from '../mongodb/schema';
import {isEmpty} from '../shared/check-books-validation';

const router = express.Router();
router.post('/', function (req, res, next) {
    const {publisher, author, name, press, images, count, price, tags, state} = req.body;
    const bookAttribute = {publisher, author, name, press, images, count, price, tags, state};
    if (isEmpty(bookAttribute)) {
        var book = new Book({
            publisher:publisher,
            author: author,
            name: name,
            press: press,
            images: images,
            count: count,
            price: price,
            tags: tags,
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

router.post('/search', function (req, res, next) {
    const {searchContent} = req.body;
    const content = {searchContent};
    Book.find({"tags": content.searchContent}, function (err, docs) {
        if (err) return next(err);
        if (docs.length == 0) return res.status(403).send('没有找到相关书籍');
        else {
            return res.status(201).send(docs);
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