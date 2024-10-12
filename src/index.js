import { stdin } from 'process';

import { getUsernameFromArgs, greetUser, sayGoodbye } from './hiBye/hiByeUser.js';

const username = getUsernameFromArgs();

greetUser(username);

stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === '.exit') {
    sayGoodbye(username);
    process.exit();
  }
});

process.on('SIGINT', () => {
  sayGoodbye(username);
  process.exit();
});