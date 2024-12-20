const User = require('../models/User');
const { createSession } = require('../../util/session');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class LoginController {
    // [GET] /
    async loginGet(req, res) {
        res.render('login', {
            isNotValid: req.query.isNotValid,
        });
    }

    async loginPost(req, res, next) {
        await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
            .then((user) => {
                if (user) {
                    const sessionId = createSession(mongooseToObject(user));
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
}

module.exports = new LoginController();
