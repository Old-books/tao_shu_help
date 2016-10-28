import express from 'express';
import {User, user_book} from '../mongodb/schema';

const router = express.Router();
router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    user_book.findOne({id_book: id}, (err, docs)=> {
       // console.log("User_book: "+docs);
        if (err) return next(err);
        const userId = docs.id_user;
        User.findOne({_id: userId}, (err, docs)=> {
          //  console.log("User:"+docs);
            if(err) return next(err);
            return res.status(201).send(docs);
        });
    });
});

export default router;