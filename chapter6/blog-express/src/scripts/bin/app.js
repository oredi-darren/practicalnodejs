/**
 * Created by darren on 8/7/14.
 */

// Require dependencies
var express = require('express')
    , http = require('http')
    , path = require('path')
    , mongoskin = require('mongoskin')
    , session = require('express-session')
    , logger = require('morgan')
    , errorHandler = require('errorhandler')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , flash = require('connect-flash')
    , passport = require('passport');

var basePath = path.resolve(__dirname, "../../");

// Create express server and configure settings
var app = express();
app.locals.appTitle = 'blog-express';
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(basePath, 'views'));
app.set('view engine', 'jade');

// Connect to database
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog'
    , db = mongoskin.db(dbUrl, { safe: true })
    , collections = {
        articles: db.collection('articles')
        , users: db.collection('users')
    };

// Define middleware
app.use(function (req, res, next) {
    if(!collections.articles || !collections.users)
        return next(new Error('No collections.'));

    req.collections = collections;
    return next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(require('stylus').middleware(path.join(basePath, 'public')));
app.use(express.static(path.join(basePath, 'public')));
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({
    secret: '2C4474A-D649-4D44-9535-46E296EF984F'
}));
app.use(passport.initialize());
app.use(passport.session());    // persistent login sessions
app.use(flash());


// Define routes
if('development' == app.get('env')) {
    app.use(errorHandler());
}

// PAGES & ROUTES
require('../routes')(app, passport);

// Start server
var server = http.createServer(app);
var boot = function () {
    server.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
};

var shutdown = function () {
    server.close();
};

if(require.main === module) {
    boot();
} else {
    console.log('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}

// Start workers with clusters



