// Generates web-sized images for the photography page.
//
//   Reads originals from   photos/<city>/<name>.<ext>
//   Writes (per image)     public/photography/<city>/<name>.webp        full size, for the lightbox
//                          public/photography/<city>/<name>.thumb.webp  small,     for the grid
//
// Run:  npm run optimize:photos   (also runs automatically on `npm run dev` / `npm run build`)
// Idempotent: only (re)builds outputs that are missing or older than their source.

import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(root, 'photos');
const OUT_DIR = path.join(root, 'public', 'photography');

const FULL = { width: 2000, quality: 80, suffix: '.webp' };
const THUMB = { width: 700, quality: 72, suffix: '.thumb.webp' };
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

async function* walk(dir) {
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(full);
        else yield full;
    }
}

async function upToDate(outFile, srcMtime) {
    try {
        return (await stat(outFile)).mtimeMs >= srcMtime;
    } catch {
        return false;
    }
}

async function main() {
    if (!existsSync(SRC_DIR)) {
        console.log('[optimize-photos] No "photos/" directory — using committed images as-is.');
        return;
    }

    let sharp;
    try {
        sharp = (await import('sharp')).default;
    } catch {
        console.warn('[optimize-photos] "sharp" not installed — skipping (run `npm install`).');
        return;
    }

    let optimized = 0;
    let skipped = 0;
    let failed = 0;

    for await (const file of walk(SRC_DIR)) {
        const ext = path.extname(file).toLowerCase();
        if (!INPUT_EXT.has(ext)) continue;

        const rel = path.relative(SRC_DIR, file);
        const base = rel.slice(0, -ext.length);
        const fullOut = path.join(OUT_DIR, base + FULL.suffix);
        const thumbOut = path.join(OUT_DIR, base + THUMB.suffix);

        let srcMtime;
        try {
            srcMtime = (await stat(file)).mtimeMs;
        } catch {
            continue;
        }

        if ((await upToDate(fullOut, srcMtime)) && (await upToDate(thumbOut, srcMtime))) {
            skipped++;
            continue;
        }

        try {
            await mkdir(path.dirname(fullOut), { recursive: true });
            await sharp(file).rotate().resize({ width: FULL.width, withoutEnlargement: true }).webp({ quality: FULL.quality }).toFile(fullOut);
            await sharp(file).rotate().resize({ width: THUMB.width, withoutEnlargement: true }).webp({ quality: THUMB.quality }).toFile(thumbOut);
            optimized++;
            console.log(`[optimize-photos] ${rel}  ->  photography/${base.split(path.sep).join('/')}.webp (+ .thumb.webp)`);
        } catch (err) {
            failed++;
            console.error(`[optimize-photos] FAILED ${rel}: ${err.message}`);
        }
    }

    console.log(`[optimize-photos] done — ${optimized} optimized, ${skipped} up-to-date, ${failed} failed.`);
}

main();
