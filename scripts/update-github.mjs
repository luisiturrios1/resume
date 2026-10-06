import { readFile, writeFile } from 'node:fs/promises';
const repositories = JSON.parse(await readFile('src/data/open-source.json', 'utf8'));
let failed = false;
for (const repo of repositories) {
  try {
    const url = new URL(repo.repository);
    const api = `https://api.github.com/repos${url.pathname}`;
    const response = await fetch(api, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Repository HTTP ${response.status}`);
    const data = await response.json();
    const releaseResponse = await fetch(`${api}/releases/latest`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!releaseResponse.ok && releaseResponse.status !== 404)
      throw new Error(`Release HTTP ${releaseResponse.status}`);
    const release = releaseResponse.ok ? await releaseResponse.json() : null;
    Object.assign(repo, {
      stars: data.stargazers_count,
      language: data.language ?? '—',
      license: data.license?.spdx_id ?? '—',
      release: release?.tag_name ?? null,
      fetchedAt: new Date().toISOString(),
    });
    console.log(`Updated ${repo.name}`);
  } catch (error) {
    failed = true;
    console.error(`Kept existing snapshot for ${repo.name}: ${error.message}`);
  }
}
await writeFile('src/data/open-source.json', JSON.stringify(repositories, null, 2) + '\n');
if (failed) process.exitCode = 1;
