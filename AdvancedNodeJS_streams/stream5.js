const {
  createReadStream,
  createWriteStream
} = require('fs');
const readStream = createReadStream('powder-day.mp4');
const writeStream = createWriteStream('copy.mp4', {
  highWaterMark: 1628920
});

readStream.on('data', (chunk) => {
  const result = writeStream.write(chunk);
  if (!result) {
    console.log('backpressure');
    readStream.pause();
  }
});

readStream.on('end', () => {
  writeStream.end();
});

readStream.on('error', (err) => {
  console.log("An error has occurred", err);
});

writeStream.on('drain', () => {
  console.log('drained');
  readStream.resume();
});

writeStream.on('close', () => {
  process.stdout.write('file copied');
});