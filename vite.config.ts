import { defineConfig, type UserConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { config, serverUrl, serverPort } from './src/routes.ts';
import { siteBuildPlugin } from './src/build.ts';
import { backendPlugin, backendPort } from './src/vite-server.ts';

export default defineConfig(
	async ({ command, isPreview }): Promise<UserConfig> => {
		const port = command === 'serve' ? await backendPort() : 0;
		const proxy = {
			'^(?!.*(?:/@vite/|/@id/|/@fs/|/@vite/hmr|/__vite))': {
				target: `http://127.0.0.1:${port}`,
				ws: true,
				xfwd: true,
			},
		};
		return {
			base: serverUrl.pathname,
			publicDir: false,
			plugins: [
				siteBuildPlugin(),
				backendPlugin(port),
				solid({ ssr: true }),
			],
			server: {
				host: true,
				allowedHosts: true,
				port: serverPort,
				strictPort: true,
				proxy,
				hmr: { path: '@vite/hmr' },
				watch: {
					ignored: ['**/views/dist/**', '**/views/dist-new/**'],
				},
			},
			preview: {
				host: serverUrl.hostname,
				port: serverPort,
				strictPort: true,
				proxy,
			},
			build: {
				emptyOutDir: false,
				outDir: isPreview ? 'views/dist' : 'views/dist-new/assets/js',
				minify: config.minifyScripts,
				target: 'esnext',
				lib: {
					entry: 'src/client/faq-search.tsx',
					name: 'FAQSearch',
					formats: ['iife'],
					fileName: () => 'faq-search.js',
				},
			},
		};
	}
);
