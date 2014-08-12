/**
 * Created by darren on 8/10/14.
 */
/*
* GET users listing.
 */
exports.list = function (req, res) {
    res.send('respond with a resource');
};

/*
 * GET login page.
 */
exports.login = function (req, res) {
    res.render('login');
};

/*
 * GET logout route.
 */
exports.logout = function (req, res) {
    res.redirect('/');
};

/*
 * POST authenticate route
 */
exports.authenticate = function (req, res, next) {
    res.redirect('/');
}

exports.signup = function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
};