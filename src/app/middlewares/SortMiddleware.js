module.exports = function (req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
        column: 'name',
    };

    if (req.query._sort === '') {
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = req.query.column
        // res.locals._sort.type = req.query.type;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
};
