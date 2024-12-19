const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    async index(req, res, next) {
        await Post.find()
            .then((posts) => {
                res.render('home', {
                    posts: multipleMongooseToObject(posts),
                });
            })
            .catch(next);
    }

    // [GET] /:slug
    async slug(req, res, next) {
        await Post.find({ category: req.params.slug })
            .then((posts) => {
                res.render('home', {
                    posts: multipleMongooseToObject(posts),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /login
    login(req, res, next) {
        res.render('login');
    }

    // [GET] /*
    notFound(req, res, next) {
        res.status(404).send('<h1>404 Not Found</h1>');
    }
}

module.exports = new SiteController();
