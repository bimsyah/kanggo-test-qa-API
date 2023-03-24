const httpLib = require('supertest');
const serverAPI = httpLib('http://localhost:1234/v1');


function createUser(data) {
    return serverAPI
        .post('/users')
        .set('Authorization', 1234)
        .send(data);
}

function getUser(userName) {
    return serverAPI
        .get(`/users?name=${userName}`)
        .set('Authorization', 1234);
}

module.exports = {
    createUser,
    getUser
}