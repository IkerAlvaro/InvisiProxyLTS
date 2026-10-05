import {
	copyFileSync,
	existsSync,
	mkdirSync,
	renameSync,
	writeFileSync,
} from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { build, type ViteDevServer } from 'vite';
import solid from 'vite-plugin-solid';
import { buildBrowserAsset, buildStylesheet } from './build.ts';
import { buildValues } from './build-values.ts';
import { config, flatAltPaths, serverUrl } from './site-config.ts';

export async function updateDevelopmentFiles(
	server: ViteDevServer,
	files: string[]
) {
	const dist = join(server.config.root, 'views/dist');
	for (const file of files) {
		if (file === 'src/client/faq-search.tsx') {
			await build({
				configFile: false,
				plugins: [solid()],
				publicDir: false,
				logLevel: 'error',
				build: {
					emptyOutDir: false,
					outDir: join(dist, 'assets/js'),
					minify: false,
					target: 'esnext',
					lib: {
						entry: join(server.config.root, file),
						name: 'FAQSearch',
						formats: ['iife'],
						fileName: () => 'faq-search.js',
					},
				},
			});
			continue;
		}
		if (!file.startsWith('views/')) continue;
		const entry = join(server.config.root, file);
		const outputName = basename(file).replace(/\.ts$/, '.js');
		const target = join(
			dist,
			dirname(file.slice('views/'.length)),
			(!config.usingSEO && flatAltPaths[`files/${outputName}`]) ||
				outputName
		);
		mkdirSync(dirname(target), { recursive: true });
		if (/\.(?:ts|js)$/.test(file)) {
			await buildBrowserAsset(entry, target);
		} else {
			copyFileSync(entry, target);
			if (file.endsWith('.css')) await buildStylesheet(target);
		}
	}

	const renderer = await server.ssrLoadModule('/src/client/entry.tsx');
	const documents: Record<string, string> =
		renderer.renderDocuments(buildValues);
	for (const [path, document] of Object.entries(documents)) {
		const html = document.replace(
			'<head>',
			`<head><script type="module" src="${serverUrl.pathname}@vite/client"></script>`
		);
		const target = join(dist, path);
		mkdirSync(dirname(target), { recursive: true });
		const content =
			config.disguiseFiles && !path.includes('/deobf/')
				? gzipSync(html)
				: html;
		writeFileSync(`${target}.tmp`, content);
		renameSync(`${target}.tmp`, target);
	}
}

export function canUpdateDevelopmentFiles(root: string, files: string[]) {
	return files.every(
		(file) =>
			(file.startsWith('src/client/') || file.startsWith('views/')) &&
			existsSync(join(root, file))
	);
}
