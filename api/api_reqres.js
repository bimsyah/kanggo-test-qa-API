const httpLib = require('supertest');
const serverAPI = httpLib('https://reqres.in/api');

function getUser() {
    return serverAPI
        .get('/users?page=2')
        .set('Authorization', 1234);
}

function getSingleUser(userId) {
    return serverAPI
        .get(`/users/${userId}`)
        .set('Authorization', 1234);
}

function createUser(data) {
    return serverAPI
        .post('/users')
        .set('Authorization', 1234)
        .send(data);
}

module.exports = {
    getUser,
    createUser,
    getSingleUser
}