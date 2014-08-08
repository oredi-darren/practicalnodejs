/**
 * Created by darren on 8/7/14.
 */

// Require dependencies
var express = require('express');
var http = require('http');
var path = require('path');

var basePath = path.resolve(__dirname, "../../");

// Create express server and configure settings
var app = express();
app.set('appName', 'helloworld');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(basePath, 'views'));
app.set('view engine', 'jade');

// Connect to database
// Define middleware
// Define routes
app.all('*', function (req, res) {
    res.render('index', {
        msg: 'Welcome to the Practical Node.js'
    });
});

// Start server
var server = http.createServer(app);
var boot = function () {
    server.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
};

var shutdown = function () {
    server.close();
};

if(require.main === module) {
    boot();
} else {
    console.log('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}
// Start workers with clusters



