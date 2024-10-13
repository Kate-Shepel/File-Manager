import { readdir } from 'fs/promises';
import { cwd } from 'process';

export const listContent = async () => {
    try {
        const currentPath = cwd();
        const entries = await readdir(currentPath, { withFileTypes: true });

        const sortedEntries = entries.sort((a, b) => {
            if (a.isDirectory() === b.isDirectory()) {
                return a.name.localeCompare(b.name);
            }
            return a.isDirectory() ? -1 : 1;
        });

        const displayEntries = sortedEntries.map((entry) => ({
            Name: entry.name,
            Type: entry.isDirectory() ? 'directory' : 'file'
        }));

        console.table(displayEntries);
    } catch (err) {
        console.error('FS operation failed');
    }
};