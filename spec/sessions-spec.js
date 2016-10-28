/*
'use strict';

import db from '../app/mongodb/db';
import app from '../app/server.js'
import request from 'supertest';
import finish from './finish.js';
import async from 'async';
import {User} from '../app/mongodb/schema';
describe('sessions-spec', () => {

    beforeEach((done)=> {
        async.series([
            (cb) => db.connect('test', cb),
            (cb) => User.find().remove(cb)
        ], finish(done));
    });

    afterEach((done)=> {
        db.close(finish(done));
    });
    it('用户输入的username与密码全都正确，并且注册了', (done)=> {
        async.series([
            (cb) =>new User({
                username: '12345',
                password: '111111'
            }).save((err) => {
                if (err) return done.fail(err);
                request(app).post('/api/sessions').send({
                    username: '12345',
                    password: '111111'
                }).expect(201, 'login success', cb);
            })
        ], finish(done));
    });
    it('用户未注册就登陆 : ', (done) => {
        async.series([
            (cb) => request(app).post('/api/sessions').send({
                username: 's03134053', password: '123456'
            })
                .expect(401, "username or password wrong", cb)
        ], finish(done));
    });
    it('用户输入的用户名密码不匹配：', (done) => {
        async.series([
            (cb) => request(app).post('/api/sessions').send({
                username: 'anfen', password: '122456'
            })
                .expect(401, "username or password wrong", cb)
        ], finish(done));
    });
    it('用户输入用户名或者密码为空：', (done) => {
        async.series([
            (cb) => request(app).post('/api/sessions').send({
                username: '', password: '123456'
            })
                .expect(400, "数据不能为空", cb)
        ], finish(done));
    });
});
*/
