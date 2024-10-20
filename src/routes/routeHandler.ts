import { IncomingMessage, ServerResponse } from 'http';
import { validate as isValidUUID } from 'uuid';
import { getUsers } from '../db/getUsers.js';
import { getUser } from '../db/getUser.js';
import { updateUser } from '../db/updateUser.js';
import { deleteUser } from '../db/deleteUser.js';
import { createUser } from '../db/createUser.js';

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const { method } = req;
  console.log({ method });

  if (url === '/api/users') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(getUsers()));
      return;
    } else if (method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        console.log({ body });
        const data = JSON.parse(body);
        if (
          data &&
          typeof data.username === 'string' &&
          typeof data.age === 'number' &&
          Array.isArray(data.hobbies)
        ) {
          const user = createUser(data);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
          return;
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Provide all necessary fields!');
          return;
        }
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Wrong method');
      return;
    }
  } else if (url?.startsWith('/api/users/')) {
    const id = url.replace('/api/users/', '');
    console.log({ id });
    if (!isValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Wrong id');
      return;
    }

    const user = getUser(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('User does not exist!');
      return;
    }

    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(user));
      return;
    } else if (method === 'PUT') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        const data = JSON.parse(body);
        if (
          data &&
          typeof data.username === 'string' &&
          typeof data.age === 'number' &&
          Array.isArray(data.hobbies)
        ) {
          const updatedUser = updateUser({ id, updatedUser: data });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedUser));
          return;
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Provide all necessary fields!');
          return;
        }
      });
    } else if (method === 'DELETE') {
      // const isUserDeleted = deleteUser(id);
      deleteUser(id);
      res.writeHead(204, { 'Content-Type': 'text/plain' });
      res.end('User deleted successfully!');
      return;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Wrong URL');
    return;
  }
};
