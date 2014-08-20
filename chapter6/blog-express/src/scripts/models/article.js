/**
 * Created by darren on 8/13/14.
 */
// create the model for users and expose it to our app
module.exports = function (mongoose) {
    var articleSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            validate: [
                function (value) {
                    return value.lenth <= 120
                },
                'Title is too long (120 max)'
            ],
            default: 'New Post'
        },
        text: String,
        published: {
            type: Boolean,
            default: false
        },
        slug: {
            type: String,
            set: function (value) {
                return value.toLowerCase().replace(' ', '-');
            }
        }
    });

    articleSchema.static({
        list: function (callback) {
            this.find({}, null, {
                sort: {_id:1}
            }, callback);
        }
    });

    return mongoose.model('Article', articleSchema);
};