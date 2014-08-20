/**
 * Created by darren on 8/11/14.
 */
module.exports = function (mongoose, bcrypt) {
    var userSchema = mongoose.Schema({
        admin: {
            type: Boolean,
            default: false
        }
        , local: {
            email: {
                type: String,
                required: true,
                set: function (value) {
                    return value.trim().toLowerCase();
                },
                validate: [
                    function(email) {
                        return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null);
                    }, 'Invalid email'
                ]
            },
            password: String
        }
        , twitter: {
            id: String,
            token: String,
            displayName: String,
            username: String
        }
    });

    // methods
    // generating a hash
    userSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

    // create the model for users and expose it to our app
    return mongoose.model('User', userSchema);
}
