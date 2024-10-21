import db from './db.js';

export const getUsers = () => {
  const users = Array.from(db.entries());

  if (users.length === 0) {
    return [];
  }

  return users.map(([_, user]) => ({ ...user }));
};
