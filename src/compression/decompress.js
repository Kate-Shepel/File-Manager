import { join, basename, isAbsolute } from 'path';
import { cwd } from 'process';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { stat } from 'fs/promises';

const pipe = promisify(pipeline);

export const decompress = async (srcPath, destPath) => {
  try {
    const srcFilePath = isAbsolute(srcPath) ? srcPath : join(cwd(), srcPath);
    let destFilePath = isAbsolute(destPath) ? destPath : join(cwd(), destPath);

    const originalFileName = basename(srcFilePath, '.br');
    const destStat = await stat(destFilePath);

    if (destStat.isDirectory()) {
      destFilePath = join(destFilePath, originalFileName);
    }

    const srcStream = createReadStream(srcFilePath);
    const destStream = createWriteStream(destFilePath);
    const brotliDecompressStream = createBrotliDecompress();

    await pipe(srcStream, brotliDecompressStream, destStream);

    console.log(`File ${srcPath} decompressed successfully to ${destFilePath}`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};