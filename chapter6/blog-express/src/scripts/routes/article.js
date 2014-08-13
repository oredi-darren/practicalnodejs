/**
 * Created by darren on 8/11/14.
 */
module.exports = function(Article) {
    return {
        show: function (req, res, next) {
            if(!req.params.slug)
                return next(new Error('No article slug.'));

            Article.findOne({
                slug: req.params.slug
            }, function (error, article) {
                if(error) return next(error);
                if(!article.published) return res.status(401).end();
                res.render('article', article);
            });
        }
        , list: function (req, res, next) {
            Article.find({}).toArray(function (error, articles) {
                if(error) return next(error);
                res.send({
                    articles: articles
                });
            });
        }
        , add: function (req, res, next) {
            if(!req.body.article)
                return next(new Error('No article payload.'));

            var article = req.body.article;
            article.published = false;
            Article.insert(article
                , function (error, articleResponse) {
                    if(error) return next(error);
                    res.send(articleResponse);
                });
        }
        , edit: function (req, res, next) {
            if(!req.params.id) return next(new Error('No article ID.'));
            Article.updateById(req.params.id
                , { $set: req.body.article }
                , function (error, count) {
                    if(error) return next(error);
                    res.send({
                        affectedCount: count
                    });
                });
        }
        , del: function (req, res, next) {
            if(!req.params.id) return next(new Error('No article ID.'));
            Article.removeById(req.params.id
                , function (error, count) {
                    if(error) return next(error);
                    res.send({
                        affectedCount: count
                    });
                });
        }
        , post: function (req, res, next) {
            if (!req.body.title)
                res.render('post');
        }
        , postArticle: function (req, res, next) {
            if(!req.body.title || !req.body.slug || ! req.body.text) {
                return res.render('post', {
                    error: 'Fill title, slug and text.'
                });
            }
            var article = {
                title: req.body.title,
                slug: req.body.slug,
                text: req.body.text,
                published: false
            };

            Article.insert(article, function (error, articleResponse) {
                if(error) return next(error);
                res.render('post', {
                    error: 'Article was added. Published it on Admin page.'
                });
            });
        }
        , admin: function (req, res, next) {
            Article.find({}, {
                sort: { _id: -1 }
            }).toArray(function (error, articles) {
                if(error) return next(error);
                res.render('admin', { articles: articles });
            });
        }
    }
};