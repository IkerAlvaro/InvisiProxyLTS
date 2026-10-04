import assert from 'node:assert/strict';
import test from 'node:test';
import { fixture, run } from '../helpers/fixture.ts';

test('config aliases and default pages agree with SEO and disguise modes', async (t) => {
	for (const usingSEO of [true, false])
		for (const disguiseFiles of [true, false]) {
			const root = await fixture(t, {
				usingSEO,
				disguiseFiles,
				pathname: '/school///',
			});
			await run(root, [
				'--input-type=module',
				'-e',
				`
import assert from 'node:assert/strict';
import { pages, serverUrl, serverPort, getAltPrefix, externalPages, flatAltPaths } from './src/site-config.ts';
assert.equal(serverUrl.pathname, '/school/');
assert.equal(serverPort, 18080);
assert.equal(pages.default, ${JSON.stringify(disguiseFiles ? 'login' : 'index')});
assert.equal(pages[${JSON.stringify(usingSEO ? 'partners' : 'interface')}], 'pages/nav/partners.html');
assert.equal(getAltPrefix('wisp', serverUrl.pathname), ${JSON.stringify(usingSEO ? '/school/wisp/' : '/school/cron/')});
assert.equal(externalPages.github[${JSON.stringify(usingSEO ? 'fastify' : 'fs')}], 'https://github.com/fastify/fastify');
assert.equal('robots.txt' in pages, ${usingSEO});
assert.equal(flatAltPaths['files/sw.js'], ${JSON.stringify(usingSEO ? 'sw.js' : 'service.js')});
`,
			]);
		}
});

test('invalid PORT values fail clearly before server startup', async (t) => {
	const root = await fixture(t);
	for (const PORT of ['0', '-1', '65536', 'abc', '1.5', ''])
		await assert.rejects(
			run(root, ['-e', "import('./src/site-config.ts')"], { PORT }),
			/PORT must be an integer/
		);
});

test('configured mirror files resolve from the project root or an absolute path, independently of cwd', async (t) => {
	const { readFile, writeFile } = await import('node:fs/promises');
	const { join } = await import('node:path');
	const { pathToFileURL } = await import('node:url');
	for (const absolute of [false, true]) {
		const root = await fixture(t);
		if (absolute) {
			const config = JSON.parse(
				await readFile(join(root, 'config.json'), 'utf8')
			);
			config.mirrorLinksFile = join(root, 'private/test-links.txt');
			await writeFile(join(root, 'config.json'), JSON.stringify(config));
		}
		await run(root, [
			'--input-type=module',
			'-e',
			`
import assert from 'node:assert/strict';
import Fastify from 'fastify';
import { registerLinkDispenser } from ${JSON.stringify(pathToFileURL(join(root, 'src/link-dispenser.ts')).href)};
process.chdir('..');
const app = Fastify();
try {
 registerLinkDispenser(app, '/api/link');
 const response = await app.inject({ method: 'POST', url: '/api/link' });
 assert.equal(response.statusCode, 200);
 assert.ok(['https://first.example/', 'https://second.example/'].includes(response.json().link));
} finally { await app.close(); }
`,
		]);
	}
});
