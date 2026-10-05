import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { parse, type DefaultTreeAdapterTypes } from 'parse5';

const load = <T>(path: string): Promise<T> =>
	import(pathToFileURL(join(process.cwd(), path)).href);
const { createSiteApp } =
	await load<typeof import('../../src/app.ts')>('src/app.ts');
const { config, pages, serverUrl, externalPages, flatAltPaths, getAltPrefix } =
	await load<typeof import('../../src/site-config.ts')>('src/site-config.ts');
const base = serverUrl.pathname;
const app = createSiteApp({ wispRedirect: '/relay-unavailable' });
const decode = (buffer: Buffer) =>
	buffer[0] === 0x1f && buffer[1] === 0x8b
		? gunzipSync(buffer).toString()
		: buffer.toString();
const nodes = (
	root: DefaultTreeAdapterTypes.Node
): DefaultTreeAdapterTypes.Element[] => [
	...('tagName' in root ? [root] : []),
	...('childNodes' in root ? root.childNodes.flatMap(nodes) : []),
];
try {
	for (const [name, file] of Object.entries(pages)) {
		if (name === 'default') continue;
		const suffix =
			config.disguiseFiles && file.endsWith('.html') && name !== 'login'
				? '.ico'
				: '';
		const response = await app.inject(`${base + name + suffix}?cache=test`);
		assert.equal(
			response.statusCode,
			200,
			`${name}: ${response.body.slice(0, 120)}`
		);
		const expected = await readFile(join('views/dist', file));
		assert.deepEqual(response.rawPayload, expected, name);
		if (file.endsWith('.html')) {
			const html = decode(expected);
			assert.ok(html.toLowerCase().startsWith('<!doctype html>'), file);
			const elements = nodes(parse(html));
			assert.ok(
				elements.some(
					(node) => node.tagName === 'title' && node.childNodes.length
				),
				file
			);
			assert.ok(
				elements.some((node) => node.tagName === 'body'),
				file
			);
			assert.ok(!html.includes('PRIVATE_TEST_MARKER'), file);
			assert.ok(!html.includes('private/test-links.txt'), file);
		}
	}
	const root = await app.inject(base);
	assert.equal(root.statusCode, 200, 'default route');
	assert.deepEqual(
		root.rawPayload,
		await readFile(join('views/dist', pages[pages.default])),
		'default page'
	);

	const partnersName = Object.keys(pages).find(
		(name) => pages[name] === 'pages/nav/partners.html'
	);
	if (config.disguiseFiles) {
		const loader = await app.inject(base + partnersName);
		assert.equal(loader.statusCode, 200);
		assert.deepEqual(
			loader.rawPayload,
			await readFile('views/dist/pages/misc/deobf/loader.html')
		);
	}
	assert.equal(pages.browsing, 'pages/proxnav/scramjet.html');
	assert.equal('browsing' in externalPages, false);
	for (const [name, target] of Object.entries(externalPages)) {
		const response = await app.inject(base + name);
		assert.equal(response.statusCode, 302, name);
		assert.equal(
			response.headers.location,
			typeof target === 'string' ? target : target.default
		);
	}
	for (const [name, target] of Object.entries(externalPages.github)) {
		const response = await app.inject(`${base}github/${name}`);
		assert.equal(response.statusCode, 302, `github/${name}`);
		assert.equal(response.headers.location, target);
	}
	assert.equal((await app.inject(`${base}github/not-real`)).statusCode, 404);
	const wisp = await app.inject(getAltPrefix('wisp', base));
	assert.equal(wisp.statusCode, 302);
	assert.equal(wisp.headers.location, '/relay-unavailable');

	for (const name of ['sw.js', 'sw-blacklist.js']) {
		const response = await app.inject(
			base + (flatAltPaths[`files/${name}`] || name)
		);
		assert.equal(response.statusCode, 200);
		assert.equal(response.headers['service-worker-allowed'], base);
		assert.match(response.headers['content-type'] ?? '', /javascript/);
		assert.doesNotMatch(
			response.body,
			/(?:from\s*|import\s*\(?\s*)['"']build:invisiproxy/
		);
	}
	for (const [prefix, name] of [
		['scram', 'scramjet.wasm'],
		['scram', 'controller.api.js'],
		['libcurl', 'index.mjs'],
	]) {
		const response = await app.inject(
			getAltPrefix(prefix, base) + (flatAltPaths[`files/${name}`] || name)
		);
		assert.equal(response.statusCode, 200, `${prefix}/${name}`);
		assert.ok(response.rawPayload.length > 0);
	}
	for (const path of [
		'missing.txt',
		'private/test-links.txt',
		'config.json',
		'src/site-config.ts',
		'assets/%2e%2e/%2e%2e/private/test-links.txt',
	]) {
		const response = await app.inject(base + path);
		assert.equal(response.statusCode, 404, path);
		assert.ok(!response.body.includes('PRIVATE_TEST_MARKER'));
	}
	const disguisedError = await app.inject(
		`${base}not-real${config.disguiseFiles ? '.ico' : ''}`
	);
	assert.equal(disguisedError.statusCode, 404);
	assert.ok(decode(disguisedError.rawPayload).includes('<html'));
	const hiddenHistory = await app.inject({
		url: base + partnersName + (config.disguiseFiles ? '.ico' : ''),
		headers: { cookie: 'HistoryHide=true', 'sec-fetch-dest': 'document' },
	});
	assert.equal(hiddenHistory.statusCode, 404);
	const api = await app.inject({
		method: 'POST',
		url: `${base}api/link`,
		headers: { cookie: 'HistoryHide=true', 'sec-fetch-dest': 'empty' },
	});
	assert.equal(api.statusCode, 200);
	assert.equal(api.headers['cache-control'], 'no-store');
	assert.deepEqual(Object.keys(api.json()), ['link']);
	assert.ok(
		['https://first.example/', 'https://second.example/'].includes(
			api.json().link
		)
	);
	assert.equal(
		(await app.inject({ method: 'POST', url: `${base}api/link` }))
			.statusCode,
		429
	);
	await writeFile(config.mirrorLinksFile, 'https://restocked.example/');
	const restocked = await app.inject({
		method: 'POST',
		url: `${base}api/link`,
		remoteAddress: '192.0.2.2',
	});
	assert.equal(restocked.json().link, 'https://restocked.example/');
	const directories = await readdir('views/dist', { withFileTypes: true });
	assert.deepEqual(
		directories
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.sort(),
		['assets', 'libcurl', 'pages', 'scram']
	);
	const files = await readdir('views/dist', { recursive: true });
	assert.ok(!files.includes('pages/surf.html'));

	assert.ok(
		!files.some(
			(file) =>
				file.includes('test-links') || file.includes('config.json')
		)
	);
	assert.equal((await app.inject(`${base}favicon.ico`)).rawPayload.length, 0);
	console.log(
		'Built documents, routes, redirects, assets, service workers, history status and private links passed.'
	);
} finally {
	await app.close();
}
