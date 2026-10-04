import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { fixture, run, buildFixture } from '../helpers/fixture.ts';

for (const disguiseFiles of [true, false]) {
	test(`development updates: disguise=${disguiseFiles}`, {
		timeout: 120000,
	}, async (t) => {
		const root = await fixture(
			t,
			{
				usingSEO: true,
				disguiseFiles,
				pathname: '/school/',
				minifyScripts: false,
			},
			true
		);
		await buildFixture(root);
		await run(
			root,
			[
				fileURLToPath(
					new URL('../fixtures/dev-probe.ts', import.meta.url)
				),
			],
			{ INVISIPROXY_VITE_DEV: '1' }
		);
	});
}
