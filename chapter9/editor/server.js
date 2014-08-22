/**
 * Created by darren on 8/22/14.
 */
var path = require('path'),
    express = require('express'),
    derby = require('derby'),
    racerBrowserChannel = require('racer-browserchannel'),
    liveDbMongo = require('livedb-mongo'),
    favicon = require('server-favicon'),
    compression = require('compression'),
    app = require(path.join(__dirname, 'app.js')),
    expressApp = module.exports = express(),
    redis = require('redis').createClient(),
    mongoUrl = 'mongodb://localhost:27017/editor'

var store = derby.createStore({
    db: liveDbMongo(mongoUrl + '?auto_reconnect', {
        safe: true
    }),
    redis: redis
})

var publicDir = path.join(__dirname, 'public')

expressApp
    .use(favicon ())
    .use(compression())
    .use(app.scripts(store))
    .use(racerBrowserChanner(store))
    .use(store.modelMiddleware())
    .use(app.router())

expressApp.all('*', function (req, res, next) {
    return next('404: ' + req.url)
})