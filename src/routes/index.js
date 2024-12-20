const postsRouter = require('./posts');
const siteRouter = require('./site');
const meRouter = require('./me');
const loginRouter = require('./login');

function route(app) {
    app.use('/posts', postsRouter);
    app.use('/me', meRouter);
    app.use('/login', loginRouter);
    app.use('/', siteRouter);
}

module.exports = route;
