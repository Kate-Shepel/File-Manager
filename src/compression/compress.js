import { join, basename, isAbsolute } from 'path';
import { cwd } from 'process';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { stat } from 'fs/promises';

const pipe = promisify(pipeline);

export const compress = async (srcPath, destPath) => {
  try {
    const srcFilePath = isAbsolute(srcPath) ? srcPath : join(cwd(), srcPath);
    let destFilePath = isAbsolute(destPath) ? destPath : join(cwd(), destPath);

    const destStat = await stat(destFilePath);
    if (destStat.isDirectory()) {
      destFilePath = join(destFilePath, `${basename(srcFilePath)}.br`);
    }

    const srcStream = createReadStream(srcFilePath);
    const destStream = createWriteStream(destFilePath);
    const brotliCompressStream = createBrotliCompress();

    await pipe(srcStream, brotliCompressStream, destStream);

    console.log(`File ${srcPath} compressed successfully to ${destFilePath}`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};