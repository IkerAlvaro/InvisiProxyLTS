import type { FastifyServerFactory } from 'fastify';
import { Socket } from 'node:net';

import { createServer } from 'node:http';
import { wispurr, type wispurrOptions } from 'wispurr';
import { config, serverUrl, serverPort, getAltPrefix } from './site-config.ts';
import { createSiteApp } from './app.ts';

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

const app = createSiteApp({
	serverFactory,
	wispRedirect: nonWSRedirect,
	wispResponse: wispConfig.nonWSResponse,
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
