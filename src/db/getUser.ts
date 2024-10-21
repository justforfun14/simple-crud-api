import db from './db.js';

export const getUser = (id: string) => {
  const user = db.get(id);

  return user;
};
