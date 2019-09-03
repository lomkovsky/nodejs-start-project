const request = require('supertest');
const app = require('../src/app.js');
const Task = require('../src/models/task');
const User = require('../src/models/user');
const { setupDatabase, userOneId, userOne, userTwo, taskOne } = require('./fixtures/db.js');

beforeEach(setupDatabase);
test('Should create a new task', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      "description": "first task"
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});
test('Should get all tasks for userOne', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});
test('Should not delete task one by user two', async () => {
  const response = await request(app)
  .delete('/tasks/' + taskOne._id)
  .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
  .send()
  .expect(404);
  const task = Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
