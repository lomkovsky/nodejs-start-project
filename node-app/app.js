const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
yargs.command({
    command: 'add',
    describe: 'Add a note',
    handler: function(){
        console.log('Adding the note')
    }
});
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function(){
        console.log('Removing the note')
    }
});
yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler: function(){
        console.log('Listing the note')
    }
});
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: function(){
        console.log('Reading the note')
    }
});
console.log(yargs.argv);

