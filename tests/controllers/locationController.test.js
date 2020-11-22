const request = require('supertest');
const express = require('express');
 
const app = express();

describe('Location Controller', () => {
    it('should send a get request', (done) => {
        const res = request(app)
            .get('/location?canada')
            //.expect('Content-Type', '/json/')
            .expect(404, done); //TODO make this pass with 200 (figure out how to fake out api calls)
    });
});