import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const exampleDirs = readdirSync(__dirname).filter((file) => {
  if (/^\./.test(file)) return false;
  if (/node_modules/.test(file)) return false;
  return statSync(join(__dirname, file)).isDirectory();
});

// Ordering is important here. `npm install` must come first.
const cmdArgs = [
  { cmd: 'npm', args: [ 'install', '-s' ] },
  { cmd: '../node_modules/.bin/dool', args: [ 'build' ] }
];

for (let dir of exampleDirs) {
  for (let cmdArg of cmdArgs) {
    let opts = {
      cwd: join(__dirname, dir),
      stdio: 'inherit'
    };
    let result = {};
    if (process.platform === 'win32') {
      result = spawnSync(cmdArg.cmd + '.cmd', cmdArg.args, opts);
    } else {
      result = spawnSync(cmdArg.cmd, cmdArg.args, opts);
    }
    if (result.status !== 0) {
      throw new Error('Building examples failed!');
    }
  }
}

console.log(['\u001b[31m',
  '  ________               ______  ',
  '  ___  __ \\______ ______ ___  / ',
  '  __  / / /_  __ \\_  __ \\__  / ',
  '  _  /_/ / / /_/ // /_/ /_  /    ',
  '  /_____/  \\____/ \\____/ /_/   ',
  '                                 ',
  '\u001b[39m'
].join('\n'));