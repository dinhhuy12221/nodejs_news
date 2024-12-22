const Session = require('../app/models/Session');
const User = require('../app/models/User');

createSession = (userId) => {
    try {
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

getSession = async (sessionId) => {
    try {
        return await Session.findOne({ sessionId });
    } catch (error) {
        console.log(error);
    }
};

getUserFromSession = async (sessionId) => {
    try {
        const session = await getSession(sessionId);
        return await User.findOne({ userId: session.userId });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createSession,
    deleteSession,
    getSession,
    getUserFromSession,
};
