import { Cooking, Inline, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import ProxySettings from '../components/ProxySettings.tsx';
import Footer from '../components/Footer.tsx';

export default function YouTube() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id={'header'} class={'fullwidth'}>
				<Header />
			</div>
			<div id={'background'} class={'fullwidth'}></div>
			<Cooking />
			<div data-aos={'fade-right'} class={'hero-grid-container'}>
				<div class={'box-hero'}>
					<div class={'hero-content'}>
						<div class={'proxy-header text-center'}>
							<h1 class={'bigtitle'}>Youtube Proxy</h1>
							<p>
								YouTube now has enhanced support with onsite
								navigation with Scramjet! Simply use the buttons
								below to access YouTube under a proxy.
								<br />
								<br />
								Be sure to avoid logging in with primary
								accounts, as this is a public proxy service.
								<br />
								If you are self-hosting however feel free.
								<br />
								<br />
								Please enable Tor routing or swap regions if you
								have any issues.
							</p>
							<br />
							View the <a href={route('/questions')}>FAQ</a> page
							if you have any issues with the proxy.
						</div>
						<div class={'proxy-form text-center'}>
							<div class={'glist'}>
								<button
									type="button"
									id={'pr-yt'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									YouTube
								</button>
								<button
									type="button"
									id={'pr-iv'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Invidious
								</button>
							</div>
							<ProxySettings />
						</div>
					</div>
				</div>
			</div>
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
			<Inline>
				<script src={route('assets/js/card.js', 'inline')} />
			</Inline>
		</>
	);
}
