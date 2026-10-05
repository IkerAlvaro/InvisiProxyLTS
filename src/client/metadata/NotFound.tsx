import { SEO, Inline, route } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function NotFoundMetadata() {
	return (
		<>
			<base href={'/'} />
			<title>InvisiProxy LTS | Error</title>
			<meta itemprop={'http-status'} content={'404'} />
			<SEO>
				<meta
					name={'description'}
					content={
						'InvisiProxy is a secure web proxy service with support for many sites. Bypass filters and freely enjoy a safer private browsing experience or unblock websites on devices such as Chromebooks and at places like school or work without downloading anything.'
					}
				/>
			</SEO>
			<HeadContent />
			<script
				src={
					'https://unpkg.com/tsparticles@3.8.1/tsparticles.bundle.min.js'
				}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<Inline>
				<script
					src={route('assets/js/csel.js', 'inline')}
					defer={true}
					innerHTML={''}
				/>
			</Inline>
			<style
				innerHTML={
					"\n      body {\n        color: #eceff4;\n        background-color: #0d1117;\n        font-family: 'Figtree', sans-serif;\n        font-optical-sizing: auto;\n        background-image:\n          radial-gradient(\n            circle,\n            rgba(131, 131, 131, 0.02) 1px,\n            transparent 1px\n          ),\n          radial-gradient(\n            circle,\n            rgba(148, 148, 148, 0.02) 1px,\n            transparent 1px\n          );\n        background-position:\n          0 0,\n          5px 5px;\n        background-size: 10px 10px;\n      }\n\n      h1 {\n        color: #ff5861;\n        font-size: 84px;\n        font-weight: 900;\n        margin-top: 6%;\n      }\n    "
				}
			/>
		</>
	);
}
