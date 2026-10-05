import { Cooking, Inline, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import ProxySettings from '../components/ProxySettings.tsx';
import Footer from '../components/Footer.tsx';

export default function Applications() {
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
							<h1 class={'bigtitle'}>Applications</h1>
							<p>
								{'\n              '}
								Select an exclusively supported website that is
								proxied. Be sure to avoid logging in with
								primary accounts, as this is a public proxy
								service.
								<br />
								If you are self-hosting however feel free.
								{'\n            '}
							</p>
							<br />
							<br />
							Please enable Tor routing or swap regions if you
							have any issues. For GeForce Now disable ads also.
							<br />
							{'View the\n            '}
							<a href={route('/questions')}>{'FAQ'}</a> page if
							you have any issues with the proxy.
							{'\n          '}
						</div>
						<div class={'proxy-form text-center'}>
							<div class={'glist'}>
								<button
									type="button"
									id={'pr-cg'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									ChatGPT
								</button>
								<button
									type="button"
									id={'pr-fm'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									FMHY
								</button>
								<button
									type="button"
									id={'pr-ha'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Animetsu
								</button>
								<button
									type="button"
									id={'pr-dc'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Discord
								</button>
								<button
									type="button"
									id={'pr-gf'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									GeForce NOW
								</button>
								<button
									type="button"
									id={'pr-sp'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Spotify
								</button>
								<button
									type="button"
									id={'pr-tc'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Twitch
								</button>
								<button
									type="button"
									id={'pr-tt'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									TikTok
								</button>
								<button
									type="button"
									id={'pr-tw'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Twitter
								</button>
								<button
									type="button"
									id={'pr-ig'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Instagram
								</button>
								<button
									type="button"
									id={'pr-rt'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Reddit
								</button>
								<button
									type="button"
									id={'pr-wa'}
									class="fancybutton glowbutton pr-go2 link-button"
								>
									Wikipedia
								</button>
							</div>
							<ProxySettings />
						</div>
					</div>
				</div>
			</div>
			<Cooking />
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Inline>
				<script src={route('assets/js/card.js', 'inline')} />
			</Inline>
		</>
	);
}
