const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    _id: { type: Number },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Account', AccountSchema);
