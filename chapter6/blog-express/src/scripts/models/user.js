/**
 * Created by darren on 8/11/14.
 */
module.exports = function (mongoose, bcrypt) {
    var userSchema = mongoose.Schema({
        local: {
            email: String,
            admin: Boolean,
            password: String
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
    module.exports = mongoose.model('User', userSchema);
}
