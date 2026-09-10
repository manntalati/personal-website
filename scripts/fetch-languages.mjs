#!/usr/bin/env node
/**
 * Bakes each project's top-2 GitHub languages into public/repo-languages.json
 * at build time, so the browser never calls the GitHub API.
 *
 * Deliberately unauthenticated: GitHub allows 60 requests/hour per IP and this
 * makes one per repo, so there is no token to store, rotate, or leak. If the
 * project ever grows past that ceiling, add an Authorization header here — from
 * a plain env var, never a VITE_-prefixed one, which Vite would inline into the
 * public client bundle.
 *
 * Never fails the build: on any error it keeps whatever JSON is already there,
 * so a GitHub outage degrades to slightly stale labels instead of a red deploy.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = resolve(ROOT, 'src/content.ts');
const OUT = resolve(ROOT, 'public/repo-languages.json');
const TOP_N = 2;

const log = (...a) => console.log('[fetch-languages]', ...a);

/** Pull { id, owner, repo } out of content.ts without needing a TS toolchain. */
async function readProjects() {
    const src = await readFile(CONTENT, 'utf8');
    const block = src.slice(src.indexOf('export const projects'));
    const out = [];
    // Each project object exposes an id before its githubUrl.
    const re = /id:\s*"([^"]+)"[\s\S]*?githubUrl:\s*"https:\/\/github\.com\/([^/"]+)\/([^/"]+)"/g;
    let m;
    while ((m = re.exec(block)) !== null) {
        out.push({ id: m[1], owner: m[2], repo: m[3] });
    }
    return out;
}

async function topLanguages({ owner, repo }) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) throw new Error(`${owner}/${repo} -> ${res.status} ${res.statusText}`);
    const data = await res.json();
    return Object.entries(data)
        .sort(([, a], [, b]) => b - a)
        .slice(0, TOP_N)
        .map(([lang]) => lang);
}

async function main() {
    const projects = await readProjects();
    if (projects.length === 0) {
        log('no projects with a githubUrl found — nothing to do');
        return;
    }
    log(`${projects.length} repos`);

    const existing = await readFile(OUT, 'utf8').then(JSON.parse).catch(() => ({}));
    const result = { ...existing };
    let ok = 0;

    // Settle all of them: one bad repo shouldn't cost us the other two.
    const settled = await Promise.allSettled(projects.map(p => topLanguages(p)));
    settled.forEach((r, i) => {
        const { id, owner, repo } = projects[i];
        if (r.status === 'fulfilled') {
            result[id] = r.value;
            ok++;
            log(`  ${owner}/${repo}: ${r.value.join(', ') || '(none)'}`);
        } else {
            // Keep the previous value for this repo rather than dropping the label.
            log(`  ${owner}/${repo}: FAILED (${r.reason.message}) — keeping previous`);
        }
    });

    await writeFile(OUT, JSON.stringify(result, null, 2) + '\n');
    log(`wrote ${Object.keys(result).length} entries (${ok}/${projects.length} refreshed)`);
}

main().catch(err => {
    // Never break the build over this.
    console.warn('[fetch-languages] skipped:', err.message);
});
