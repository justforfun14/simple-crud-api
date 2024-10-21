import { User } from '../types/user.type.js';
import db from './db.js';

type UpdateUser = {
  id: string;
  updatedUser: User;
};

export const updateUser = ({ id, updatedUser }: UpdateUser) => {
  const user = db.get(id);
  if (!user) return null;

  const newUser = {
    ...user,
    ...updatedUser,
  };

  db.set(id, newUser);

  return newUser;
};
