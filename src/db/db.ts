import { User } from '../types/user.type.js';

const db = new Map<string, User>();
db.set('b14e4511-08ba-4c29-bb65-5434f340bfeb', {
  id: 'b14e4511-08ba-4c29-bb65-5434f340bfeb',
  username: 'zhopa',
  age: 12,
  hobbies: [],
});
db.set('4a2d9c66-1d52-4136-b03f-cabf32190ac9', {
  id: '4a2d9c66-1d52-4136-b03f-cabf32190ac9',
  username: 'zhopa',
  age: 12,
  hobbies: [],
});

export default db;
