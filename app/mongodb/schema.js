import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserModel = new Schema({
    username: String,
    password: String,
    phone: String,
    email: String
});

const publishBookModel = new Schema({
    author: String,
    name: String,
    press: String,
    images: [String],
    count: Number,
    price: Number,
    tags: [String],
    state: Boolean//是否出售
});

const userBookModel = new Schema({
    id_user: String,
    id_book: String,
    publishTime: String
});

const User = mongoose.model('users', UserModel);
const Book = mongoose.model('books', publishBookModel);
const user_book = mongoose.model('userBooks', userBookModel);
module.exports = {User, Book, user_book};
