/**
 * Created by darren on 8/8/14.
 */
var mongoskin = require('mongoskin'),
    dbHost = '127.0.0.1',
    dbPort = 27017;

var db = new mongoskin.db(dbHost + ':' + dbPort + '/local', {safe:true});

db.bind('messages', {
    findOneAndAddText: function (text, fn) {
        db.collections['messages'].findOne({}, function (error, item) {
            if(error) {
                console.error(error);
                process.exit(1);
            }
            console.log('Before Update: ', item);
            var id = item._id.toString();   // we can store ID in a string
            item.updated = new Date().toJSON();;
            dbConnection.collection('messages').save(item, function (error, count) {
                    if (error) {
                        console.error(error);
                        process.exit(1);
                    }
                console.info('Saved: ', count);
                return fn(count, id);
            });
        })
    }
});