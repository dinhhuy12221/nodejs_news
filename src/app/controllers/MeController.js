const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/posts
    async storedPosts(req, res, next) {
        let postQuery = await Post.find({});

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
    async trashPosts(req, res, next) {
        await Post.findWithDeleted({ deleted: true })
            .then((posts) =>
                res.render('me/trash-posts', {
                    posts: multipleMongooseToObject(posts),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
