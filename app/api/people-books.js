'use strict';
import express from 'express';
import {Book} from '../mongodb/schema';
import _ from 'lodash';
const router = express.Router();
router.post('/', function (req, res, next) {

    let people_books = [{
        author: '',
        book_name: '',
        press: '',
        images: '',
        count: 0,
        price: 0,
        states: ''
    }], i = 0;
    let books = [];
    Book.find({}, function (err, people_book) {
        if (err) return next(err);
        _.map(people_book, function ({
            author, name, press, images, count, price, state, _id
        }) {
            if (state === true)
                people_books[i++] = ({author, name, press, images, count, price, state, _id});
        });
        for (let j = 0; j < people_books.length; j++) {
            books.push(people_books[j]);
        }
        return res.status(201).json({people_books: books});
    })


});

export default router;