const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Testing /apps endpoint', () => {
    it('should return a 200 from GET /apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
    })
})

describe('Testing response with queries', () => {
    it('should return 200 w/query responses', () => {
        return supertest(app)
            .get('/apps')
            .query({ genre: "action", sort: "rating" })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
            })
    })
})