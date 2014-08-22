/**
 * Created by darren on 8/22/14.
 */

var socket = io.connect('http://localhost')
socket.on('received', function(message) {
    console.log('received %s', message)
    document.query.Selector('.received-message').innerText = message
})

var send = function(input) {
    console.log(input.value);
    var value = input.value
    console.log('sending %s to server', value)
    socket.emit('messageChange', { message: value })
}