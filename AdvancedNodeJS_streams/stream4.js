const {
  createReadStream,
  createWriteStream
} = require('fs');
const readStream = createReadStream('powder-day.mp4');
const writeStream = createWriteStream('copy.mp4');

readStream.on('data', (chunk) => {
  // console.log("Reading little chunk:", chunk);
  //console.log("Reading little chunk SIZE:", chunk.length);

  writeStream.write(chunk);
})

readStream.on('end', () => {
  // console.log("Read stream finished");

  writeStream.end();
});

readStream.on('error', (err) => {
  console.log("An error has occurred", err);
});

writeStream.on('close', () => {
  process.stdout.write('file copied');
});