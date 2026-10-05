import { SEO, Inline, route } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';
import ProxyPreloads from '../components/ProxyPreloads.tsx';

export default function ApplicationsMetadata() {
	return (
		<>
			<title>InvisiProxy LTS | Applications</title>
			<SEO>
				<meta
					name={'description'}
					content={
						'InvisiProxy is a secure web proxy service with support for many sites. Bypass filters and freely enjoy a safer private browsing experience or unblock websites on devices such as Chromebooks and at places like school or work without downloading anything.'
					}
				/>
			</SEO>
			<ProxyPreloads />
			<HeadContent />
			<script
				src={route('/scram/scramjet.js')}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<script
				src={route('/scram/controller.api.js')}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<Inline>
				<script
					src={route('/assets/js/register-sw.js', 'inline')}
					defer={true}
					innerHTML={''}
				/>
			</Inline>
			<script
				src={
					'https://unpkg.com/tsparticles@3.8.1/tsparticles.bundle.min.js'
				}
				defer={true}
				data-module={''}
				innerHTML={''}
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
