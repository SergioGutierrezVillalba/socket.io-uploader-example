const server = require('http').createServer(() => {});
const WebSocketServer = require('ws').Server;
const fs = require('fs');
const { Readable } = require('stream');

const ws = new WebSocketServer({ server });

ws.on('connection', function (socket) {
    console.log('socket connected!');
    socket.on('message', function (message) {
        console.log('message', message);
        const writeStream = fs.createWriteStream('video.mp4');
        const readableStream = bufferToStream(message);
        readableStream.pipe(writeStream);
        socket.emit('eoeooeeo');
        // writeStream.on('end', () => {
        //     socket.emit('eoeooeeo');
        // })
    });

    socket.on('error', (err) => {
        console.log(err);
    })
})

function bufferToStream(binary) {

    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      }
    });

    return readableInstanceStream;
}

server.listen(3000, () => {
    console.log('Listening on port 3000');
})


