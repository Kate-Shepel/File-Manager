import { stdin } from 'process';

import { getUsernameFromArgs, greetUser, sayGoodbye } from './hiBye/hiByeUser.js';
import { goUp, initWorkingDir, switchDirectory } from './navigation/navigation.js';
import { listContent } from './list/list.js';
import { cat } from './fileOperations/readAndPrint.js';

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
    default:
      console.log('Invalid input');
  }
});

process.on('SIGINT', () => {
  sayGoodbye(username);
  process.exit();
});