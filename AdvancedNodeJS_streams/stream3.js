const fs = require('fs');

const readStream = fs.createReadStream('powder-day.mp4');

readStream.on('data', (chunk) => {
  console.log("Reading little chunk:", chunk);
  console.log("Reading chunk SIZE:", chunk.length);
})

readStream.on('end', () => {
  console.log("Read stream finished");
});

readStream.on('error', (err) => {
  console.log("An error has occurred");
  console.error(err);
});

readStream.pause();
process.stdin.on('data', (chunk) => {
  let text = chunk.toString().trim();
  if (text === 'finish') {
    readStream.resume();
  }
  readStream.read();
  console.log('echo:', text);
});