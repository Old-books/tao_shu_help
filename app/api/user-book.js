import express from 'express';
import {User, user_book} from '../mongodb/schema';

const router = express.Router();

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    console.log('id:'+ id);
    user_book.findOne({id_book: id}, (err, docs)=> {
        if (err) return next(err);
        const userId = docs.id_user;
        User.findOne({_id: userId}, (err, docs)=> {
            if(err) return next(err);
            return res.status(201).send(docs);
        });
    });
});

export default router;