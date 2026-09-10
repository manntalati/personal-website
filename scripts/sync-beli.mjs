#!/usr/bin/env node
/**
 * Refreshes public/beli.json — the feed behind the "Top 10" section.
 *
 * Beli has no public API. beliapp.co/account/<handle> 307-redirects to a
 * Squarespace marketing page and api.beliapp.com does not resolve, so there is
 * nothing sanctioned to poll. This script therefore supports two sources:
 *
 *   1. --from <file>     Import a JSON export you produced yourself.
 *   2. BELI_API_URL      Your own authenticated endpoint, sent with BELI_TOKEN.
 *                        Shape it with mapPayload() below to match the app's
 *                        actual response.
 *
 * With neither configured it exits 0 and leaves the file untouched, so a
 * scheduled run can never blank out a live site.
 *
 *   node scripts/sync-beli.mjs --from ~/Downloads/beli-export.json
 *   BELI_API_URL=... BELI_TOKEN=... node scripts/sync-beli.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'public/beli.json');
const TOP_N = 10;

const log = (...a) => console.log('[sync-beli]', ...a);

/**
 * Normalizes a raw payload into the shape Beli.tsx renders.
 * Adjust the field names here once you know what your source returns.
 */
function mapPayload(raw) {
    const list =
        raw.top10 ?? raw.rankings ?? raw.restaurants ?? raw.places ?? raw.items ?? [];

    if (!Array.isArray(list)) {
        throw new Error('could not find a restaurant array in the payload');
    }

    const top10 = list.slice(0, TOP_N).map((r, i) => ({
        rank: i + 1,
        name: r.name ?? r.title ?? r.venue_name ?? 'Unknown',
        city: r.city ?? r.location?.city ?? undefined,
        cuisine: r.cuisine ?? r.category ?? undefined,
        score: typeof r.score === 'number' ? Number(r.score.toFixed(1))
            : typeof r.rating === 'number' ? Number(r.rating.toFixed(1))
            : undefined,
        note: r.note ?? r.comment ?? undefined,
    }));

    const scored = top10.filter(r => typeof r.score === 'number');
    const metrics = {
        ranked: raw.metrics?.ranked ?? raw.been_count ?? list.length,
        wantToTry: raw.metrics?.wantToTry ?? raw.want_to_try_count ?? undefined,
        cities: raw.metrics?.cities ?? (new Set(
            list.map(r => r.city ?? r.location?.city).filter(Boolean),
        ).size || undefined),
        avgScore: raw.metrics?.avgScore ?? (scored.length
            ? Number((scored.reduce((s, r) => s + r.score, 0) / scored.length).toFixed(1))
            : undefined),
    };

    return { top10, metrics };
}

async function loadRaw() {
    const fromIdx = process.argv.indexOf('--from');
    if (fromIdx !== -1 && process.argv[fromIdx + 1]) {
        const path = resolve(process.argv[fromIdx + 1]);
        log(`reading ${path}`);
        return JSON.parse(await readFile(path, 'utf8'));
    }

    const url = process.env.BELI_API_URL;
    if (!url) return null;

    log(`fetching ${new URL(url).origin}`);
    const res = await fetch(url, {
        headers: {
            accept: 'application/json',
            ...(process.env.BELI_TOKEN
                ? { authorization: `Bearer ${process.env.BELI_TOKEN}` }
                : {}),
        },
    });
    if (!res.ok) throw new Error(`source responded ${res.status} ${res.statusText}`);
    return res.json();
}

async function main() {
    const raw = await loadRaw();

    if (!raw) {
        log('no source configured (set BELI_API_URL or pass --from); leaving beli.json as-is');
        return;
    }

    const { top10, metrics } = mapPayload(raw);
    if (top10.length === 0) {
        throw new Error('source returned zero restaurants — refusing to overwrite');
    }

    const existing = JSON.parse(await readFile(OUT, 'utf8'));
    const next = {
        ...existing,
        updatedAt: new Date().toISOString(),
        metrics,
        top10,
    };
    delete next.sample; // real data — drop the placeholder badge

    if (JSON.stringify(next.top10) === JSON.stringify(existing.top10) &&
        JSON.stringify(next.metrics) === JSON.stringify(existing.metrics)) {
        log('no change');
        return;
    }

    await writeFile(OUT, JSON.stringify(next, null, 2) + '\n');
    log(`wrote ${top10.length} restaurants — #1 is ${top10[0].name}`);
}

main().catch(err => {
    console.error('[sync-beli] failed:', err.message);
    process.exit(1);
});
