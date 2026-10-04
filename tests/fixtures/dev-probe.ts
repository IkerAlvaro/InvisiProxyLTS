import type { ViteDevServer } from 'vite';
import assert from 'node:assert/strict';
import { readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gunzipSync } from 'node:zlib';
const load = <T>(path: string): Promise<T> =>
	import(pathToFileURL(join(process.cwd(), path)).href);
const { canUpdateDevelopmentFiles, updateDevelopmentFiles } =
	await load<typeof import('../../src/vite-dev.ts')>('src/vite-dev.ts');
const { tryReadFile, preloaded404 } =
	await load<typeof import('../../src/files.ts')>('src/files.ts');
const { flatAltPaths, config } =
	await load<typeof import('../../src/site-config.ts')>('src/site-config.ts');
const { createSiteApp } =
	await load<typeof import('../../src/app.ts')>('src/app.ts');
const root = process.cwd();
assert.equal(
	canUpdateDevelopmentFiles(root, [
		'src/client/faq-search.tsx',
		'views/assets/js/link.js',
	]),
	true
);
for (const paths of [
	['config.json'],
	['src/server.ts'],
	['views/deleted.js'],
	['src/client/deleted.tsx'],
])
	assert.equal(
		canUpdateDevelopmentFiles(root, paths),
		false,
		JSON.stringify(paths)
	);
await writeFile(
	'views/assets/js/test-update.js',
	'document.body.dataset.updated = "yes";'
);
await writeFile('views/assets/txt/test-update.txt', 'updated asset');
const document =
	'<!doctype html><html><head><title>Updated</title></head><body>Fresh document</body></html>';
let rendered = 0;
const server = {
	config: { root },
	async ssrLoadModule(path: string) {
		assert.equal(path, '/src/client/entry.tsx');
		rendered++;
		return {
			renderDocuments: () => ({
				'index.html': document,
				'pages/misc/deobf/entry-point.html': document,
			}),
		};
	},
};
await updateDevelopmentFiles(server as unknown as ViteDevServer, [
	'views/assets/js/test-update.js',
	'views/assets/txt/test-update.txt',
	'src/client/faq-search.tsx',
]);
assert.equal(rendered, 1);
assert.equal(
	await readFile('views/dist/assets/txt/test-update.txt', 'utf8'),
	'updated asset'
);
const output = await readFile('views/dist/assets/js/test-update.js', 'utf8');
assert.ok(output.includes('updated') && output.includes('yes'));
const faqName = flatAltPaths['files/faq-search.js'] || 'faq-search.js';
await access(`views/dist/assets/js/${faqName}`);
const raw = await readFile('views/dist/index.html');
const html = config.disguiseFiles ? gunzipSync(raw).toString() : raw.toString();
assert.ok(html.includes('Fresh document'));
assert.ok(html.includes('/school/@vite/client'));
assert.ok(
	(
		await readFile('views/dist/pages/misc/deobf/entry-point.html', 'utf8')
	).includes('Fresh document')
);
assert.equal(
	tryReadFile(
		'views/dist/assets/txt/test-update.txt',
		pathToFileURL(`${root}/`),
		false
	),
	'updated asset'
);
assert.deepEqual(
	tryReadFile('missing', pathToFileURL(`${root}/`)),
	preloaded404
);
assert.equal(
	await readFile('views/dist/index.html.tmp', 'utf8').then(
		() => true,
		() => false
	),
	false
);
const app = createSiteApp();
try {
	assert.equal(
		(await app.inject('/school/login')).headers['cache-control'],
		'no-store'
	);
} finally {
	await app.close();
}
console.log(
	'Incremental asset updates, FAQ compilation, document replacement, gzip, loader exceptions and development cache policy passed.'
);
