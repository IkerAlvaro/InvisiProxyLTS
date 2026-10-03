import { SEO, Inline, route, values } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function BrowserMetadata() {
	return (
		<>
			<meta http-equiv={'x-ua-compatible'} content={'IE=edge'} />
			<meta name={'version'} content={values.version} />
			<title>InvisiProxy LTS | Web Proxies</title>
			<SEO>
				<meta name={'googlebot'} content={'index, follow, snippet'} />
				<meta
					name={'robots'}
					content={
						'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
					}
				/>
				<meta
					name={'description'}
					content={
						'InvisiProxy is a secure web proxy service with support for many sites. Bypass filters and freely enjoy a safer private browsing experience or unblock websites on devices such as Chromebooks and at places like school or work without downloading anything.'
					}
				/>
				<link
					rel={'canonical'}
					href={'https://invisiproxy.com/browsing'}
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
			<link
				rel={'stylesheet'}
				href={'https://unpkg.com/tippy.js@6/dist/backdrop.css'}
			/>
			<link
				rel={'stylesheet'}
				href={'https://unpkg.com/tippy.js@6/animations/shift-away.css'}
			/>
			<script
				src={'https://unpkg.com/@popperjs/core@2'}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<script
				src={'https://unpkg.com/tippy.js@6'}
				defer={true}
				innerHTML={''}
			/>
			<Inline>
				<script
					src={route('assets/js/csel.js', 'inline')}
					defer={true}
					innerHTML={''}
				/>
				<script
					src={route('assets/js/common.js', 'inline')}
					defer={true}
					innerHTML={''}
				/>
			</Inline>
		</>
	);
}
