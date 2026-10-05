import { readFileSync } from 'node:fs';
import type settings from '../config.json';
import type data from './data.json';

interface PathMap {
	[key: string]: string | PathMap;
}

const config = Object.freeze(
	JSON.parse(
		readFileSync(new URL('../config.json', import.meta.url), 'utf8')
	) as typeof settings
);

const serverPort = Number(process.env.PORT ?? config.port);
if (!Number.isInteger(serverPort) || serverPort < 1 || serverPort > 65535)
	throw new Error('PORT must be an integer between 1 and 65535.');

const serverUrl = (() => {
	let base: URL;
	try {
		base = new URL(config.host);
	} catch (_e) {
		base = new URL('http://a');
		base.host = config.host;
	}
	base.port = String(serverPort);
	base.pathname = `${(config.pathname || '/').replace(/\/+$|[^\w/.-]+/g, '')}/`;
	return Object.freeze(base);
})();

const pages: Record<string, string> = {
	/* If you are trying to add pages or assets in the root folder and
	 * NOT entire folders, check the routes below and add it manually.
	 * If you change route names here, also check the altPaths variable below.
	 */

	// Set the default page for when no pathname is supplied. Be sure to change the
	// option for disguiseFiles if the entry point should be hidden.
	default: config.disguiseFiles ? 'login' : 'index',
	index: 'index.html',
	'manifest.json': 'manifest.json',

	/* Users must visit this route if disguiseFiles is enabled. The page loader only
	 * requests the site's contents if it has a local key, which is given by this page.
	 * Be sure to update the following line(s) in src/server.ts if you change this
	 * variable:
	 *   let exemptPages = ['login', .........];
	 *   if (pages.default === 'login') exemptPages.push('');
	 */
	login: 'pages/misc/deobf/entry-point.html',

	// This route for the error page is also used to define text404 down below.
	'test-404': 'error.html',
	/* Main */
	documentation: 'docs.html',
	questions: 'faq.html',
	s: 'pages/frame.html',
	browsing: 'pages/proxnav/scramjet.html',
	credits: 'pages/nav/credits.html',
	privacy: 'pages/nav/privacy.html',
	partners: 'pages/nav/partners.html',
	/* Proxies */
	scramjet: 'pages/proxnav/scramjet.html',
	sjerror: 'pages/proxnav/scramjet-error.html',
	/* Proxy Presets */
	youtube: 'pages/proxnav/preset/youtube.html',
	apps: 'pages/proxnav/preset/applications.html',
	/* Misc */
	'robots.txt': 'robots.txt',
	'sitemap.xml': 'sitemap.xml',
	'browserconfig.xml': 'browserconfig.xml',
};

const externalPages: Record<string, string | Record<string, string>> & {
	github: Record<string, string>;
} = {
	github: {
		default: 'https://github.com/QuiteAFancyEmerald/InvisiProxy',
		aos: 'https://github.com/michalsnik/aos',
		'bare-module': 'https://github.com/motortruck1221/bare-as-module3',
		fastify: 'https://github.com/fastify/fastify',
		'font-awesome': 'https://github.com/FortAwesome/Font-Awesome',
		'libcurl-js': 'https://github.com/ading2210/libcurl.js',
		'nord-theme': 'https://github.com/nordtheme',
		'proxy-transports':
			'https://github.com/MercuryWorkshop/proxy-transports',
		scramjet: 'https://github.com/MercuryWorkshop/scramjet',
		wisp: 'https://github.com/MercuryWorkshop/wisp-protocol',
	},
	codespaces: 'https://github.com/codespaces',
	'tor-project': 'https://tb-manual.torproject.org/installation',
	'titaniumnetwork-documentation': 'https://docs.titaniumnetwork.org',
	status: 'https://status.titaniumnetwork.org',
	patreon: 'https://www.patreon.com/invisiproxy',
	kofi: 'https://ko-fi.com/quiteafancyemerald',
	'titaniumnetwork-discord': 'https://discord.gg/CwWpdGkuWY',
	truffled: 'https://truffled.lol',
	freedomproject: 'https://nullatenus.com',
	wispurr: 'https://github.com/sylvieisnton/wispurr',
};

