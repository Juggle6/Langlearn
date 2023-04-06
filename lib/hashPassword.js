import bcrypt from 'bcrypt';

async function hash(password) {
  return await bcrypt.hash(password, 13);
};

async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
};

module.exports = { hash, compare };
