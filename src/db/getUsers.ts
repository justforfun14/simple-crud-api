import db from './db.js';

export const getUsers = () => {
  const users = db.entries();

  return Object.fromEntries(users);
};
