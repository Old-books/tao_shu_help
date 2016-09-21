import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: String,
  password: String,
  email:String
});
const messageModel = new Schema({
  username: String,
  password: String,
  email:String
});
const User = mongoose.model('users', UserModel);

const Message = mongoose.model('message', messageModel);
module.exports = {User, Message};
