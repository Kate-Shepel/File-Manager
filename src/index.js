import { stdin } from 'process';

import { getUsernameFromArgs, greetUser, sayGoodbye } from './hiBye/hiByeUser.js';
import { goUp, initializeWorkingDirectory } from './navigation/navigation.js';

const username = getUsernameFromArgs();

greetUser(username);
initializeWorkingDirectory();

stdin.on('data', (data) => {
  const input = data.toString().trim();

  switch (input) {
    case '.exit':
      sayGoodbye(username);
      process.exit();
      break;
    case 'up':
      goUp();
      break;
    default:
      console.log('Invalid input');
  }
});

process.on('SIGINT', () => {
  sayGoodbye(username);
  process.exit();
});