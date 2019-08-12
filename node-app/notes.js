const fs = require('fs');
const getNotes = function(){
    return "Your notes..."
};
const addNote = function (title, body){
    const notes = loadNotese();
};
const loadNotese = function(){
    try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
};
module.exports = {
    getNotes: getNotes,
    addNote: this.addNote
}
