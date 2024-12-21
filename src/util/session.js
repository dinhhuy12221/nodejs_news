const Session = require('../app/models/Session');

createSession = (userId) => {
    try {
        console.log(userId);

        const sessionId = Date.now().toString();
        Session.create({ sessionId, userId });
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
