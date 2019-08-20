// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    };
    const db = client.db(databaseName);

    db.collection('users').find({name: 'lom'}).toArray((error, users) => {
        if (error) {
             return console.log('can not find users');
        };
        console.log(users);
    });

    // db.collection('users').findOne({ _id: ObjectID("5d5ba6f0f5f19b0820fdc0dd"), }, (error, user) => { 
    //     if (error) { 
    //         return console.log('unable to fetch the user');
    //     };
    //     console.log(user);
    // });



    // db.collection('users').insertOne({
    //     name: 'lom',
    //     age: 36
    // }, (error, result) => {
    //     if (error) {
    //        return colsole.log('Unable to insert user');
    //     }; 
    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([{
    //     name: 'lom',
    //     age: 36
    // },
    // {
    //     name: 'tania',
    //     age: 34
    // }], (error, result) => {
    //     if (error) {
    //        return colsole.log('Unable to insert documents');
    //     }; 
    //     console.log(result.ops);
    // });

    // db.collection('buying').insertMany([{
    //     description: 'lom',
    //     completed: true
    // },
    // {
    //     description: 'tania',
    //     completed: false
    // },
    // {
    //     description: 'bob',
    //     completed: true
    // }], (error, result) => {
    //     if (error) {
    //        return colsole.log('Unable to insert documents');
    //     }; 
    //     console.log(result.ops);
    // });

});
