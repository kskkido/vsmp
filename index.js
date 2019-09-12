const fs = require('fs');
const path = require('path');
const { promisify } = require('./utils/promise');
const { displayFromFile } = require('./modules/epd');
const { singleFrame } = require('./modules/single-frame');
const { frame } = require('./config');

const relativePath = filePath => (
  path.join(
    path.dirname(fs.realpathSync(__filename)),
    filePath
  )
);

const reset = () => (
  promisify(fs.writeFile)(
    relativePath('/config.js'),
    JSON.stringify(({ frame: 0 }), '', ' ')
  )
)

const progress = () => (
  singleFrame({
    frame,
    input: relativePath('/assets/caveOfRebirth.mp4'),
  })
    .then(displayFromFile)
    .then(() => promisify(fs.writeFile)(
      relativePath('/config.js'),
      JSON.stringify(({ frame: frame + 1 }), '', ' ')
    ))
    .catch(e => console.error(e))
);

module.exports = {
  reset,
  progress
}