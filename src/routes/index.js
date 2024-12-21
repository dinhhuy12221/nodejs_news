const postsRouter = require('./posts');
const siteRouter = require('./site');
const meRouter = require('./me');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const Session = require('../app/models/Session');
const User = require('../app/models/User');

function route(app) {
    sessionValidation(app);
    app.use('/posts', postsRouter);
    app.use('/me', meRouter);
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/', siteRouter);
}

function sessionValidation(app) {
    app.use(async (req, res, next) => {
        const session = await Session.findOne({
            sessionId: req.cookies.sessionId,
        });

        app.locals.isLogin = false;
        if (session) {
            const user = await User.findOne({ userId: session.userId });
            if (user) {
                app.locals.username = user.username;
                app.locals.isLogin = session.sessionId ? true : false;
            }
        }
        next();
    });
}

(module.exports = route), { sessionValidation };
