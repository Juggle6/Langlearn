import bcrypt from 'bcrypt';

async function hash(password) {
  console.time("hashTime");
  const hash = await bcrypt.hash(password, 14);
  console.timeEnd("hashTime");
  console.log({
    password,
    hash
  });
  return hash;
};

async function compare(password, hash) {
  console.time("compareTime");
  const isMatch = await bcrypt.compare(password, hash);
  console.timeEnd("compareTime");
  console.log({
    password,
    hash,
    isMatch
  })
  return isMatch;
};

module.exports = { hash, compare };
