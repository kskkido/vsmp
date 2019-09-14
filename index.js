const { reset, progress } = require('./src');

const commands = {
  reset,
  progress,
}

const runCommand = (cmd, ...args) => (
  cmd in commands
    ? commands[cmd](...args)
    : console.error('invalid command')
)

runCommand(...process.argv.slice(2));
