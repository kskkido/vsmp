const fs = require('fs');
const path = require('path');

const relativePath = (dirPath, subPath) => (
  path.join(
    path.dirname(fs.realpathSync(dirPath)),
    subPath
  )
);

module.exports = {
  relativePath,
}
