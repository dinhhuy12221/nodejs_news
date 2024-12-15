const Post = require('../models/Post');
const { mongooseToObject } = require('../../util/mongoose');

class PostsController {
    // [GET] /posts/:slug
    show(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then((post) => {
                res.render('posts/show', {
                    post: mongooseToObject(post),
                });
            })
            .catch(next);
    }

    // [GET] /posts/create
    create(req, res, next) {
        res.render('posts/create');
    }

    // [POST] /posts/store
    store(req, res, next) {
        const formData = { ...req.body };
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`;
        const post = new Post(formData);
        post.save()
            // .then(() => { res.redirect(course.slug, 'show', { course: mongooseToObject(course) })})
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [GET] /posts/:id/edit
    edit(req, res, next) {
        Post.findById(req.params.id)
            .then((post) =>
                res.render('posts/edit', {
                    post: mongooseToObject(post),
                }),
            )
            .catch(next);
    }

    // [PUT] /posts/:id
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [DELETE] /posts/:id
    delete(req, res, next) {
        Post.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [DELETE] /posts/:id/force
    forceDelete(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/posts'))
            .catch(next);
    }

    // [PATCH] /posts/:id/restore
    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/posts'))
            .catch(next);
    }

    // [POST] /posts/handle-stored-form-actions
    handleStoredFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Post.delete({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('/me/stored/posts'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }

    // [POST] /posts/handle-trashed-form-actions
    handleTrashedFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Post.restore({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('/me/trash/posts'))
                    .catch(next);
                break;
            case 'forceDelete':
                Post.deleteMany({ _id: { $in: req.body.postIds } })
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
