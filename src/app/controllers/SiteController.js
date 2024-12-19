const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res, next) {
        Post.find()
            .then((posts) => {
                res.render('home', {
                    posts: multipleMongooseToObject(posts),
                });
            })
            .catch(next);
    }

    // [GET] /:slug
    slug(req, res, next) {
        Post.find({ category: req.params.slug })
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
}

module.exports = new SiteController();
