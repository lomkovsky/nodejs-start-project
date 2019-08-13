const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return "Your notes..."
};
const addNote = (title, body) => {
    const notes = loadNotese();
    const duolicateNotes = notes.filter((note) => note.title === title);
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
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('./node-app/notes.json', dataJSON)
}
const loadNotese = () => {
    try{
    const dataBuffer = fs.readFileSync('./node-app/notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
};
const deleteNote = (title, body) => {
    const notes = loadNotese();
    const checkNotes = notes.filter((note) => note.title === title);
    if (checkNotes.length === 0) {
        console.log(chalk.red.inverse('No such Title!'));
    } else {
        const duolicateNotes = notes.filter((note) => note.title !== title);
        saveNotes(duolicateNotes);
        console.log(chalk.blue.inverse('Note removed!'));
    }
};
const listNotes = (title, body) => {
    console.log(chalk.blue.inverse('List of titles'))
    const notes = loadNotese();
    notes.forEach(element => {
        console.log(chalk.blue(element.title)) 
    });
    }
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes
}
