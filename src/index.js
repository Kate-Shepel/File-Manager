import { stdin } from 'process';

import { getUsernameFromArgs, greetUser, sayGoodbye } from './hiBye/hiByeUser.js';
import { goUp, initWorkingDir, switchDirectory } from './navigation/navigation.js';
import { listContent } from './list/list.js';
import { cat } from './fileOperations/readAndPrint.js';
import { add } from './fileOperations/create.js';
import { rename } from './fileOperations/rename.js';
import { copy } from './fileOperations/copy.js';
import { move } from './fileOperations/move.js';
import { remove } from './fileOperations/delete.js';
import { 
  showCPUArchitecture,
  showCPUInfo,
  showEOL,
  showHomeDir,
  showSystemUserName
} from './osInfo/osInfo.js';
import { calculateHash } from './hash/hash.js';

const username = getUsernameFromArgs();

greetUser(username);
initWorkingDir();

stdin.on('data', (data) => {
  const input = data.toString().trim();
  const [command, ...args] = input.split(' ');

  switch (command) {
    case '.exit':
      sayGoodbye(username);
      process.exit();
      break;
    case 'up':
      goUp();
      break;
    case 'cd':
      if (args.length > 0) {
        switchDirectory(args.join(' '));
      } else {
        console.log('Invalid input');
      }
      break;
    case 'ls':
      listContent();
      break;
    case 'cat':
      if (args.length > 0) {
        cat(args.join(' '));
      } else {
        console.log('Invalid input');
      }
      break;
    case 'add':
      if (args.length > 0) {
        add(args.join(' '));
      } else {
        console.log('Invalid input');
      }
      break;
    case 'rn':
      if (args.length === 2) {
        rename(args[0], args[1]);
      } else {
        console.log('Invalid input');
      }
      break;
    case 'cp':
      if (args.length === 2) {
        copy(args[0], args[1]);
      } else {
        console.log('Invalid input');
      }
      break;
    case 'rm':
      if (args.length > 0) {
        remove(args.join(' '));
      } else {
        console.log('Invalid input');
      }
      break;
    case 'mv':
      if (args.length === 2) {
        move(args[0], args[1]);
      } else {
        console.log('Invalid input');
      }
      break;
    case 'hash':
      if (args.length > 0) {
        calculateHash(args.join(' '));
      } else {
        console.log('Invalid input');
      }
      break;
    case 'os':
      if (args.length === 1) {
        switch (args[0]) {
          case '--EOL':
            showEOL();
            break;
          case '--cpus':
            showCPUInfo();
            break;
          case '--homedir':
            showHomeDir();
            break;
          case '--username':
            showSystemUserName();
            break;
          case '--architecture':
            showCPUArchitecture();
            break;
          default:
            console.log('Invalid input');
        }
      } else {
        console.log('Invalid input');
      }
      break;
    default:
      console.log('Invalid input');
  }
});

process.on('SIGINT', () => {
  sayGoodbye(username);
  process.exit();
});