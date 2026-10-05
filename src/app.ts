import Fastify from 'fastify';
import type { FastifyServerFactory } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import {
	config,
	serverUrl,
	pages,
	externalPages,
	flatAltPaths,
	getAltPrefix,
} from './routes.ts';
import { tryReadFile, preloaded404 } from './files.ts';
import { fileURLToPath } from 'node:url';
import { registerLinkDispenser } from './link-dispenser.ts';

interface RouteParams {
	path?: string;
	'*': string;
	modified?: boolean;
}

interface AppOptions {
	serverFactory?: FastifyServerFactory;
	wispRedirect?: string;
	wispResponse?: string;
}

export function createSiteApp(options: AppOptions = {}) {
	const app = Fastify({
		routerOptions: {
			ignoreDuplicateSlashes: true,
			ignoreTrailingSlash: true,
		},
		logger: false,
		serverFactory: options.serverFactory,
	});

	const dispenserPath = `${serverUrl.pathname}api/link`;
	registerLinkDispenser(app, dispenserPath);

	if (process.env.INVISIPROXY_VITE_DEV === '1') {
		app.addHook('onSend', async (_req, reply, payload) => {
			reply.header('Cache-Control', 'no-store');
			return payload;
		});
	}

	app.get(getAltPrefix('wisp', serverUrl.pathname), (_req, reply) => {
		if (options.wispRedirect) return reply.redirect(options.wispRedirect);
		return reply.type('text/plain').send(options.wispResponse || 'meow');
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
	['assets', 'scram', 'libcurl'].forEach((prefix) => {
		app.register(fastifyStatic, {
			root: fileURLToPath(
				new URL(`../views/dist/${prefix}`, import.meta.url)
			),
			prefix: getAltPrefix(prefix, serverUrl.pathname),
			decorateReply: false,
			preCompressed:
				prefix !== 'assets' && process.env.INVISIPROXY_VITE_DEV !== '1',
			setHeaders(response) {
				if (prefix !== 'assets')
					response.setHeader('Vary', 'Accept-Encoding');
			},
		});
	});

	['sw.js', 'sw-blacklist.js'].forEach((swFile) => {
		const distName = flatAltPaths[`files/${swFile}`] || swFile;
		app.get(serverUrl.pathname + distName, (_req, reply) => {
			reply
				.type('application/javascript')
				.header('Service-Worker-Allowed', serverUrl.pathname)
				.send(
					tryReadFile(`../views/dist/${distName}`, import.meta.url)
				);
		});
	});

	/* If you are trying to add pages or assets in the root folder and
	 * NOT entire folders, check ./src/routes.ts and add it manually.
	 *
	 * All website files are stored in the /views directory.
	 * This takes one of those files and displays it for a site visitor.
	 * Paths like /browsing map to /views/dist/pages/proxnav/scramjet.html
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
			shouldNotHandle = new RegExp(
				`\\.(?!html$|${disguise}$)[\\w-]+$`,
				'i'
			),
			loaderFile = tryReadFile(
				'../views/dist/pages/misc/deobf/loader.html',
				import.meta.url,
				false
			);
		let exemptDirs = ['assets', 'scram', 'libcurl', 'wisp'].map((dir) =>
				getAltPrefix(dir, serverUrl.pathname).slice(
					serverUrl.pathname.length,
					-1
				)
			),
			exemptPages = ['login', 'favicon.ico'];
		for (const [key, value] of Object.entries(externalPages))
			if ('string' === typeof value) exemptPages.push(key);
			else exemptDirs.push(key);
		exemptPages = exemptPages.concat(exemptDirs);
		if (pages.default === 'login') exemptPages.push('');

		app.addHook('preHandler', (req, reply, done) => {
			if (req.routeOptions.url === dispenserPath) return done();
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
			} else if (
				!(reqPath in pages) &&
				!reqPath.endsWith('favicon.ico')
			) {
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

	app.get<{ Params: RouteParams }>(
		`${serverUrl.pathname}:path`,
		(req, reply) => {
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
					return reply
						.code(404)
						.type(supportedTypes.html)
						.send(preloaded404);
				let externalRoute = externalPages[reqPath];
				if (typeof externalRoute !== 'string')
					externalRoute = externalRoute.default;
				return reply.redirect(externalRoute);
			}

			// Return the error page if the query is not found in routes.ts.
			if (reqPath && !(reqPath in pages))
				return reply
					.code(404)
					.type(supportedTypes.default)
					.send(preloaded404);

			// Serve the default page if the path is the default path.
			const fileName = reqPath ? pages[reqPath] : pages[pages.default],
				type =
					supportedTypes[
						fileName.slice(fileName.lastIndexOf('.') + 1)
					] || supportedTypes.default;

			if (req.params.modified) reply.type(supportedTypes[disguise]);
			else reply.type(type);
			reply.send(
				tryReadFile(`../views/dist/${fileName}`, import.meta.url)
			);
		}
	);

	app.get<{ Params: { redirect: string } }>(
		`${serverUrl.pathname}github/:redirect`,
		(req, reply) => {
			if (req.params.redirect in externalPages.github)
				reply.redirect(externalPages.github[req.params.redirect]);
			else
				reply.code(404).type(supportedTypes.default).send(preloaded404);
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
				.send(
					tryReadFile(
						`../views/dist/${pages[pages.default]}`,
						import.meta.url
					)
				);
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

	return app;
}
