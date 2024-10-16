import { join, isAbsolute } from 'path';
import { unlink } from 'fs/promises';
import { cwd } from 'process';

export const remove = async (targetFile) => {
  try {
    const targetFilePath = isAbsolute(targetFile) ? targetFile : join(cwd(), targetFile);

    await unlink(targetFilePath);
    console.log(`File ${targetFile} has been successfully deleted.`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};