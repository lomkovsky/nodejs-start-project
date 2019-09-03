const app = require('./app.js');
// start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
