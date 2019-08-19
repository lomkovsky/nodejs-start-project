// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName);

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

    db.collection('buying').insertMany([{
        description: 'lom',
        completed: true
    },
    {
        description: 'tania',
        completed: false
    },
    {
        description: 'bob',
        completed: true
    }], (error, result) => {
        if (error) {
           return colsole.log('Unable to insert documents');
        }; 
        console.log(result.ops);
    });

});
