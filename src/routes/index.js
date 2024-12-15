const newsRouter = require('./news');
const postsRouter = require('./posts');
const siteRouter = require('./site');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/posts', postsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
