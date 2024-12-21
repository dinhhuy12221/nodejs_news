const User = require('../models/User');
const { createSession, deleteSession } = require('../../util/session');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const Session = require('../models/Session');

class SessionController {
    // [GET] /login
    async loginGet(req, res) {
        res.render('login', {
            title: 'Trang đăng nhập',
            layout: 'loginLayout',
            isNotValid: req.query.isNotValid,
        });
    }

    // [POST] /login
    async loginPost(req, res, next) {
        await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
            .then((user) => {
                if (user) {
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
        await Session.deleteOne({ sessionId: req.cookies.sessionId })
            .then(() => {
                res.clearCookie('sessionId').redirect('/');
            })
            .catch(next);
    }
}

module.exports = new SessionController();
