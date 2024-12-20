const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    sessionId: { type: String, required: true },
});

module.exports = mongoose.model('Session', SessionSchema);
