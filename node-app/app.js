const chalk = require('chalk');
const validator = require('validator');
const notes = require('./notes.js');
console.log("Text frome notes.js is = ", notes())
console.log(chalk.green.bold(validator.isEmail("lom@i.ua")));





// const fs = require('fs');
// fs.writeFileSync('hello.txt', 'hello!');
// fs.appendFile('hello.txt', ' data to append', (err) => {
//     if (err) throw err;
//     console.log('The "data to append" was appended to file!');
//   });
