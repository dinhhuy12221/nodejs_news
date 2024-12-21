const Handlebars = require('handlebars');
const app = require('../index');

module.exports = {
    print: (a) => console.log(a),
    sum: (a, b) => a + b,
    isNotEqual: (a, b) => {
        return a !== b;
    },
    convertDate: (d) => {
        var options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        var formatDate = new Date(d);
        var date = formatDate.toLocaleDateString('vi-VN');
        var time = formatDate.toLocaleTimeString('vi-VN');
        return `${date} ${time}`;
    },
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };

        const types = {
            default: 'asc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sort.type];

        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${href}"><span class="${icon}"></span></a>`;

        return new Handlebars.SafeString(output);
    },
    isLogin: () => {
        console.log(app.locals.isLogin);
        return app.locals.isLogin;
    },
};
