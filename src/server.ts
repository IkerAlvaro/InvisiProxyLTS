import Fastify from 'fastify';
import type { FastifyServerFactory } from 'fastify';
import { Socket } from 'node:net';

interface RouteParams {
	path?: string;
	'*': string;
	modified?: boolean;
}

import { createServer } from 'node:http';
import { wispurr, type wispurrOptions } from 'wispurr';
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import {
	config,
	serverUrl,
	serverPort,
	pages,
	externalPages,
	flatAltPaths,
	getAltPrefix,
} from './routes.ts';
import { tryReadFile, preloaded404 } from './files.ts';
import { fileURLToPath } from 'node:url';

// Server host and port are configured in config.json, with a PORT override.
console.log(serverUrl);

// Wisp Configuration: Refer to the documentation at https://www.npmjs.com/package/wispurr

const wispConfig = {
	port: 4432,
	allowTCP: true,
	allowUDP: false,
	allowDirectIP: false,
	allowPrivateIPs: false,
	allowLoopbackIPs: false,
	tcpBufferSize: 262144,
	socketBufferSize: 16777216,
	pendingQueueSize: 33554432,
	bufferRemainingLength: 32768,
	tcpNoDelay: true,
	blacklist: {
		hostnames: [],
		ports: [25, 465, 587],
	},
	whitelist: {
		hostnames: [],
		ports: [],
	},
	websocketPermessageDeflate: false,
	frameObfuscation: {
		enabled: false,
		version: 2,
		key: '',
		tag: '',
		headerLength: 0,
		nonceLength: 0,
		metadataOffset: 0,
		paddingMinimum: 0,
		paddingMaximum: 0,
		paddingPlacement: 'split',
		keyStride: 0,
		nonceStride: 0,
	},
	dnsServers: [],
	dnsMethod: 'resolve',
	dnsResultOrder: 'ipv4first',
	enableTwisp: false,
	enableV2: true,
	handshakeTimeoutSeconds: 5,
	motd: '',
	passwordAuth: false,
	passwordAuthRequired: false,
	passwordUsers: {},
	parseRealIP: true,
	trustedProxies: ['127.0.0.1', '::1'],
	trustedHeaders: ['X-Forwarded-For'],
	nonWSResponse: 'meow',
	nonWSRedirect: '/pages/404.html',
	logLevel: 'warn',
	proxy: '',
	maxMessageSize: 262144,
	staticDir: '',
	bandwidthLimitKbps: 0,
	connectionsLimitPerIP: 200,
	connectionWindowSeconds: 10,
	floodProtection: {
		enabled: true,
		maxConnectsPerSourceIPPerSecond: 500,
		maxConnectsPerDestPerSecond: 250,
		maxConnectsPerDestPerMinute: 6000,
		maxInFlightSyns: 4096,
		maxConcurrentStreamsPerConnection: 512,
		maxConcurrentConnections: 16384,
		synFloodSignature: {
			enabled: false,
			windowMs: 2000,
			minSamples: 128,
			failedHandshakeRatio: 0.75,
		},
		wsCloseAfterViolations: 64,
		logBlockedDials: false,
	},
	reputation: {
		enabled: false,
		storePath: './data/wispurr-reputation.json',
		saveIntervalSeconds: 30,
		scoreDecayPerHour: 1,
		evictAfterDays: 7,
		thresholds: {
			warn: 21,
			throttle: 51,
			strict: 81,
		},
		weights: {},
		destinationWeights: {},
	},
} satisfies wispurrOptions & Record<string, unknown>;
const { frameObfuscation, nonWSRedirect, ...nativeWispConfig } = wispConfig;
if (frameObfuscation.enabled)
	throw new Error('This Wispurr version does not support frame obfuscation.');
const wisp = new wispurr(nativeWispConfig);

await wisp.start(1);

const serverFactory: FastifyServerFactory = (handler) => {
	return createServer()
		.on('request', (req, res) => {
			handler(req, res);
		})
		.on('upgrade', (req, socket, head) => {
			if (
				socket instanceof Socket &&
				req.url?.endsWith(getAltPrefix('wisp', serverUrl.pathname))
			)
				wisp.route(req, socket, head);
		});
};

