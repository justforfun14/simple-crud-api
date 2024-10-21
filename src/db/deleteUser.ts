import db from './db.js';

export const deleteUser = (id: string) => {
  return db.delete(id);
};