// Override the route names below when usingSEO is disabled in config.json.
const altPaths: PathMap & { prefixes: Record<string, string> } = {
	scramjet: 'working',
	sjerror: 'worker-error',
	youtube: 'wiki',
	partners: 'interface',
	apps: 'software',
	github: {
		'bare-module': 'module',
		fastify: 'fs',
		'libcurl-js': 'ljs',
		'proxy-transports': 'pt',
		scramjet: 'wr',
		wisp: 'router',
	},
	'titaniumnetwork-documentation': 'docs',
	codespaces: 'codesp',
	'tor-project': 'tr',
	'titaniumnetwork-discord': 'social',
	truffled: 'educational',
	freedomproject: 'frpu',
	wispurr: 'wsp',
	/* Raw File Names */
	files: {
		'sw.js': 'service.js',
		'sw-blacklist.js': 'service-blacklist.js',
		'scramjet.js': 'working.js',
		'scramjet.wasm': 'working.wasm',
		'controller.api.js': 'working-ctrl.api.js',
		'controller.sw.js': 'working-ctrl.sw.js',
		'controller.inject.js': 'working-ctrl.inject.js',
		'scramjet.webp': 'wr.webp',
		'fastify.webp': 'fs.webp',
		'nordtheme.webp': 'nord.webp',
		'nodejs.webp': 'node.webp',
		'fontawesome.webp': 'fa.webp',
		'webretro.webp': 'notebook.webp',
		'ruffle.webp': 'rs.webp',
	},
	/* Prefixes */
	prefixes: {
		scram: 'worker',
		libcurl: 'unix',
		bareasmodule: 'utc',
		wisp: 'cron',
	},
};

const useAltPaths = (overrides: PathMap, targetPaths: PathMap): void => {
	for (const [key, value] of Object.entries(overrides)) {
		if (!(key in targetPaths)) continue;
		if (typeof value === 'string') {
			targetPaths[value] = targetPaths[key];
			delete targetPaths[key];
		} else {
			const target = targetPaths[key];
			if (typeof target !== 'string') useAltPaths(value, target);
		}
		delete overrides[key];
	}
};

const getAltPrefix = (prefix: string, serverPathname = '/') =>
		serverPathname +
		((!config.usingSEO && altPaths.prefixes[prefix]) || prefix) +
		'/',
	getPathEntries = (pathObject: PathMap, prefix = ''): [string, string][] => {
		if (prefix) prefix += '/';
		let inserts: [string, string][] = [];
		for (const [key, value] of Object.entries(pathObject)) {
			if ('object' === typeof value)
				inserts = inserts.concat(getPathEntries(value, key));
			else
				inserts.push([
					prefix + key,
					prefix.replace(/^(?:prefixes|files)\//, '') +
						(config.usingSEO ? key : value),
				]);
		}
		return inserts;
	},
	normalizePaths = (pathObject: PathMap) =>
		Object.fromEntries(getPathEntries(pathObject));

const flatAltPaths = Object.freeze(normalizePaths(altPaths));

const insert: typeof data = JSON.parse(
	readFileSync(new URL('./data.json', import.meta.url), 'utf8')
);

if (!config.usingSEO) {
	useAltPaths(altPaths, pages);
	useAltPaths(altPaths, externalPages);
	delete pages['robots.txt'];
	delete pages['sitemap.xml'];
}

const cookingInserts = insert.content,
	vegetables = insert.keywords,
	charRandom = insert.chars,
	delimiter = insert.delimiter,
	textMasks = insert.textMasks,
	splashRandom = insert.splash,
	versionValue = insert.version,
	cacheBustList: Record<string, string> = {
		'styles.css': 'styles-1778310233.css',
		'common.js': 'common-1778310233.js',
	};

export {
	config,
	serverUrl,
	serverPort,
	pages,
	externalPages,
	flatAltPaths,
	getAltPrefix,
	cookingInserts,
	vegetables,
	charRandom,
	delimiter,
	textMasks,
	splashRandom,
	versionValue,
	cacheBustList,
};
