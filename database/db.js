const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('connected to database'))
    .catch(e => console.error);

module.exports = exports = mongoose;