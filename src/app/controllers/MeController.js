const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { sortable } = require('../../helpers/handlebars');

class MeController {
    // [GET] /me/stored/posts
    // sort ko su dung duoc async await
    storedPosts(req, res, next) {
        let postQuery = Post.find({});

        if (req.query._sort === '') {
            postQuery = postQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            postQuery,
            Post.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([posts, deletedCount]) =>
                res.render('me/stored-posts', {
                    deletedCount,
                    posts: multipleMongooseToObject(posts),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/posts
    trashPosts(req, res, next) {
        let postQuery = Post.findWithDeleted({ deleted: true });

        if (req.query._sort === '') {
            postQuery = postQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        postQuery
            .then((posts) =>
                res.render('me/trash-posts', {
                    posts: multipleMongooseToObject(posts),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
