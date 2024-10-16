import { join } from 'path';
import { rename as modifyFileName, stat } from 'fs/promises';
import { cwd } from 'process';

export const rename = async (oldFileName, newFileName) => {
  try {
    const oldFilePath = join(cwd(), oldFileName);
    const newFilePath = join(cwd(), newFileName);

    await stat(oldFilePath);

    try {
      await stat(newFilePath);
      console.error('Operation failed: A file with the new name already exists.');
      return;
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Operation failed');
        return;
      }
    }

  await modifyFileName(oldFilePath, newFilePath);
  console.log(`File renamed from ${oldFileName} to ${newFileName}`);
  } catch (err) {
    console.error('Operation failed');
  }
};