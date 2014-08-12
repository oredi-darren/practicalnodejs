/**
 * Created by darren on 8/11/14.
 */
var article = require('./article')
    , user = require('./user');

module.exports = function(app, passport) {
    app.get('/', function (req, res, next){
        console.log(req.collections.articles);
        req.collections.articles.find({published: true}, {sort: {_id:-1}}).toArray(function(error, articles){
            if (error) return next(error);
            res.render('index', { articles: articles});
        })
    });
    app.get('/login', user.login);
    app.post('/login', user.authenticate);
    app.get('/logout', user.logout);
    app.get('/signup', user.signup);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/admin', article.admin);
    app.get('/post', article.post);
    app.post('/post', article.postArticle);
    app.get('/articles/:slug', article.show);

    // REST API ROUTES
    app.get('/api/articles', article.list);
    app.post('/api/articles', article.add);
    app.put('/api/articles/:id', article.edit);
    app.delete('/api/articles/:id', article.del);

    app.all('*', function (req, res) {
        res.send(404);
    });
}




