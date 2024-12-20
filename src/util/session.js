const Session = require('../app/models/Session');

createSession = (user) => {
    try {
        const sessionId = Date.now().toString() + user._id;
        Session.create({ sessionId });
        return sessionId;
    } catch (error) {
        console.log(error);
    }
    return null;
};

deleteSession = (sessionId) => {
    try {
        Session.deleteOne({ sessionId });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createSession };
