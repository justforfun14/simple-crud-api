import http from 'http';
import { routeHandler } from '../routes/routeHandler.js';

describe('GET requests', () => {
  let server: http.Server | undefined;

  beforeAll((done) => {
    server = http.createServer(routeHandler);
    server.listen(4000, done);
  });

  afterAll((done) => {
    server?.close(done);
  });

  test('should return 404 for unknown route', (done) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/unknown',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(404);
        expect(data).toBe('Wrong URL');
        done();
      });
    });

    req.end();
  });

  test('should return 200 and empty array for GET /api/users', (done) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/users',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(data)).toEqual([]);
        done();
      });
    });

    req.end();
  });

  test('should return 201 and the created user for POST /api/users', (done) => {
    const user = {
      username: 'opa',
      age: 200,
      hobbies: ['NOT_NODE_JS'],
    };

    const postData = JSON.stringify(user);

    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(201);
        expect(JSON.parse(data)).toEqual({ ...user, id: expect.any(String) });

        done();
      });
    });

    req.write(postData);
    req.end();
  });
});
