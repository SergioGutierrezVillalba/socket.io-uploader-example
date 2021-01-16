const { Readable } = require('stream');
const fs = require('fs');

function _bufferToStream(binary) {
    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      }
    });

    return readableInstanceStream;
}

function write (path, filename, extension, arrayBuffer) {
    const writeStream = fs.createWriteStream(`${path}/${filename}.${extension}`);
    const readStream = _bufferToStream(arrayBuffer);
    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
        readStream.on('error', reject);
        readStream.on('end', resolve);

        // TODO: Add .on('data') and return file size, chunks ...
    });
}

module.exports = {
    write
}