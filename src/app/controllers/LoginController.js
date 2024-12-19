const Account = require('../models/Account');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
class LoginController {
    // [GET] /
    async loginGet(req, res) {
        res.render('login');
    }

    async loginPost(req, res, next) {
        const account = await Account.findOne({
            username: req.body.username,
            password: req.body.password,
        })
            .then(() => res.redirect('/'))
            .catch(next);
    }
}

module.exports = new LoginController();
