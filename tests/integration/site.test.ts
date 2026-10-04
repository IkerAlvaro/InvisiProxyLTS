import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { fixture, run, buildFixture } from '../helpers/fixture.ts';

for (const usingSEO of [true, false])
	for (const disguiseFiles of [true, false]) {
		test(`production build and HTTP routes: SEO=${usingSEO}, disguise=${disguiseFiles}`, {
			timeout: 120000,
		}, async (t) => {
			const root = await fixture(
				t,
				{
					usingSEO,
					disguiseFiles,
					minifyScripts: usingSEO,
					pathname: usingSEO ? '/' : '/school/',
				},
				true
			);
			await buildFixture(root);
			await run(root, [
				fileURLToPath(
					new URL('../fixtures/http-probe.ts', import.meta.url)
				),
			]);
		});
	}

test('a production rebuild removes stale artifacts and publishes complete documents', {
	timeout: 120000,
}, async (t) => {
	const { writeFile, access, readFile } = await import('node:fs/promises');
	const { join } = await import('node:path');
	const assert = (await import('node:assert/strict')).default;
	const root = await fixture(
		t,
		{ usingSEO: true, disguiseFiles: false },
		true
	);
	await buildFixture(root);
	await writeFile(join(root, 'views/dist/stale.txt'), 'old build');
	await buildFixture(root);
	await assert.rejects(access(join(root, 'views/dist/stale.txt')), {
		code: 'ENOENT',
	});
	await assert.rejects(access(join(root, 'views/dist-new')), {
		code: 'ENOENT',
	});
	assert.match(
		await readFile(join(root, 'views/dist/index.html'), 'utf8'),
		/^<!doctype html>/i
	);
	await run(root, [
		fileURLToPath(new URL('../fixtures/http-probe.ts', import.meta.url)),
	]);
});
