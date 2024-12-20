const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const Session = require('./app/models/Session');
var path = require('path');
var fs = require('fs');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../log/access.log'),
    {
        flags: 'a',
    },
);

// HTTP request logger
app.use(morgan('combined', { stream: accessLogStream }));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use((req, res, next) => {
    const session = Session.findOne({ sessionId: req.cookies.sessionId });
    app.locals.isLogin = session.getQuery().sessionId ? true : false;
    next();
});

// Routes init
route(app);

app.listen(port, () => console.log(`App listening at localhost:${port}`));

module.exports = { app };
