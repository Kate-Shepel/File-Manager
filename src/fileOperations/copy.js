import { join, basename, isAbsolute } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'process';

export const copy = async (sourcePath, targetDirectory) => {
  try {
    const srcFilePath = isAbsolute(sourcePath) ? sourcePath : join(cwd(), sourcePath);
    const trgDirPath = isAbsolute(targetDirectory) ? targetDirectory : join(cwd(), targetDirectory);
    const trgFilePath = join(trgDirPath, basename(srcFilePath));

    const sourceStream = createReadStream(srcFilePath);
    const destinationStream = createWriteStream(trgFilePath);

    sourceStream.on('error', (err) => {
      console.error('Operation failed during reading the file:', err.message);
    });

    destinationStream.on('error', (err) => {
      console.error('Operation failed during writing the file:', err.message);
    });

    sourceStream.pipe(destinationStream);

    destinationStream.on('finish', () => {
      console.log(`File ${sourcePath} copied successfully to ${targetDirectory}`);
    });
  } catch (err) {
    console.error('Operation failed');
  }
};