import { join, basename, isAbsolute } from 'path';
import { unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'process';

export const move = async (sourcePath, targetDirectory) => {
  try {
    const srcFilePath = isAbsolute(sourcePath) ? sourcePath : join(cwd(), sourcePath);
    const trgDirPath = isAbsolute(targetDirectory) ? targetDirectory : join(cwd(), targetDirectory);
    const trgFilePath = join(trgDirPath, basename(srcFilePath));

    const sourceStream = createReadStream(srcFilePath);
    const destinationStream = createWriteStream(trgFilePath);

    sourceStream.on('error', (err) => {
      console.error('Operation failed during file reading:', err.message);
    });

    destinationStream.on('error', (err) => {
      console.error('Operation failed during file writing:', err.message);
    });

    sourceStream.pipe(destinationStream);

    destinationStream.on('finish', async () => {
      console.log(`File ${basename(sourcePath)} has been moved successfully to ${targetDirectory}`);

      try {
        await unlink(srcFilePath);
        console.log(`-----File ${basename(sourcePath)} has been also deleted from ${srcFilePath}-----`);
      } catch (err) {
        console.error('Operation failed to remove the original file:', err.message);
      }
    });
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};