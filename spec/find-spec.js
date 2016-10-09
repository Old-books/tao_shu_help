"use strict";
import db from '../app/mongodb/db';
import app from '../app/server';
import request from 'supertest';
import {PublishBook} from '../app/mongodb/schema';
import finish from './finish.js';
import async from 'async';

describe('查询书籍', function () {
    beforeEach((done)=> {
        async.series([
            (cb) => db.connect('test', cb),
            (cb) => PublishBook.find().remove(cb),
            (cb) => request(app).post('/api/books').send({
                publisher: 'nike',
                author: '普拉塔',
                name: 'c语言',
                press: '人民邮电出版社',
                images: ['./public/uploaded-images/C语言.jpg'],
                count: '1',
                price: '10',
                tags:['c语言','普拉塔','人民邮电出版社']
            }).end(cb)
        ], finish(done));
    });

    afterEach((done)=> {
        db.close(finish(done));
    });

    it('查询书名', (done) => {
        async.series([
            (cb) => request(app).post('/api/books/search').send({
                searchContent: 'c语言'
            }).expect(201, cb)
        ], finish(done));
    });

    it('查询作者名', (done) => {
        async.series([
            (cb) => request(app).post('/api/books/search').send({
                searchContent: '普拉塔'
            }).expect(201, cb)
        ], finish(done));
    });

    it('查询出版社', (done) => {
        async.series([
            (cb) => request(app).post('/api/books/search').send({
                searchContent: '人民邮电出版社'
            }).expect(201, cb)
        ], finish(done));
    });

    it('查询不到内容', (done) => {
        async.series([
            (cb) => request(app).post('/api/books/search').send({
                searchContent: ''
            }).expect(403, '没有找到相关书籍', cb)
        ], finish(done));
    });
});
