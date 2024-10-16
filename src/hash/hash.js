import { join, isAbsolute } from 'path';
import { cwd } from 'process';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const calculateHash = (filePath) => {
  try {
    const srcFileHashPath = isAbsolute(filePath) ? filePath : join(cwd(), filePath);
    const hashToLog = createHash('sha256');
    const fileReadStream = createReadStream(srcFileHashPath);

    fileReadStream.on('data', (dataPart) => {
      hashToLog.update(dataPart);
    });

    fileReadStream.on('end', () => {
      const hashToLogInHex = hashToLog.digest('hex');
      console.log(`Hash for ${filePath}: ${hashToLogInHex}`);
    });

    fileReadStream.on('error', (err) => {
      console.error('Operation failed during reading the file:', err.message);
    });
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};