const app = Fastify({
	routerOptions: {
		ignoreDuplicateSlashes: true,
		ignoreTrailingSlash: true,
	},
	logger: false,
	serverFactory: serverFactory,
});

if (process.env.INVISIPROXY_VITE_DEV === '1') {
	app.addHook('onSend', async (_req, reply, payload) => {
		reply.header('Cache-Control', 'no-store');
		return payload;
	});
}

app.get(getAltPrefix('wisp', serverUrl.pathname), (_req, reply) => {
	if (nonWSRedirect) return reply.redirect(nonWSRedirect);
	return reply.type('text/plain').send(wispConfig.nonWSResponse);
});

// Apply Helmet middleware for security.
app.register(fastifyHelmet, {
	contentSecurityPolicy: false, // Disable CSP
	xPoweredBy: false,
});

// Assign server file paths to different paths, for serving content on the website.
app.register(fastifyStatic, {
	root: fileURLToPath(new URL('../views/dist/pages', import.meta.url)),
	prefix: serverUrl.pathname,
	decorateReply: false,
});

// All entries in the dist folder are created with source rewrites.
// Minified scripts are also served here, if minification is enabled.
['assets', 'uv', 'scram', 'epoxy', 'libcurl', 'baremux'].forEach((prefix) => {
	app.register(fastifyStatic, {
		root: fileURLToPath(
			new URL(`../views/dist/${prefix}`, import.meta.url)
		),
		prefix: getAltPrefix(prefix, serverUrl.pathname),
		decorateReply: false,
	});
});

['sw.js', 'sw-blacklist.js'].forEach((swFile) => {
	const distName = flatAltPaths[`files/${swFile}`] || swFile;
	app.get(serverUrl.pathname + distName, (_req, reply) => {
		reply
			.type('application/javascript')
			.header('Service-Worker-Allowed', serverUrl.pathname)
			.send(tryReadFile(`../views/dist/${distName}`, import.meta.url));
	});
});

/* If you are trying to add pages or assets in the root folder and
 * NOT entire folders, check ./src/routes.ts and add it manually.
 *
 * All website files are stored in the /views directory.
 * This takes one of those files and displays it for a site visitor.
 * Paths like /browsing are converted into paths like /views/dist/pages/surf.html
 * back here. Which path converts to what is defined in routes.ts.
 */

const supportedTypes: Record<string, string> = {
		default: config.disguiseFiles
			? 'image/vnd.microsoft.icon'
			: 'text/html',
		html: 'text/html',
		txt: 'text/plain',
		xml: 'application/xml',
		ico: 'image/vnd.microsoft.icon',
	},
	disguise = 'ico';

if (config.disguiseFiles) {
	const getActualPath = (path: string) =>
			path.slice(0, path.length - 1 - disguise.length),
		shouldNotHandle = new RegExp(`\\.(?!html$|${disguise}$)[\\w-]+$`, 'i'),
		loaderFile = tryReadFile(
			'../views/dist/pages/misc/deobf/loader.html',
			import.meta.url,
			false
		);
	let exemptDirs = [
			'assets',
			'uv',
			'scram',
			'epoxy',
			'libcurl',
			'baremux',
			'wisp',
		].map((dir) => getAltPrefix(dir, serverUrl.pathname).slice(1, -1)),
		exemptPages = ['login', 'favicon.ico'];
	for (const [key, value] of Object.entries(externalPages))
		if ('string' === typeof value) exemptPages.push(key);
		else exemptDirs.push(key);
	exemptPages = exemptPages.concat(exemptDirs);
	if (pages.default === 'login') exemptPages.push('');

	app.addHook('preHandler', (req, reply, done) => {
		const params = req.params as RouteParams;
		if (params.modified) return done();
		const reqPath = new URL(req.url, serverUrl).pathname.slice(
			serverUrl.pathname.length
		);
		if (
			shouldNotHandle.test(reqPath) ||
			exemptDirs.some((dir) => reqPath.indexOf(`${dir}/`) === 0) ||
			exemptPages.includes(reqPath)
		)
			return done();

		if (!reqPath.endsWith(`.${disguise}`)) {
			reply.type(supportedTypes.html).send(loaderFile);
			reply.hijack();
			return done();
		} else if (!(reqPath in pages) && !reqPath.endsWith('favicon.ico')) {
			params.modified = true;
			req.raw.url = getActualPath(req.raw.url || req.url);
			if (params.path) params.path = getActualPath(params.path);
			if (params['*']) params['*'] = getActualPath(params['*']);
			reply.type(supportedTypes[disguise]);
			reply.header('Access-Control-Allow-Origin', 'null');
		}
		return done();
	});
}

