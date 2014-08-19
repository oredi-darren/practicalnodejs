/**
 * Created by darren on 8/7/14.
 */

// Require dependencies
var express = require('express');
var http = require('http');
var path = require('path');

// Create express server and configure settings
var app = express();
app.set('appName', 'helloworld');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
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
http.createServer(app)
    .listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
// Start workers with clusters



