const fs = require('fs');
const path = require('path');
const { thunkify } = require('ramda');
const { promisify } = require('./utils/promise');
const { displayFromFile } = require('../modules/epd');
const { singleFrame } = require('../modules/single-frame');
const { frame } = require('./constants/config.json');

const relativePath = filePath => (
  path.join(
    path.dirname(fs.realpathSync(__filename)),
    filePath
  )
);

const setFrame = (
  frame
) => (
  promisify(fs.writeFile)(
    relativePath('/constants/config.json'),
    JSON.stringify(({ frame }), '', ' ')
  )
)

const reset = (
  thunkify(setFrame)(0)
)

const progress = (
  input = relativePath('/samples/fallback.mp4')
) => (
  singleFrame({
    frame,
    input: input,
  })
    .then(displayFromFile)
    .then(thunkify(setFrame)(frame + 1))
    .catch(e => console.error(e))
);

module.exports = {
  reset,
  progress
}
