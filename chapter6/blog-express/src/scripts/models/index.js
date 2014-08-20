/**
 * Created by darren on 8/20/14.
 */
module.exports = function (mongoose, bcrypt) {
    return {
        Article: require('./article')(mongoose),
        User: require('./user')(mongoose, bcrypt)
    };
};
