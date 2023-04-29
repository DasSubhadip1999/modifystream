const fs = require("fs");
const { Transform } = require("stream");

const readstream = fs.createReadStream("./demo.json");
const writestream = fs.createWriteStream("./newDemo.json");

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    chunk = JSON.parse(chunk.toString());
    chunk = chunk.map((item) => ({ name: item.name }));
    this.push(JSON.stringify(chunk));
    callback();
  },
});

readstream.pipe(myTransform).pipe(writestream);
