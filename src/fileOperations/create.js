import { open } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

export const add = async (fileNameFromInput) => {
  try {
    const filePath = join(cwd(), fileNameFromInput);
    const fileHandle = await open(filePath, 'w');

    await fileHandle.close();
    console.log(`File ${fileNameFromInput} has been created successfully.`);
  } catch (err) {
    console.error('Operation failed');
  }
};