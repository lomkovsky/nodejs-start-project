fs = require('fs');
// fs.writeFileSync('hello.txt', 'hello!');
fs.appendFile('hello.txt', ' data to append', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });