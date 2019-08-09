const chalk = require('chalk');
const validator = require('validator');
const command = process.argv[2];
const a = 3;
const b = 6;
if (command === "add"){
    console.log(a + b);
} else if (command === "mult"){
    console.log(a * b)
 } else {
     console.log("Chuse 'add' or 'mult'")
 
    }
