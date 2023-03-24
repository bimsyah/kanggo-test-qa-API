const expect = require('chai').expect;
const apiUnderTest = require('../api/api_reqres');
const request = require('supertest');
const app = require('../app')


describe('Test Endpoint https://reqres.in/api/users', async () => {
    it('Test apakah endpoint get user berfungsi mengembalikan data yang sesuai yaini tidak ada firstname yang kosong', async () => {
        
        const response = await apiUnderTest.getUser();
        // console.log(response.status);
        // console.log(response.body);

        // assertion
        const data = response.body.data;

        for(let index=0; index < data.length; index++) {
            // data[index].first_name tidak boleh kosong

            console.log(data[index].first_name);
            expect(data[index].first_name).to.not.equal('');
        }
    });

    it('Test apakah endpoint create user berfungsi membuat data user yang sesuai dengan inputnya', async () => {
        const data = {
            "name": "morpheus",
            "job": "leader"
        };
        let response = await apiUnderTest.createUser(data);
        // console.log(response.status);
        // console.log(response.body);

        // assertion
        expect(response.body.name).to.equal(data.name);
        expect(response.body.job).to.equal(data.job);

        // coba cek ah ketika fungsi get,.. apakah datanya ada ga ada 
        response = await apiUnderTest.getSingleUser('7');
        expect(response.body.data.first_name).to.equal('Michael');
    });

    it('Test apakah endpoint create user berfungsi membuat data user ketika inputnya name itu kosong', async () => {
        const data = {
            "name": "",
            "job": "leader"
        };
        const response = await apiUnderTest.createUser(data);
        // console.log(response.status);
        // console.log(response.body);

        // assertion
        expect(response.body.name).to.equal(data.name);
    });

     // Test for DELETE /api/users/:id
  it('DELETE /api/users/:id should delete a user with the given id', function(done) {
    request(app)
      .delete('/api/users/2')
      .expect(204)
      .end(done);
  });
});

it('PUT /api/users/:id should update a user with the given id', function(done) {
    const payload = {
      name: 'Jane Doe',
      job: 'Senior Software Engineer'
    };
    request(app)
      .put('/api/users/2')
      .send(payload)
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.body.name, payload.name);
        assert.equal(res.body.job, payload.job);
        done(err);
      });
  });

