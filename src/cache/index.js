const fs = require('fs');
const { relativePath } = require('../utils/path');
const { promisify } = require('../utils/promise');

const read = () => (
  promisify(fs.readFile)(
    relativePath(__filename, './data.json')
  )
    .then(JSON.parse)
);

const write = (next) => (
  read()
    .then(curr => promisify(fs.writeFile)(
      relativePath(__filename, './data.json'),
      JSON.stringify(({ ...curr, ...next }), '', ' ')
    ))
)

const update = async (fn) => {
  const curr = await read();
  const next = await fn(curr);
  
  return (
    next.frame > curr.total
      ? write({ ...next, frame: 0 })
      : write(next)
  )
}

module.exports = {
  read,
  write,
  update
}