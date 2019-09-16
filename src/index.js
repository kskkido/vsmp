const { always, thunkify } = require('ramda');
const { displayFromFile } = require('../modules/epd'); 
const { singleFrame, frameMeta } = require('../modules/single-frame');
const { relativePath } = require('./utils/path');
const cache = require('./cache');

const reset = () => (
  cache.update(always({
    frame: 0
  }))
)

const progress = (
  input = relativePath(__filename, '/samples/fallback.mp4')
) => (
  cache.read()
    .then(data => (
      data.input === input
        ? Promise.resolve()
        : init(input)
    ))
    .then(thunkify(render)(input))
    .catch(e => console.error(e))
)

const init = input => (
  cache.update(_ => (
    frameMeta({ input })
      .then(({ total }) => ({
        input,
        total,
        frame: 0,
      }))
  ))
)

const render = input => (
  cache.update(({ frame }) => (
    singleFrame({
      input,
      frame,
    })
      .then(displayFromFile)
      .then(always({
        frame: frame + 1
      }))
  ))
)

module.exports = {
  reset,
  progress,
}
