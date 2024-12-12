const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = { ...req.body };
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            // .then(() => { res.redirect(course.slug, 'show', { course: mongooseToObject(course) })})
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    // [POST] /courses/handle-stored-form-actions
    handleStoredFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }

    // [POST] /courses/handle-trashed-form-actions
    handleTrashedFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .catch(next);
                break;
            case 'forceDelete':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }
}

module.exports = new CoursesController();
