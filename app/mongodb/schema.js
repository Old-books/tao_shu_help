import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserModel = new Schema({
    username: String,
    password: String,
    phone: String,
    email: String
});

const publishBookModel = new Schema({
    publisher: String,
    author: String,
    name: String,
    press: String,
    images: [String],
    count: Number,
    price: Number,
    tags:[String]
});

const User = mongoose.model('users', UserModel);
const PublishBook = mongoose.model('books', publishBookModel);
module.exports = {User, PublishBook};
