const Post = require('../models/Post');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class PostsController {
    // [GET] /posts/:slug
    async show(req, res, next) {
        try {
            let post = await Post.findOne({ slug: req.params.slug });
            let relatedPosts = await Post.find({
                _id: { $ne: post._id },
                category: post.category,
            });

            Promise.all([relatedPosts, post])
                .then(([relatedPosts, post]) => {
                    // if (post === null || relatedPosts === null) {
                    //     res.status(404).render('not-found');
                    //     return;
                    // }
                    res.render('posts/show', {
                        relatedPosts: multipleMongooseToObject(relatedPosts),
                        post: mongooseToObject(post),
                    });
                })
                .catch(next);
        } catch (error) {
            res.status(404).render('not-found');
        }
    }

    // [GET] /posts/create
    create(req, res, next) {
        res.render('posts/create');
    }

    // [POST] /posts/store
    async store(req, res, next) {
        const formData = { ...req.body };
        const post = new Post(formData);
        await post
            .save()
            // .then(() => { res.redirect(course.slug, 'show', { course: mongooseToObject(course) })})
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [GET] /posts/:id/edit
    async edit(req, res, next) {
        await Post.findById(req.params.id)
            .then((post) =>
                res.render('posts/edit', {
                    post: mongooseToObject(post),
                }),
            )
            .catch(next);
    }

    // [PUT] /posts/:id
    async update(req, res, next) {
        await Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [DELETE] /posts/:id
    async delete(req, res, next) {
        await Post.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [DELETE] /posts/:id/force
    async forceDelete(req, res, next) {
        await Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/posts'))
            .catch(next);
    }

    // [PATCH] /posts/:id/restore
    async restore(req, res, next) {
        await Post.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/posts'))
            .catch(next);
    }

    // [POST] /posts/handle-stored-form-actions
    async handleStoredFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                await Post.delete({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('/me/stored/posts'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }

    // [POST] /posts/handle-trashed-form-actions
    async handleTrashedFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                await Post.restore({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('/me/trash/posts'))
                    .catch(next);
                break;
            case 'forceDelete':
                await Post.deleteMany({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('/me/trash/posts'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }
}

module.exports = new PostsController();
