const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        _id: { type: Number },
        userId: { type: Number, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// UserSchema.plugin(AutoIncrement);

module.exports = mongoose.model('User', UserSchema);
