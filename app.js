'use strict'
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
// const expressValidator = require('express-validator');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const mongoose = require('mongoose');

var multer  = require('multer')
var upload = multer({ dest: 'public/images' })

const config = require('./config');

mongoose.Promise = global.Promise;
// mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.db}`);
mongoose.connect('mongodb://127.0.0.1:27017/techblog');

const app = express();

// view engine setup
app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,  
    saveUninitialized: true,  
    secret: config.database.cookieSecret,
    cookie: {
        path: '/',
        maxAge: 1000*24*60*60
    }
}));

//flash and global vars for flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routers--map bind urls to requesthandlers
const fileNames = fs.readdirSync(`${__dirname}/routes`);
const jsFileNames = fileNames.filter((file)=>{
    return file.endsWith('.js');
},fileNames);

for (let f of jsFileNames) {
    console.log(`processing routes: ${f}`);
    const mapping = require(`${__dirname}/routes/${f}`);
    for (let i in mapping) {
        if (i.startsWith('GET')) {
            var url = i.substring(4);
            app.get(url, mapping[i]);
        } else if (i.startsWith('POST')) {
            var url = i.substring(5);
            if (url == '/postimages') {
                app.post(url, upload.array('avatar',2), mapping[i]);
            }
            app.post(url, mapping[i]);
        } else {
            console.log(`invalid url: ${i}`);
        }
    }

}

/// catch 404 and forwarding to error handler;use next() to deliver err to next middleware
//如果上面的路由中间件没有处理的话就会跳到这个middleware，从而渲染error.ejs
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handlers
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});

const server = app.listen(app.get('port'), () => {
    console.log(`servering at port ${server.address().port}...`);
});
