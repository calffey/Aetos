require("dotenv").config();
const request = require('supertest');
// const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT;

const server = `http://localhost:${PORT}`;

// const testDB = path.join(__dirname, '_mocks_', 'mockData.json');

describe('Route integration', () => {
    
    describe('/', () => {
        describe('GET', () => {
            it('should responde with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
            })
        })
    })

    describe('/cpuusage', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/cpuusage')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/networktraffic', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/networktraffic')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/memusage', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/memusage')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/nodecount', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/nodecount')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/cpuutilization', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/cpuutilization')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/saturation', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/saturation')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/memoryutilization', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/memoryutilization')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

    describe('/networksaturation', () => {
        describe('GET', () => {
            it('should respond with a 200 status and application/json content type', () => {
                return request(server)
                    .get('/networksaturation')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            });
        })
    })

});