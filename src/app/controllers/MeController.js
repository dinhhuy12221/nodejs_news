const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { sortable } = require('../../helpers/handlebars');

class MeController {
    // [GET] /me/stored/posts
    // sort ko su dung duoc async await
    async storedPosts(req, res, next) {
        const user = await getUserFromSession(req.cookies.sessionId);
        let postQuery = Post.find({ userId: user.userId });

        if (req.query._sort === '') {
            postQuery = postQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            postQuery,
            Post.countDocumentsWithDeleted({
                deleted: true,
                userId: user.userId,
            }),
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
        const user = await getUserFromSession(req.cookies.sessionId);
        let postQuery = Post.findWithDeleted({
            deleted: true,
            userId: user.userId,
        });

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
