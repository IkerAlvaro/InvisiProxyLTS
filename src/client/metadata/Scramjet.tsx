import { SEO, Inline, route } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function ScramjetMetadata() {
	return (
		<>
			<title>InvisiProxy LTS | Scramjet Proxy</title>
			<SEO>
				<meta
					name={'description'}
					content={
						'The new highly innovative proxy of Mercury Workshop using technologies such as service workers and sophisticated rewriting techniques with CAPTCHA support. Scramjet focuses on speed with YouTube, now.gg, Spotify, CoolMathGames and various .io sites!'
					}
				/>
			</SEO>
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
			<script
				src={route('/scram/scramjet-utils.js')}
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
