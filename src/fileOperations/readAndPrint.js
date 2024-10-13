import { join } from 'path';
import { createReadStream } from 'fs';
import { cwd } from 'process';

export const cat = (fileName) => {
    const filePath = join(cwd(), fileName);
    const stream = createReadStream(filePath, { encoding: 'utf-8' });

    stream.on('data', (chunk) => {
      console.log(chunk);
    });

    stream.on('error', (err) => {
      console.error('Operation failed');
      console.error('Details:', err.message);
    });
};