app.get<{ Params: RouteParams }>(`${serverUrl.pathname}:path`, (req, reply) => {
	// Testing for future features that need cookies to deliver alternate source files.
	/*
  if (req.raw.rawHeaders.includes('Cookie'))
    console.log(
      'cookie:',
      req.raw.rawHeaders[req.raw.rawHeaders.indexOf('Cookie') + 1]
    );
  */

	const reqPath = req.params.path || '';

	// Ignore browsers' automatic requests to favicon.ico, since it does not exist.
	// This approach is needed for certain pages to not have an icon.
	if (reqPath === 'favicon.ico') {
		reply.send();
		return reply.hijack();
	}

	if (reqPath in externalPages) {
		if (req.params.modified)
			return reply.code(404).type(supportedTypes.html).send(preloaded404);
		let externalRoute = externalPages[reqPath];
		if (typeof externalRoute !== 'string')
			externalRoute = externalRoute.default;
		return reply.redirect(externalRoute);
	}

	// Return the error page if the query is not found in routes.ts.
	if (reqPath && !(reqPath in pages))
		return reply.code(404).type(supportedTypes.default).send(preloaded404);

	// Serve the default page if the path is the default path.
	const fileName = reqPath ? pages[reqPath] : pages[pages.default],
		type =
			supportedTypes[fileName.slice(fileName.lastIndexOf('.') + 1)] ||
			supportedTypes.default;

	if (req.params.modified) reply.type(supportedTypes[disguise]);
	else reply.type(type);
	reply.send(tryReadFile(`../views/dist/${fileName}`, import.meta.url));
});

app.get<{ Params: { redirect: string } }>(
	`${serverUrl.pathname}github/:redirect`,
	(req, reply) => {
		if (req.params.redirect in externalPages.github)
			reply.redirect(externalPages.github[req.params.redirect]);
		else reply.code(404).type(supportedTypes.default).send(preloaded404);
	}
);

if (serverUrl.pathname === '/')
	// Set an error page for invalid paths outside the query string system.
	// If the server URL has a prefix, then avoid doing this for stealth reasons.
	app.setNotFoundHandler((_req, reply) => {
		reply.code(404).type(supportedTypes.default).send(preloaded404);
	});
else {
	// Apply the following patch(es) if the server URL has a prefix.

	// Patch to fix serving index.html.
	app.get(serverUrl.pathname, (_req, reply) => {
		reply
			.type(supportedTypes.default)
			.send(tryReadFile(`../views/dist/${pages.index}`, import.meta.url));
	});
}

app.addHook('onSend', (request, reply, payload, done) => {
	const cookieHeader = request.headers.cookie || '';
	const historyHide = cookieHeader
		.split('; ')
		.find((c) => c.startsWith('HistoryHide='))
		?.split('=')[1];

	if (
		historyHide === 'true' &&
		request.headers['sec-fetch-dest'] === 'document'
	) {
		reply.code(404);
	}
	done(null, payload);
});

// Development restarts and process managers must also stop the Wisp relay.
let shuttingDown = false;
const stopServer = async () => {
	if (shuttingDown) return;
	shuttingDown = true;
	await wisp.stop();
	await app.close();
};
process.once('SIGTERM', () => void stopServer());
process.once('SIGINT', () => void stopServer());

await app.listen({
	port: serverPort,
	host: process.env.INVISIPROXY_BACKEND_HOST || serverUrl.hostname,
});
process.send?.({ type: 'ready' });
console.log(`InvisiProxy is listening on port ${serverPort}.`);
console.log(
	`When hosting with a reverse proxy please ensure you are using NGINX only.\nCaddy and Apache have security risks due to wispurr and loopbacks. Please configure them correctly.\nNGINX is recommended and used for production. Ports are whitelisted and security is maintained with NGINX only.`
);
if (config.disguiseFiles)
	console.log(
		'disguiseFiles is enabled. Visit src/routes.ts to see the entry point, listed within the pages variable.'
	);
