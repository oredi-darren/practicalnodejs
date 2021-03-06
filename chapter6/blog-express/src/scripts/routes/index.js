/**
 * Created by darren on 8/11/14.
 */
module.exports = function(app, passport, authorize, models) {
    var article = require('./article')(models.Article)
        , user = require('./user')(models.User);

    app.get('/', function (req, res, next){
        models.Article.find({published: true}, null, {sort: {_id: -1}}, function(error, articles){
            if (error) return next(error);
            res.render('index', { articles: articles});
        });
    });
    app.get('/login', user.login);
    app.post('/login'
        , passport.authenticate('local-login', {
                successRedirect: '/admin',
                failureRedirect: '/login',
                failureFlash: true }));
    app.get('/logout', user.logout);
    app.get('/signup', user.signup);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: '/admin',
            failureRedirect: '/' }));

    app.get('/admin', authorize, article.admin);
    app.get('/post', authorize, article.post);
    app.post('/post', authorize, article.postArticle);
    app.get('/articles/:slug', article.show);

    // REST API ROUTES
    app.all('/api', authorize);
    app.get('/api/articles', article.list);
    app.post('/api/articles', article.add);
    app.put('/api/articles/:id', article.edit);
    app.delete('/api/articles/:id', article.del);

    app.all('*', function (req, res) {
        res.send(404).end();
    });
}




