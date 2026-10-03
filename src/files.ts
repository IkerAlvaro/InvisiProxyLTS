import { existsSync, readFileSync } from 'node:fs';
import { config, text404 } from './routes.ts';
export { tryReadFile, preloaded404 };

const isImage = /\.(?:ico|png|jpg|jpeg)$/,
	preformatted404 = text404,
	preloaded404 = config.disguiseFiles
		? Buffer.from(
				await new Response(
					new Blob([preformatted404])
						.stream()
						.pipeThrough(new CompressionStream('gzip'))
				).arrayBuffer()
			)
		: preformatted404,
	tryReadFile = (
		file: string | URL,
		baseUrl: string | URL = new URL('../', import.meta.url),
		isBuffer = config.disguiseFiles
	) => {
		const location = new URL(file, baseUrl);
		return existsSync(location)
			? isImage.test(location.pathname) || isBuffer
				? readFileSync(location)
				: readFileSync(location, 'utf8')
			: preloaded404;
	};
