import { copyFile, mkdir } from 'node:fs/promises';

const source = new URL('../../', import.meta.url);
const target = new URL('../www/', import.meta.url);
await mkdir(new URL('icons/', target), { recursive: true });
for (const file of ['index.html', 'game.css', 'manifest.webmanifest', 'icons/fibi-192.png', 'icons/fibi-512.png']) {
 await copyFile(new URL(file, source), new URL(file, target));
}
