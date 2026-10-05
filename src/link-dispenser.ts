import type { FastifyInstance } from 'fastify';
import { randomInt } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { config } from './site-config.ts';

const linksFile = pathToFileURL(
	resolve(fileURLToPath(new URL('../', import.meta.url)), config.mirrorLinksFile)
);
const cooldownMs = 5000;

export function registerLinkDispenser(
	app: FastifyInstance,
	path: string,
	file: URL = linksFile
) {
	const requests = new Map<string, number>();
	app.post(path, async (request, reply) => {
		reply.header('Cache-Control', 'no-store');
		const now = Date.now();
		const nextRequest = requests.get(request.ip) || 0;
		if (nextRequest > now) {
			return reply
				.code(429)
				.header('Retry-After', Math.ceil((nextRequest - now) / 1000))
				.send({
					error: 'Please wait 5 seconds before requesting another link.',
				});
		}
		for (const [ip, expires] of requests) {
			if (expires <= now) requests.delete(ip);
		}
		if (requests.size >= 10000)
			return reply.code(503).send({ error: 'Please try again shortly.' });
		requests.set(request.ip, now + cooldownMs);

		try {
			const links = (await readFile(file, 'utf8'))
				.split(/\r?\n/)
				.map((line) => line.trim())
				.filter((line) => line && !line.startsWith('#'))
				.flatMap((line) => {
					try {
						const url = new URL(line);
						return ['https:', 'http:'].includes(url.protocol) &&
							!url.username &&
							!url.password
							? [url.href]
							: [];
					} catch {
						return [];
					}
				});
			if (links.length) return { link: links[randomInt(links.length)] };
		} catch {}
		return reply.code(503).send({
			error: 'No mirror links are available right now. Please check back later.',
		});
	});
}
