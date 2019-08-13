const fs = require('fs');
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
        console.log('New note added!');
    } else {
        console.log('Note title taken!');
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
module.exports = {
    getNotes: getNotes,
    addNote: addNote
}
