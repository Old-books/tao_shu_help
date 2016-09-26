import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserModel = new Schema({
    username: String,
    password: String,
    phone: String,
    email: String
});
const User = mongoose.model('users', UserModel);
module.exports = {User};
