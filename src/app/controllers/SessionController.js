const User = require('../models/User');
const {
    createSession,
    deleteSession,
    getSession,
    getUserFromSession,
} = require('../../util/session');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const Session = require('../models/Session');

class SessionController {
    // [GET] /login
    async loginGet(req, res, next) {
        getSession(req.cookies.sessionId)
            .then((session) => {
                if (session) {
                    res.redirect('/me/stored/posts');
                } else {
                    res.render('login', {
                        layout: 'loginLayout',
                        isNotValid: req.query.isNotValid,
                    });
                }
            })
            .catch(next);
    }

    // [POST] /login
    async loginPost(req, res, next) {
        await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
            .then((user) => {
                if (user) {
                    Session.deleteMany({ userId: user.userId });
                    const sessionId = createSession(user.userId);
                    res.setHeader(
                        'Set-Cookie',
                        `sessionId=${sessionId}; max-age=3600; httpOnly;`,
                    );
                    res.redirect('/me/stored/posts');
                } else {
                    res.status(401).redirect('login?isNotValid=true');
                }
            })
            .catch(next);
    }

    // [POST] /logout
    async logout(req, res, next) {
        const session = getSession(req.cookies.sessionId);

        await Session.deleteMany({ userId: session.userId })
            .then(() => {
                res.clearCookie('sessionId').redirect('/');
            })
            .catch(next);
    }
}

module.exports = new SessionController();
