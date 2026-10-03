import { SEO, Inline, route } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function PartnersMetadata() {
	return (
		<>
			<title>InvisiProxy LTS | Partners</title>
			<SEO>
				<meta
					name={'description'}
					content={
						'InvisiProxy is a secure web proxy service with support for many sites. Bypass filters and freely enjoy a safer private browsing experience or unblock websites on devices such as Chromebooks and at places like school or work without downloading anything.'
					}
				/>
			</SEO>
			<HeadContent />
			<link
				rel={'stylesheet'}
				href={'https://unpkg.com/tippy.js@6/dist/backdrop.css'}
			/>
			<link
				rel={'stylesheet'}
				href={'https://unpkg.com/tippy.js@6/animations/shift-away.css'}
			/>
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
			<script
				src={route('/baremux/index.js')}
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
