import { cwd, chdir } from 'process';
import { resolve, dirname } from 'path';
import { homedir } from 'os';

export const printWorkingDirectory = () => {
  console.log(`You are currently in ${cwd()}`);
};

export const goUp = () => {
  try {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);

    if (currentDir !== resolve('/')) {
      chdir(parentDir);
    }

    printWorkingDirectory();
  } catch (err) {
    console.error('Operation failed');
  }
};

export const initializeWorkingDirectory = () => {
  try {
    chdir(homedir());
    printWorkingDirectory();
  } catch (err) {
    console.error('Operation failed');
  }
};