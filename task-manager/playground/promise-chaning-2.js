require('../src/db/mongoose');
const Task = require('../src/models/task.js');
// Task.findByIdAndDelete("5d5c1767d878152ec468cbb0")
// .then(() => Task.countDocuments({completed: true}))
// .then((result) => console.log(result))
// .catch((e) => console.log(e));

const deleteTaskByIdAndCount = async (id, completed) => {
    const deluser = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed });
    if (!deluser){
        console.log('No such tast found!');
    };
    return {deluser, count};
};
deleteTaskByIdAndCount("5d5c1783226d0e2ed69a503e", true).then((result) => {
    console.log(result.deluser);
    console.log(result.count);
}).catch((e) => console.log(e));
