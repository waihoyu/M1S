var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
// 引入session
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.all('*', function(req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    // res.set("Access-Control-Allow-Origin", "*");
    // res.set("Access-Control-Allow-Methods", "GET");
    // res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.set('Access-Control-Allow-Max-Age', 3600);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, accept, content-type, xxxx');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Max-Age', 3600);
    //将外源设为指定的域，比如：http://localhost:8080
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //将Access-Control-Allow-Credentials设为true
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' === req.method) return res.sendStatus(200);
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: '12345', // 对sessionId进行cookie签名
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        }, // 设置session的有效时间, 单位ms
        resave: false,
        saveUninitialized: true,
    })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // 同一个浏览器而言，req是同一个

    // });
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;