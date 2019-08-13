const fs = require('fs');
const jsonFromFile = fs.readFileSync('./playgrounds/1-json.json').toString();
const jsonObject = JSON.parse(jsonFromFile);
jsonObject.name = 'lom';
jsonObject.age = 36;
const stringFromEditJSON = JSON.stringify(jsonObject);
console.log(stringFromEditJSON);
fs.writeFileSync('./playgrounds/1-json.json', stringFromEditJSON);
