const note = require('./notes');
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
// Costomize yargs version
yargs.version('1.1.0');
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.addNote(argv.title, argv.body)
    }
});
// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.deleteNote(argv.title, argv.body)
    }
});
// Create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler(){
        console.log('Listing the note')
    }
});
// Create read command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler(){
        console.log('Reading the note')
    }
});
yargs.parse();
// console.log(yargs.argv)
