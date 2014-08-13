/**
 * Created by darren on 8/10/14.
 */
/*
* GET users listing.
 */
module.exports = function(User) {
    return {
        list: function (req, res) {
            res.send('respond with a resource');
        }
        , login: function (req, res) {
            /*
             * GET login page.
             */
            res.render('login');
        }
        , logout: function (req, res) {
            /*
             * GET logout route.
             */

            res.redirect('/');
        }
        , authenticate: function (req, res, next) {
            /*
             * POST authenticate route
             */
            if(!req.body.email || !req.body.password)
                return res.render('login', {
                    error: 'Please enter your email and password.'
                });

            User.findOne({
                email: req.body.email
            }, function (error, user) {
                if(error) return next(error);
                if(!user || !user.validPassword(req.body.password)) {
                    res.render('login', { error: 'Incorrect email & password combination.' });
                }
                else {
                    res.redirect('/');
                }
            });
        }
        , signup: function (req, res) {
            // render the page and pass in any flash data if it exists
            res.render('signup', { message: req.flash('signupMessage') });
        }
    };
};