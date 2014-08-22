/**
 * Created by darren on 8/21/14.
 */
var Hapi = require('hapi'),
    mongoskin = require('mongoskin')

var server = new Hapi.Server(3000);

var db = mongoskin.db('mongodb://localhost:27017/test', { safe:true })
var id = mongoskin.helper.toObjectID

var loadCollection = function (name, callback) {
    callback(db.collection(name))
}

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            reply('Select a collection, e.g., /collections/messages')
        }
    },
    {
        method: 'GET',
        path: '/collections/{collectionName}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.find({}, {
                    limit: 10,
                    sort: [['_id', -1]]
                }).toArray(function (e, results) {
                    if(e) return reply(e)
                    reply(results)
                })
            })
        }
    },
    {
        method: 'POST',
        path: '/collections/{collectionName}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.insert(req.payload, {}, function (e, results) {
                    if(e) return reply(e)
                    reply(results)
                })
            })
        }
    },
    {
        method: 'GET',
        path: '/collections/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.findOne({_id: id(req.params.id)}, function (e, result) {
                    if(e) return reply(e)
                    reply(result)
                })
            })
        }
    },
    {
        method: 'PUT',
        path: '/collections/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.update({_id: id(req.params.id)},
                    {$set: req.payload }, {safe: true, multi: false},
                    function (e, result) {
                        if(e) return reply(e)
                        reply((result === 1) ? { msg: 'success' } : { msg: 'error' })
                    })
            })
        }
    },
    {
        method: 'DELETE',
        path: '/collections/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.remove({_id: id(req.params.id)},
                    function (e, result) {
                        if(e) return reply(e)
                        reply((result === 1) ? { msg: 'success' } : { msg: 'error' })
                    })
            })
        }
    }
])

server.pack.register({
    plugin: require('good'),
    options: {
        subscribers: {
            'console': [ 'ops', 'request', 'log', 'error' ]
        }
    }}, function (err) {
        if(!err) {
            console.log("Loaded plugin: good")
        }
    }
)

server.start(function () {
    console.log('Server running at:', server.info.uri)
})