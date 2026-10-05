import { route } from '../document-helpers.tsx';

export default function ProxyPreloads() {
	return (
		<>
			<link rel="modulepreload" href={route('/libcurl/index.mjs')} />
			<link
				rel="preload"
				as="script"
				href={route('/scram/scramjet.js')}
			/>
			<link
				rel="preload"
				as="script"
				href={route('/scram/controller.api.js')}
			/>
			<link
				rel="preload"
				as="fetch"
				type="application/wasm"
				crossorigin="anonymous"
				href={route('/scram/scramjet.wasm')}
			/>
		</>
	);
}
