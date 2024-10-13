export const getUsernameFromArgs = () => {
  const args = process.argv.slice(2);
  let username = '';

  args.forEach(arg => {
    if (arg.startsWith('--username=')) {
      username = arg.split('=')[1];
    }
  });

  if (!username) {
    console.log('Please provide a valid username using --username argument.');
    process.exit(1);
  }

  return username;
};

export const greetUser = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const sayGoodbye = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};