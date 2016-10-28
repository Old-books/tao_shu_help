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
const cartModel = new Schema({
    id_user: String,
    id_books: [String]
});
const bargainModel = new Schema({
    id_order: String,
    finished: Boolean//是否下单完成
});
const orderModel = new Schema({
    orderUser: String,
    purchaseBook: [String],
    purchaseCount: [Number]
});

const User = mongoose.model('users', UserModel);
const Book = mongoose.model('books', publishBookModel);
const user_book = mongoose.model('userBooks', userBookModel);
const Cart = mongoose.model('carts', cartModel);
const Bargain = mongoose.model('bargains', bargainModel);
const Order = mongoose.model('orders', orderModel);
module.exports = {User, Book, user_book,Cart, Bargain, Order};
