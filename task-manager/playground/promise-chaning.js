require('../src/db/mongoose');
const User = require('../src/models/user.js');

const updateAgeAndCount = async (id, age) => {
  try {
    const user = await User.findByIdAndUpdate(id, { age });
    console.log(user);
    const count = await User.countDocuments({ age });
    console.log(count);
    return count;
  } catch {
    console.log(error);
  };
};

updateAgeAndCount("5d5c090217196228301c45d2", 300);

