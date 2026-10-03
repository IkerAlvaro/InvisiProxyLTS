import { build } from 'vite';
import solid from 'vite-plugin-solid';
import { fileURLToPath } from 'node:url';
import { buildValues } from './build-values.ts';
import type { SiteValues } from './site-values.ts';

export async function renderSolidDocuments(
	context: SiteValues = buildValues
): Promise<Record<string, string>> {
	const result = await build({
		configFile: false,
		plugins: [solid({ ssr: true })],
		publicDir: false,
		logLevel: 'error',
		ssr: { noExternal: true },
		build: {
			ssr: fileURLToPath(new URL('./client/entry.tsx', import.meta.url)),
			write: false,
			minify: false,
			rolldownOptions: { output: { codeSplitting: false } },
		},
	});
	if (!('output' in result)) throw new Error('Expected a single SSR bundle');
	const chunk = result.output.find((output) => output.type === 'chunk');
	if (!chunk) throw new Error('Vite did not produce the document renderer');
	const renderer = await import(
		'data:text/javascript;base64,' +
			Buffer.from(chunk.code).toString('base64')
	);
	return renderer.renderDocuments(context);
}

export const solidDocuments = await renderSolidDocuments({
	...buildValues,
	inlineAssets: false,
});
