import { fork, type ChildProcess } from 'node:child_process';
import { createServer } from 'node:net';
import { relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	build,
	type Plugin,
	type PreviewServer,
	type ViteDevServer,
} from 'vite';
import {
	canUpdateDevelopmentFiles,
	updateDevelopmentFiles,
} from './vite-dev.ts';

export async function backendPort(): Promise<number> {
	const socket = createServer();
	await new Promise<void>((resolve, reject) => {
		socket.once('error', reject);
		socket.listen(0, '127.0.0.1', resolve);
	});
	const address = socket.address();
	if (!address || typeof address === 'string')
		throw new Error('No backend port available');
	await new Promise<void>((resolve, reject) =>
		socket.close((error) => (error ? reject(error) : resolve()))
	);
	return address.port;
}

export function backendPlugin(port: number): Plugin {
	let child: ChildProcess | undefined;
	let closing = false;
	let rebuilding: Promise<void> | undefined;
	let timer: ReturnType<typeof setTimeout> | undefined;
	const pending = new Set<string>();
	let stopWatching: (() => void) | undefined;

	async function stopBackend() {
		const current = child;
		child = undefined;
		if (
			!current ||
			current.exitCode !== null ||
			current.signalCode !== null
		)
			return;
		await new Promise<void>((resolve) => {
			const timeout = setTimeout(() => current.kill('SIGKILL'), 5000);
			current.once('exit', () => {
				clearTimeout(timeout);
				resolve();
			});
			current.kill('SIGTERM');
		});
	}

	async function startBackend(server: ViteDevServer | PreviewServer) {
		const current = fork(
			fileURLToPath(new URL('../backend.ts', import.meta.url)),
			[],
			{
				stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
				env: {
					...process.env,
					PORT: String(port),
					INVISIPROXY_BACKEND_HOST: '127.0.0.1',
				},
			}
		);
		child = current;
		current.once('exit', () => {
			if (child === current && !closing) void server.close();
		});
		await new Promise<void>((resolve, reject) => {
			const timeout = setTimeout(() => {
				current.kill();
				reject(new Error('Backend startup timed out'));
			}, 30000);
			const failed = () => {
				clearTimeout(timeout);
				reject(new Error('Backend exited before becoming ready'));
			};
			current.once('exit', failed);
			current.once('error', reject);
			current.once('message', () => {
				clearTimeout(timeout);
				current.removeListener('exit', failed);
				resolve();
			});
		});
	}

	function cleanup(server: ViteDevServer | PreviewServer) {
		const close = () => {
			closing = true;
			clearTimeout(timer);
			stopWatching?.();
			void (async () => {
				await rebuilding;
				await stopBackend();
			})();
		};
		const signal = () => void server.close();
		process.once('SIGINT', signal);
		process.once('SIGTERM', signal);
		server.httpServer?.once('close', () => {
			process.removeListener('SIGINT', signal);
			process.removeListener('SIGTERM', signal);
			close();
		});
	}

	return {
		name: 'invisiproxy-backend',
		apply: 'serve',
		async configureServer(server) {
			process.env.INVISIPROXY_VITE_DEV = '1';
			await build({ configLoader: 'native' });
			cleanup(server);
			await startBackend(server);
			await server.ssrLoadModule('/src/client/entry.tsx');
			const rebuild = () => {
				if (closing || rebuilding || pending.size === 0) return;
				rebuilding = (async () => {
					while (!closing && pending.size) {
						const files = [...pending];
						pending.clear();
						const started = performance.now();
						try {
							if (
								canUpdateDevelopmentFiles(
									server.config.root,
									files
								)
							) {
								await updateDevelopmentFiles(server, files);
							} else {
								await build({ configLoader: 'native' });
								await stopBackend();
								if (!closing) await startBackend(server);
							}
							if (!closing && pending.size === 0) {
								server.ws.send({
									type: 'full-reload',
									path: '*',
								});
								server.config.logger.info(
									`[dev] Reloaded in ${Math.round(performance.now() - started)}ms`
								);
							}
						} catch (error) {
							server.config.logger.error(String(error));
							server.ws.send({
								type: 'error',
								err: {
									message: String(error),
									stack:
										error instanceof Error
											? error.stack || ''
											: '',
								},
							});
						}
					}
				})().finally(() => {
					rebuilding = undefined;
				});
			};
			const onFileChange = (event: string, file: string) => {
				if (!['add', 'change', 'unlink'].includes(event)) return;
				if (
					server.config.configFileDependencies.includes(resolve(file))
				)
					return;
				const path = relative(
					server.config.root,
					resolve(file)
				).replaceAll('\\', '/');
				if (
					!(
						/^(src|views)\//.test(path) ||
						['config.json', 'backend.ts'].includes(path)
					)
				)
					return;
				if (/^views\/dist(?:-new)?\//.test(path)) return;
				pending.add(path);
				clearTimeout(timer);
				timer = setTimeout(rebuild, 25);
			};
			server.watcher.on('all', onFileChange);
			stopWatching = () => server.watcher.off('all', onFileChange);
		},
		hotUpdate({ file }) {
			const path = relative(
				this.environment.config.root,
				file
			).replaceAll('\\', '/');
			if (/^(src\/client|views)\//.test(path)) return [];
		},
		async configurePreviewServer(server) {
			cleanup(server);
			await startBackend(server);
		},
		async closeBundle() {
			closing = true;
			clearTimeout(timer);
			stopWatching?.();
			await rebuilding;
			await stopBackend();
		},
	};
}
