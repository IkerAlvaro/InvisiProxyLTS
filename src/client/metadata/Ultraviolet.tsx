import { SEO, Inline, route } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function UltravioletMetadata() {
	return (
		<>
			<title>InvisiProxy LTS | Ultraviolet Proxy</title>
			<SEO>
				<meta
					name={'description'}
					content={
						'The new highly innovative proxy of TitaniumNetwork using technologies such as service workers and sophisticated rewriting techniques with CAPTCHA support. Ultraviolet focuses on speed with YouTube, now.gg, Spotify, CoolMathGames and various .io sites!'
					}
				/>
			</SEO>
			<HeadContent />
			<script
				src={route('/baremux/index.js')}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<script
				src={route('/uv/uv.bundle.js')}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<script
				src={route('/uv/uv.config.js')}
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
