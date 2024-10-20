import { User } from '../types/user.type.js';
import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

export const createUser = (user: Omit<User, 'id'>) => {
  const id = uuidv4();

  const createdUser = {
    id,
    ...user,
  };

  db.set(id, createdUser);

  return createdUser;
};
