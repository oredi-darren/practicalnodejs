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
    , methodOverride = require('method-override');

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

// Define routes
if('development' == app.get('env')) {
    app.use(errorHandler());
}

// PAGES & ROUTES
var routes = require('../routes');

app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin', routes.article.admin);
app.get('/post', routes.article.post);
app.post('/post', routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

// REST API ROUTES
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.delete('/api/articles/:id', routes.article.del);

app.all('*', function (req, res) {
    res.send(404);
});

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



