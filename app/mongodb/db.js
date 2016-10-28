import mongoose from'mongoose';
module.exports = {
    connect: function (mode, callback) {
       /* let url = 'mongodb://localhost/tao-book-help';*/
        let url = process.env.PROD_MONGODB||'mongodb://127.0.0.1:27017/;
        if (mode === 'test') {
            url = 'mongodb://localhost/tao-book-help-test';
        }
        mongoose.connect(url, callback);
    },
    close: function (callback) {
        mongoose.connection.close(callback);
    }
};


