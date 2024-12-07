const e = require('express');
const Course = require('../models/Course');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find()
            .then((courses) => res.json(courses))
            .catch(next);
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
