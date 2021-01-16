const server = require('http').createServer(() => {});
const WebSocketServer = require('ws').Server;
const fs = require('fs');


const ws = new WebSocketServer({ server });

ws.on('connection', function (socket) {
    console.log('socket connected!');
    socket.on('message', function (message) {
        const chunk = message;
        // TODO: Send an object with more data instead an only raw arraybuffer
        // TODO: Emit progress only every n seconds and not every chunk
        // TODO: Using buffer from to see the length, bad idea?
        // socket.send(JSON.stringify({ type: "PROGRESS", "data": Buffer.from(chunk).length}));
        fs.appendFileSync('video.mp4', chunk);
    });

    socket.on('error', (err) => {
        console.log(err);
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
})


