/**
 * Created by darren on 8/13/14.
 */
// create the model for users and expose it to our app
module.exports = function (mongoose) {
    var articleSchema = mongoose.Schema({
        title: String,
        slug: String,
        published: Boolean,
        text: String
    });

    mongoose.model('Article', articleSchema);
};