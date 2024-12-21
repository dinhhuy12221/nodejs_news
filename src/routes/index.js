const postsRouter = require('./posts');
const siteRouter = require('./site');
const meRouter = require('./me');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const Session = require('../app/models/Session');
const User = require('../app/models/User');

function route(app) {
    app.use(async (req, res, next) => {
        const session = await Session.findOne({
            sessionId: req.cookies.sessionId,
        });
        if (session) {
            const user = await User.findOne({ userId: session.userId });
            if (user) {
                app.locals.username = user.username;
            }
            app.locals.isLogin = session.sessionId ? true : false;
        } else {
            app.locals.isLogin = false;
        }
        next();
    });
    app.use('/posts', postsRouter);
    app.use('/me', meRouter);
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/', siteRouter);
}

module.exports = route;
