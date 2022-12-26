// Writes the user inputs into a file

const {
  createWriteStream
} = require('fs');
const writeStream = createWriteStream('file.txt');

//readStream.pipe(writeStream).on('error', console.error);
process.stdin.pipe(writeStream);