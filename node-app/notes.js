const fs = require('fs');
const chalk = require('chalk');
const getNotes = function(){
    return "Your notes..."
};
const addNote = function (title, body){
    const notes = loadNotese();
    const duolicateNotes = notes.filter(function (note){
        return note.title === title
    })
    if (duolicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
};
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('./node-app/notes.json', dataJSON)
}
const loadNotese = function(){
    try{
    const dataBuffer = fs.readFileSync('./node-app/notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
};
const deleteNote = function (title, body) {
    const notes = loadNotese();
    const checkNotes = notes.filter(function (note){
        return note.title === title
    })
    if (checkNotes.length === 0) {
        saveNotes(notes);
        console.log(chalk.red.inverse('No such Title!'));
    } else {
        const duolicateNotes = notes.filter(function (note){
        return note.title !== title
    })
        saveNotes(duolicateNotes);
        console.log(chalk.blue.inverse('Note removed!'));
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote
}
