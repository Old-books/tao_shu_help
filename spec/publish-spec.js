"use strict";
import db from '../app/mongodb/db';
import {User} from '../app/mongodb/schema';
import app from '../app/server';
import request from 'supertest';
import finish from './finish.js';
import async from 'async';
import {PublishBook} from '../app/mongodb/schema';

describe('check books saved', () => {
    beforeEach((done)=> {
        async.series([
            (cb) => db.connect('test', cb),
            (cb) => PublishBook.find().remove(cb)
        ], finish(done));
    });

    afterEach((done)=> {
        db.close(finish(done));
    });
    it('发布者为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: '',
                    author: '普拉塔',
                    name: 'c语言',
                    press: '人民邮电出版社',
                    images: ['/public/uploaded-images/C语言.jpg'],
                    count: '1',
                    price: '10'
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('作者为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: 'nike',
                    author: '',
                    name: 'c语言',
                    press: '人民邮电出版社',
                    images: ['./public/uploaded-images/C语言.jpg'],
                    count: '1',
                    price: '10'
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('书本名为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: 'nike',
                    author: '普拉塔',
                    name: '',
                    press: '人民邮电出版社',
                    images: ['./public/uploaded-images/C语言.jpg'],
                    count: '1',
                    price: '10'
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('出版社为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: 'nike',
                    author: '普拉塔',
                    name: 'c语言',
                    press: '',
                    images: ['./public/uploaded-images/C语言.jpg'],
                    count: '1',
                    price: '10'
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('书本封面为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: 'nike',
                    author: '普拉塔',
                    name: 'c语言',
                    press: '人民邮电出版社',
                    images: [],
                    count: '1',
                    price: '10'
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('书本数量为为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: 'nike',
                    author: '普拉塔',
                    name: 'c语言',
                    press: '人民邮电出版社',
                    images: ['./public/uploaded-images/C语言.jpg'],
                    count: '',
                    price: '10'
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('价格为空', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                    publisher: 'nike',
                    author: '普拉塔',
                    name: 'c语言',
                    press: '人民邮电出版社',
                    images: ['./public/uploaded-images/C语言.jpg'],
                    count: '1',
                    price: ''
                }).expect(400, '内容不能为空', cb)
        ], finish(done));
    });

    it('发布成功', (done) => {
        async.series([
            (cb) => request(app).post('/api/books').send({
                publisher: 'nike',
                author: '普拉塔',
                name: 'c语言',
                press: '人民邮电出版社',
                images: ['./public/uploaded-images/C语言.jpg'],
                count: '1',
                price: '10'
            }).expect(201, cb)
        ], finish(done));
    });

});