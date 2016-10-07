import express from 'express';
import {PublishBook} from '../mongodb/schema';
import {isEmpty} from '../../shared/check-books-validation';

const router = express.Router();
router.post('/', function (req, res, next) {
    const {publisher, author, name, press, images, count, price, tags} = req.body;
    const bookAttribute = {publisher, author, name, press, images, count, price, tags};
    if (isEmpty(bookAttribute)) {
        new PublishBook(bookAttribute)
            .save((err, saved)=> {
                if (err) return next(err);
                return res.status(201).send(saved);
            });
    } else {
        return res.status(400).send('内容不能为空');
    }
});

router.post('/search', function (req, res, next) {
    const {searchContent} = req.body;
    const content = {searchContent};
    PublishBook.find({"tags": content.searchContent}, function (err, docs) {
        if (err) return next(err);
        if (docs.length == 0) return res.status(403).send('没有找到相关书籍');
        else {
            return res.status(201).send(docs);
        }
    });
});

router.get('/:id', function (req, res, next) {
    const bookId = req.params.id;
    PublishBook.findOne({_id: bookId}, function (err, book) {
        if (err) return next(err);
        return res.status(200).json(book);
    });
});

export default router;