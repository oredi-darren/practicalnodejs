/**
 * Created by darren on 8/22/14.
 */
var WebServerSocket = require('ws').Server
    , wss = new WebServerSocket({
        port: 3000
    })

wss.on('connection', function(ws) {
    ws.send('XYZ');
    ws.on('message', function (message) {
        console.log('received: %s', message)
    })
})