const R = require('ramda');

const promisify = nodeFn => (
  (...args) => new Promise((res, rej) => {
    nodeFn(...args.concat((err, ...data) => (
      err ? rej(err) : res(...data)
    )))
  })
);

module.exports = {
  promisify,
};
