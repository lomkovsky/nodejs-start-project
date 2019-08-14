const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return "Your notes..."
};
const addNote = (title, body) => {
    const notes = loadNotese();
    const dublicateNote = notes.find((note) => note.title === title);
    if (!dublicateNote) {
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
    const checkNotes = notes.find((note) => note.title === title);
    if (!checkNotes) {
        console.log(chalk.red.inverse('No such Title!'));
    } else {
        const dublicateNotes = notes.filter((note) => note.title !== title);
        saveNotes(dublicateNotes);
        console.log(chalk.blue.inverse('Note removed!'));
    }
};
const listNotes = () => {
    console.log(chalk.blue.inverse('List of titles'))
    const notes = loadNotese();
    notes.forEach(element => {
        console.log(chalk.blue(element.title)) 
    });
};
const readNotes = (title) => {
    const notes = loadNotese();
    const checkNotes = notes.find((note) => note.title === title);
    if (!checkNotes) {
        console.log(chalk.red.inverse('No such Title!'));
    } else {
        console.log(chalk.blue.inverse('Note title = ' + checkNotes.title));
        console.log(chalk.blue('Note body = ' + checkNotes.body));
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNotes: readNotes
}
