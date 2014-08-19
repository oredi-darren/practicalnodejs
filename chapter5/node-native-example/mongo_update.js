/**
 * Created by darren on 8/8/14.
 */
var util = require('util')
    , mongo = require('mongodb')
    , dbHost = '127.0.0.1'
    , dbPort = 27017;

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db('local', new Server(dbHost, dbPort), {safe:true});

db.open(function (error, dbConnection) {
    if(error) {
        console.error(error);
        process.exit(1);
    }

    console.log('db state: ', db._state);
    dbConnection.collection('messages').findOne({}, function (error, item) {
        if(error) {
            console.error(error);
            process.exit(1);
        }
        console.log('Before Update: ', item);
        var id = item._id.toString();   // we can store ID in a string
        item.updated = new Date().toJSON();;
        dbConnection.collection('messages').save(item, function (error, item) {
            if(error) {
                console.error(error);
                process.exit(1);
            }

            dbConnection.collection('messages').findOne({_id: new mongo.ObjectID(id)}, function (error, item) {
                if (error) {
                    console.error(error);
                    process.exit(1);
                }
                console.log('Find After Update: ', item);
                db.close();
                process.exit(0);
            });
        });
        console.log('Awaiting Update....');
    });
});