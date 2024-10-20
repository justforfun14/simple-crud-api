import { routeHandler } from './routes/routeHandler.js';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(routeHandler);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
