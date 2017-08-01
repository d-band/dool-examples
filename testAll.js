const fs = require('fs');
const join = require('path').join;
const cp = require('child_process');

const exampleDirs = fs.readdirSync(__dirname).filter((file) => {
  if (/^\./.test(file)) return false;
  if (/node_modules/.test(file)) return false;
  return fs.statSync(join(__dirname, file)).isDirectory();
});

exampleDirs.forEach(dir => {
  const cwd = join(__dirname, dir);
  const opts = { cwd: cwd, stdio: 'inherit' };
  const exec = (cmd, args) => {
    const out = cp.spawnSync(cmd, args, opts);
    if (out.status !== 0) {
      throw new Error('Building examples failed!');
    }
  };
  if(fs.existsSync(join(cwd, 'package.json'))) {
    exec('npm', ['install', '-s']);
  }
  exec('../node_modules/.bin/dool', ['build']);
});

console.log(['\u001b[31m',
  '  ________               ______  ',
  '  ___  __ \\______ ______ ___  / ',
  '  __  / / /_  __ \\_  __ \\__  / ',
  '  _  /_/ / / /_/ // /_/ /_  /    ',
  '  /_____/  \\____/ \\____/ /_/   ',
  '                                 ',
  '\u001b[39m'
].join('\n'));