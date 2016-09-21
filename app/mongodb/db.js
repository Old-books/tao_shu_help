import mongoose from'mongoose';
module.exports = {
  connect: function (mode, callback) {
     let url = 'mongodb://localhost/tao-book-help';
    mongoose.connect(url, callback);
  },
  close: function (callback) {
    mongoose.connection.close(callback);
  }
};


