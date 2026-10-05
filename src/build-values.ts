import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	config,
	serverUrl,
	flatAltPaths,
	cacheBustList,
	versionValue,
	splashRandom,
	cookingInserts,
	vegetables,
	charRandom,
	textMasks,
	delimiter,
} from './site-config.ts';
import { setSiteValues, type SiteValues } from './site-values.ts';

let assetDirectory: 'dist' | 'dist-new' = 'dist';

export function setAssetDirectory(directory: 'dist' | 'dist-new') {
	assetDirectory = directory;
}

const names = {
	Bing: 'Bing',
	Brave: 'Brave',
	DuckDuckGo: 'DuckDuckGo',
	Startpage: 'Startpage',
	Google: 'Google',
	'wisp-transport': 'wst',
	libcurl: 'unix',
	'hu-lts': 'net-time',
};

const labels = config.usingSEO
	? Object.fromEntries(Object.keys(names).map((name) => [name, name]))
	: names;

export const buildValues: SiteValues = {
	get development() {
		return process.env.INVISIPROXY_VITE_DEV === '1';
	},
	usingSEO: config.usingSEO,
	showSplash: config.showSplash,
	disguiseFiles: config.disguiseFiles,
	inlineAssets: config.disguiseFiles && config.minifyScripts,
	basePath: serverUrl.pathname,
	aliases: flatAltPaths,
	cacheBust: cacheBustList,
	version: String(versionValue),
	cacheKey: crypto.getRandomValues(new Uint32Array(1))[0],
	storageNamespace: labels['hu-lts'],
	labels,
	defaultSearch: labels.DuckDuckGo,
	splash: [...splashRandom],
	cookingText: [...cookingInserts],
	cookingFacts: [...vegetables],
	characters: [...charRandom],
	textMasks,
	delimiter,
	errors: {},
	readAsset(path) {
		let relative = path.startsWith(serverUrl.pathname)
			? path.slice(serverUrl.pathname.length)
			: path.replace(/^\.\//, '');
		const reverse = Object.fromEntries(
			Object.entries(flatAltPaths)
				.filter(([key]) => key.startsWith('prefixes/'))
				.map(([key, value]) => [
					value,
					key.replace(/^(?:files|prefixes)\//, ''),
				])
		);
		relative = relative
			.split('/')
			.map((part) => reverse[part] || part)
			.join('/');
		const root = fileURLToPath(new URL('../views/', import.meta.url));
		const location = join(root, assetDirectory, relative);
		return existsSync(location)
			? readFileSync(location, 'utf8')
			: undefined;
	},
};

export function errorDocuments(
	documents: Record<string, string>
): SiteValues['errors'] {
	const path = 'pages/proxnav/scramjet-error.html';
	const html = documents[path];
	const script =
		/<script\b[^>]*\bid="proxy-error-script"[^>]*\bsrc="([^"]*)"[^>]*>/.exec(
			html
		);
	if (!script) throw new Error(`Missing error script element in ${path}`);
	const offset = script.index + script[0].indexOf('src="') + 5;
	return {
		scramjet: {
			beforeScript: html.slice(0, offset),
			afterScript: html.slice(offset + script[1].length),
		},
	};
}

setSiteValues(buildValues);
