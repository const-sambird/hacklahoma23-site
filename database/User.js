const mongoose = require('../database/db');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: String,
    phone: String,
    score: Number,
    api_key: String
});

userSchema.methods.createKey = function createKey() {
    this.api_key = crypto.randomUUID();
};

module.exports = mongoose.model('User', userSchema);
