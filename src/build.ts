import {
	writeFileSync,
	readFileSync,
	mkdirSync,
	readdirSync,
	lstatSync,
	copyFileSync,
	rmSync,
	renameSync,
	existsSync,
} from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import type { Plugin } from 'vite';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { config, flatAltPaths, splashRandom, serverUrl } from './routes.ts';
import {
	buildValues,
	errorDocuments,
	setAssetDirectory,
} from './build-values.ts';
import { route } from './site-values.ts';
import { solidDocuments } from './solid.ts';
import { tryReadFile } from './files.ts';
import { renderSolidDocuments } from './solid.ts';

const projectUrl = new URL('../', import.meta.url);
const projectPath = fileURLToPath(projectUrl);
const modPath = (path: string) => join(projectPath, 'node_modules', path);
const epoxyPath = modPath('@mercuryworkshop/epoxy-transport/dist');
const libcurlPath = modPath('@mercuryworkshop/libcurl-transport/dist');
const scramjetControllerPath = modPath(
	'@mercuryworkshop/scramjet-controller/dist'
);
const scramjetUtilsPath = modPath('@mercuryworkshop/scramjet-utils/dist');
const dist = join(projectPath, 'views/dist-new');
const distFinal = join(projectPath, 'views/dist');

export async function buildBrowserAsset(entry: string, target: string) {
	await build({
		configFile: false,
		publicDir: false,
		logLevel: 'error',
		plugins: [
			{
				name: 'invisiproxy-build-values',
				resolveId(id) {
					if (
						id === 'build:invisiproxy' ||
						id === 'build:invisiproxy-errors'
					)
						return `\0${id}`;
				},
				load(id) {
					if (id === '\0build:invisiproxy-errors') {
						return `import { values, renderProxyError } from 'build:invisiproxy'; values.errors = ${JSON.stringify(errorDocuments(solidDocuments))}; export { renderProxyError };`;
					}
					if (id !== '\0build:invisiproxy') return;
					const { readAsset, ...context } = buildValues;
					const module = fileURLToPath(
						new URL('./site-values.ts', import.meta.url)
					);
					return `import { setSiteValues } from ${JSON.stringify(module)}; setSiteValues(${JSON.stringify(context)}); export * from ${JSON.stringify(module)};`;
				},
			},
		],
		build: {
			emptyOutDir: false,
			outDir: dirname(target),
			minify: config.minifyScripts,
			target: 'esnext',
			lib: {
				entry,
				formats: ['iife'],
				name: 'InvisiAsset',
				fileName: () => basename(target),
			},
			rolldownOptions: {
				treeshake: false,
				output: { codeSplitting: false },
			},
		},
	});
}

