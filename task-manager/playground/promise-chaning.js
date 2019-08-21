require('../src/db/mongoose');
const User = require('../src/models/user.js');
User.findByIdAndUpdate("5d5c090217196228301c45d2", {age: 360}).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 360 });
}).then((countNumber) => console.log(countNumber)).catch((e) => console.log(e));
