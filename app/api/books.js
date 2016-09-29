import express from 'express';
import {PublishBook} from '../mongodb/schema';
import {isEmpty} from '../../shared/check-books-validation';

const router = express.Router();
router.post('/', function (req, res, next) {
    const {publisher, author, name, press, images, count, price} = req.body;
    const bookAttribute = {publisher, author, name, press, images, count, price};
    if(isEmpty(bookAttribute)){
        new PublishBook(bookAttribute).save((err, saved)=> {
            if (err) return next(err);
            return res.status(201).send(saved);
        });
    } else {
        return res.status(400).send('内容不能为空');
    }
});

export default router;