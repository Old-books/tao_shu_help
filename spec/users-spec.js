/*
'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from './finish';
import {User} from '../app/mongodb/schema';
import db from '../app/mongodb/db';
import async from 'async';

describe('users-api test', () => {
    beforeEach((done)=> {
        db.connect('test', (err) => {
            if (err) return done.fail(err);
            User.find().remove(finish(done));
        });
    });
    afterEach((done) => {
        db.close(finish(done));
    });
    it('saved json in mongodb', (done)=> {
        async.series([
            (cb) =>request(app)
                .post('/api/users')
                .send({
                    username: 'xy',
                    password: 'zyn199',
                    email: 'zyn123@163.com',
                    phone: '+8618292080565'
                }).expect(201, 'register success', cb)
        ], finish(done));
    });
    it('check repeat username', (done) => {
        async.waterfall([
            (cb) => new User({
                username: 'xy',
                password: 'zyn199',
                email: 'zyn123@163.com',
                phone: '18292080565'
            }).save((err) => {
                if (err) return done.fail(err);
                request(app).post('/api/users').send({
                    username: 'xy',
                    password: 'zyn199',
                    email: 'zyn123@163.com',
                    phone: '18292080565'
                }).expect(409, 'the name is exist', cb);
            })
        ], finish(done));
    });
    it('data is uncompleted', (done) => {
        async.series([
            (cb) =>request(app).post('/api/users').send({
                username: 'lxy',
                password: 'zyn129',
                email: 'yyn123@163.com',
                phone: ''
            }).expect(400, 'Please finish the form', cb)
        ], finish(done));
    });
    it(' wrong email formation', (done) => {
        async.series([

            (cb) =>request(app).post('/api/users').send(
                {username: 'zqs', password: 'zyn129', email: 'yyn123163.com', phone: '18292080565'}
            ).expect(400, 'The email is error', cb)
        ], finish(done));
    });

    describe('wrong phone information', () => {
        it('wrong first number', (done) => {
            async.series([
                (cb) =>request(app).post('/api/users').send(
                    {username: 'qf', password: 'zyn129', email: 'yyn@123163.com', phone: '28292080565'}
                ).expect(400, 'The phone number is error', cb)

            ], finish(done));

        });
        it('wrong length', (done) => {

            async.series([
                (cb) =>request(app).post('/api/users').send(
                    {username: 'xy', password: 'zyn129', email: 'yyn123@163.com', phone: '1829208065'}
                ).expect(400, 'The phone number is error', cb)
            ], finish(done));
        });
        it('wrong content', (done) => {
            async.series([
                (cb) =>request(app).post('/api/users').send(
                    {username: 'ltjn', password: 'zyn129', email: 'yyn123@163.com', phone: '182920805*5'}
                ).expect(400, 'The phone number is error', cb)
            ], finish(done));
        });
    });
});


*/
