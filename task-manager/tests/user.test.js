const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/user');
const {setupDatabase, userOneId, userOne} = require('./fixtures/db.js');

beforeEach(setupDatabase);
test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'lomkovsky100',
      age: 100,
      email: 'lomkovsky100@i.ua',
      password: 'lomkovsky100'
    })
    .expect(201);
  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  // assert response body
  expect(response.body).toMatchObject({
    user: {
      name: 'lomkovsky100',
      age: 100,
      email: 'lomkovsky100@i.ua'
    }
  })
});
test('Should login exist userOne', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});
test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'notExist',
      password: 'notuserOne'
    })
    .expect(400)
});
test('Should get profile of the user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
});
test('Should not get pofile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', 'Bearer sfffs')
    .send()
    .expect(401)
});
test('Should delete user account', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});
test('Should not delete user account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
});
test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'task-manager/tests/fixtures/profile-pic.jpg')
    .expect(200)
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});
test('Should update valid user filds', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      email: 'newuserone@email.com',
      name: 'newUserOne'
    })
    .expect(200)
  const user = await User.findById(userOneId);
  // expect(user.name).toBe('newUserOne')
  expect(user).toMatchObject({
    email: 'newuserone@email.com',
    name: 'newUserOne'
  });
});
test('Should not update invalid user filds', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      emaila: 'newuserone@email.com',
      namea: 'newUserOne'
    })
    .expect(400)
  const user = await User.findById(userOneId);
  // expect(user.name).toBe('newUserOne')
  expect(user).toMatchObject({
    email: userOne.email,
    name: userOne.name
  });
});
