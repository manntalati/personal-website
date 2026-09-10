#!/usr/bin/env node
/**
 * Builds the restaurant photos behind the "Top 10" cards.
 *
 *   Reads originals from   restaurants/<anything>.<ext>     (gitignored)
 *   Writes                 public/beli/<slug>.webp          (committed, shipped)
 *   Updates                public/beli.json -> "images"     { restaurant slug: path }
 *
 * Filenames are matched to restaurants by slug, and a prefix is enough — a file
 * called `roop.jpg` matches "ROOP Chicago Innovative Indian Restaurant & Cocktail
 * Bar", so you never have to type the long names out. Anything already sitting in
 * public/beli/ is picked up as-is, so you can also just drop a .webp in there.
 *
 * The map lives outside `top10` on purpose: scripts/sync-beli.mjs replaces the
 * rankings wholesale, and this survives that.
 *
 * Run:  npm run beli:images   (also runs automatically on `npm run dev` / `npm run build`)
 * Idempotent: only (re)builds outputs that are missing or older than their source.
 */

import { readdir, mkdir, stat, readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(root, 'restaurants');
const OUT_DIR = path.join(root, 'public', 'beli');
const FEED = path.join(root, 'public', 'beli.json');
const PUBLIC_PREFIX = '/beli/';

// Cards top out around 320 CSS px, so 900 covers 2x displays with room to spare.
const WIDTH = 900;
const QUALITY = 74;

const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic', '.heif']);
const HEIC_EXT = new Set(['.heic', '.heif']);
const SERVABLE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

const log = (...a) => console.log('[beli-images]', ...a);

/** Must stay in sync with slugify() in src/Beli.tsx. */
const slugify = (s) =>
    s.toLowerCase()
        .normalize('NFKD')
        .replace(/['’]/g, '')      // "Pago's" -> pagos, not pago-s
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

/** A short, typeable filename suggestion: the first couple of words of the name. */
const suggest = (name) => {
    const words = slugify(name).split('-');
    if (words[0] === 'the' && words.length > 1) words.shift();
    return words.slice(0, 2).join('-');
};

// sharp's prebuilt libvips can't decode iPhone HEICs, so hand those to macOS `sips`.
async function decodable(file) {
    if (!HEIC_EXT.has(path.extname(file).toLowerCase())) return { input: file, cleanup: () => {} };
    const dir = await mkdtemp(path.join(tmpdir(), 'beli-images-'));
    const png = path.join(dir, 'source.png');
    const cleanup = () => rm(dir, { recursive: true, force: true });
    try {
        await run('sips', ['-s', 'format', 'png', file, '--out', png]);
    } catch (err) {
        await cleanup();
        throw new Error(`cannot decode HEIC (needs macOS \`sips\`): ${err.message}`);
    }
    return { input: png, cleanup };
}

async function upToDate(outFile, srcMtime) {
    try {
        return (await stat(outFile)).mtimeMs >= srcMtime;
    } catch {
        return false;
    }
}

/** restaurants/*.jpg -> public/beli/<slug>.webp */
async function optimize() {
    if (!existsSync(SRC_DIR)) {
        log('no "restaurants/" directory — using whatever is already in public/beli/.');
        return;
    }

    let sharp;
    try {
        sharp = (await import('sharp')).default;
    } catch {
        console.warn('[beli-images] "sharp" not installed — skipping optimization (run `npm install`).');
        return;
    }

    let optimized = 0, skipped = 0, failed = 0;

    for (const entry of await readdir(SRC_DIR, { withFileTypes: true })) {
        if (!entry.isFile()) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (!INPUT_EXT.has(ext)) continue;

        const src = path.join(SRC_DIR, entry.name);
        const slug = slugify(entry.name.slice(0, -ext.length));
        if (!slug) continue;
        const out = path.join(OUT_DIR, `${slug}.webp`);

        let srcMtime;
        try {
            srcMtime = (await stat(src)).mtimeMs;
        } catch {
            continue;
        }

        if (await upToDate(out, srcMtime)) {
            skipped++;
            continue;
        }

        let cleanup = () => {};
        try {
            const decoded = await decodable(src);
            cleanup = decoded.cleanup;
            await mkdir(OUT_DIR, { recursive: true });
            await sharp(decoded.input)
                .rotate()
                .resize({ width: WIDTH, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(out);
            optimized++;
            log(`${entry.name}  ->  beli/${slug}.webp`);
        } catch (err) {
            failed++;
            console.error(`[beli-images] FAILED ${entry.name}: ${err.message}`);
        } finally {
            await cleanup();
        }
    }

    log(`${optimized} optimized, ${skipped} up-to-date, ${failed} failed.`);
}

/** Everything servable in public/beli/, keyed by slug. */
async function availablePhotos() {
    let entries;
    try {
        entries = await readdir(OUT_DIR, { withFileTypes: true });
    } catch {
        return new Map();
    }
    const photos = new Map();
    for (const entry of entries) {
        if (!entry.isFile()) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (!SERVABLE_EXT.has(ext)) continue;
        photos.set(slugify(entry.name.slice(0, -ext.length)), PUBLIC_PREFIX + entry.name);
    }
    return photos;
}

/** Exact slug, else the longest prefix match in either direction. */
function findPhoto(name, photos) {
    const slug = slugify(name);
    if (photos.has(slug)) return photos.get(slug);

    // A leading article is noise in a filename, so "desi-accent.jpg" has to
    // match "The Desi Accent" — the same trim suggest() makes.
    const bare = slug.startsWith('the-') ? slug.slice(4) : slug;

    const hits = [...photos.keys()]
        .filter(p => p.length >= 3 && [slug, bare].some(s => s.startsWith(p) || p.startsWith(s)))
        .sort((a, b) => b.length - a.length);

    if (hits.length > 1) {
        log(`"${name}" matches ${hits.length} files (${hits.join(', ')}) — using "${hits[0]}".`);
    }
    return hits.length ? photos.get(hits[0]) : null;
}

async function updateFeed(photos) {
    const feed = JSON.parse(await readFile(FEED, 'utf8'));
    const previous = feed.images ?? {};

    // Entries pointing outside /beli/ are hand-written (a remote URL, say) — keep them.
    const images = Object.fromEntries(
        Object.entries(previous).filter(([, v]) => typeof v === 'string' && !v.startsWith(PUBLIC_PREFIX)),
    );

    const missing = [];
    for (const r of feed.top10 ?? []) {
        const slug = slugify(r.name);
        if (images[slug]) continue;            // hand-written entry wins
        const photo = findPhoto(r.name, photos);
        if (photo) images[slug] = photo;
        else missing.push(r.name);
    }

    if (JSON.stringify(feed.images ?? {}) === JSON.stringify(images)) {
        log(`no change — ${Object.keys(images).length} of ${(feed.top10 ?? []).length} restaurants have a photo.`);
    } else {
        feed.images = images;
        await writeFile(FEED, JSON.stringify(feed, null, 2) + '\n');
        log(`wrote ${Object.keys(images).length} image mappings to public/beli.json`);
    }

    for (const name of missing) {
        log(`no photo for "${name}" — drop one at restaurants/${suggest(name)}.jpg`);
    }
}

async function main() {
    await optimize();
    await updateFeed(await availablePhotos());
}

main().catch(err => {
    console.error('[beli-images] failed:', err.message);
    process.exit(1);
});
