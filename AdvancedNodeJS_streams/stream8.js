// Transform Streams change the data

const {
  Transform
} = require('stream');

class ReplaceText extends Transform {
  constructor(char) {
    super();
    this.replaceChar = char;
  }
  _transform(chunk, encoding, cb) {
    const transformChunk = chunk.toString().replace(/[a-zA-Z0-9]/g, this.replaceChar);
    this.push(transformChunk);
    cb();
  }

  _flush(cb) {
    this.push('more content passed')
    cb();
  }
}

let xStream = new ReplaceText('x');

process.stdin
  .pipe(xStream)
  .pipe(process.stdout);