export async function buildStylesheet(entry: string) {
	const css = readFileSync(entry, 'utf8').replace(
		/url\((["']?)(\/assets\/[^)"']+)\1\)/g,
		(_match, quote, path) => `url(${quote}${route(path)}${quote})`
	);
	writeFileSync(entry, css);
	const result = await build({
		configFile: false,
		publicDir: false,
		logLevel: 'error',
		build: {
			write: false,
			emptyOutDir: false,
			cssCodeSplit: true,
			minify: config.minifyScripts,
			cssMinify: config.minifyScripts,
			lib: {
				entry,
				formats: ['es'],
				cssFileName: basename(entry, '.css'),
			},
		},
	});
	if ('output' in result)
		for (const output of result.output) {
			if (output.type === 'asset' && output.fileName.endsWith('.css'))
				writeFileSync(entry, output.source);
		}
}

export function siteBuildPlugin(): Plugin {
	let succeeded = false;
	return {
		name: 'invisiproxy-site',
		apply: 'build',
		async buildStart() {
			succeeded = false;
			setAssetDirectory('dist-new');
			const pendingScripts: [string, string][] = [];
			for (const path of ['src', 'views']) {
				for (const file of readdirSync(join(projectPath, path), {
					recursive: true,
					withFileTypes: true,
				})) {
					if (
						file.isFile() &&
						!/[/\\]dist(?:-new)?[/\\]/.test(
							join(file.parentPath, file.name)
						)
					)
						this.addWatchFile(join(file.parentPath, file.name));
				}
			}
			for (const path of ['config.json', 'src/data.json'])
				this.addWatchFile(join(projectPath, path));
			rmSync(dist, { force: true, recursive: true });
			mkdirSync(dist);

			const ignoredDirectories = [
				'dist',
				'dist-new',
				'assets',
				'uv',
				'scram',
			];
			const ignoredFileTypes = /\.map$|\.d\.ts$/;

			const compile = (
				dir: string,
				base = '',
				outDir = '',
				initialDir = dir,
				applyRewrites = initialDir === './views'
			) =>
				readdirSync(base + dir).forEach((file) => {
					const oldLocation = new URL(
						file,
						new URL(`${base + dir}/`, projectUrl)
					);
					if (
						(ignoredDirectories.includes(file) && applyRewrites) ||
						ignoredFileTypes.test(file)
					)
						return;
					const fileStats = lstatSync(oldLocation),
						targetPath = fileURLToPath(
							new URL(
								'./views/dist-new/' +
									outDir +
									`${base + dir}/`.slice(
										initialDir.length + 1
									) +
									((!config.usingSEO &&
										flatAltPaths[
											'files/' +
												file.replace(/\.ts$/, '.js')
										]) ||
										file.replace(/\.ts$/, '.js')),
								projectUrl
							)
						);
					if (fileStats.isFile() && !existsSync(targetPath)) {
						if (/\.(?:ts|js)$/.test(file) && applyRewrites) {
							pendingScripts.push([
								fileURLToPath(oldLocation),
								targetPath,
							]);
						} else if (
							/\.(?:html|js|css|json|txt|xml)$/.test(file) &&
							applyRewrites
						) {
							writeFileSync(
								targetPath,
								tryReadFile(
									`${base + dir}/${file}`,
									projectUrl,
									false
								).toString()
							);
							if (config.verbose) {
								console.log(
									`[Build] Compiling file "${file}" from ${`${base + dir}/`} to ${targetPath}`
								);
							}
						} else {
							copyFileSync(`${base + dir}/${file}`, targetPath);
						}
					} else if (fileStats.isDirectory()) {
						if (!existsSync(targetPath)) mkdirSync(targetPath);
						compile(
							file,
							`${base + dir}/`,
							outDir,
							initialDir,
							applyRewrites
						);
						if (config.verbose) {
							console.log(
								`[Build] Compiling directory "${file}" from ${`${base + dir}/`} to ${targetPath}`
							);
						}
					}
				});

			const localAssetDirs = ['assets', 'uv'];
			for (const path of localAssetDirs) {
				mkdirSync(`./views/dist-new/${path}`);
				compile(
					`./views/${path}`,
					'',
					`${path}/`,
					`./views/${path}`,
					true
				);
			}

			const compilePaths = [
				['epoxy', epoxyPath],
				['libcurl', libcurlPath],
				['baremux', baremuxPath],
				['uv', uvPath],
				['scram', scramjetPath],
				['scram', scramjetControllerPath],
				['scram', scramjetUtilsPath],
			];
			for (const [prefixName, srcPath] of compilePaths) {
				const relSrc = srcPath.slice(srcPath.indexOf('node_modules'));
				if (!existsSync(relSrc)) {
					console.warn(
						`[Build] Skipping "${prefixName}": ${relSrc} not found.`
					);
					continue;
				}

				const prefix = `${prefixName}/`,
					prefixUrl = new URL(
						`./views/dist-new/${prefix}`,
						projectUrl
					);
				if (config.verbose) {
					console.log(
						`[Build] Compiling "${prefixName}" from ${relSrc} to ${prefixUrl}`
					);
				}
				if (!existsSync(prefixUrl)) mkdirSync(prefixUrl);

				compile(relSrc, '', prefix);
			}

			compile('./views');
			await Promise.all(
				pendingScripts.map(([entry, target]) =>
					buildBrowserAsset(entry, target)
				)
			);
			for (const file of readdirSync(join(dist, 'assets/css'))) {
				if (file.endsWith('.css'))
					await buildStylesheet(join(dist, 'assets/css', file));
			}
		},
		buildEnd(error) {
			succeeded = !error;
			if (error) setAssetDirectory('dist');
		},
		async closeBundle() {
			if (!succeeded) return;
			succeeded = false;
			try {
				for (const [path, document] of Object.entries(
					await renderSolidDocuments()
				)) {
					const target = join(dist, path);
					mkdirSync(dirname(target), { recursive: true });
					const html =
						process.env.INVISIPROXY_VITE_DEV === '1'
							? document.replace(
									'<head>',
									`<head><script type="module" src="${serverUrl.pathname}@vite/client"></script>`
								)
							: document;
					writeFileSync(target, html);
				}

				const createFile = (location: string, text: string) => {
					writeFileSync(
						fileURLToPath(
							new URL(`./views/dist-new/${location}`, projectUrl)
						),
						text
					);
				};

				createFile(
					'assets/json/splash.json',
					JSON.stringify(splashRandom)
				);

				if (config.disguiseFiles) {
					const compress = async (dir: string, recursive = false) => {
						for (const file of readdirSync(dir)) {
							const fileLocation = `${dir}/${file}`;
							if (file.endsWith('.html'))
								writeFileSync(
									fileLocation,
									Buffer.from(
										await new Response(
											new Blob([
												new Uint8Array(
													Buffer.from(
														tryReadFile(
															fileLocation,
															projectUrl,
															false
														)
													)
												),
											])
												.stream()
												.pipeThrough(
													new CompressionStream(
														'gzip'
													)
												)
										).arrayBuffer()
									)
								);
							else if (
								recursive &&
								lstatSync(fileLocation).isDirectory() &&
								file !== 'deobf'
							)
								await compress(fileLocation, true);
						}
					};
					await compress('./views/dist-new');
					await compress('./views/dist-new/pages', true);
				}

				rmSync(distFinal, { force: true, recursive: true });
				renameSync(dist, distFinal);
			} finally {
				setAssetDirectory('dist');
			}
		},
	};
}
