import { Cooking, Inline, route, sites } from '../document-helpers.tsx';
import {
	ParticlesScript,
	TooltipScripts,
	ScramjetScripts,
	RegisterServiceWorkerScript,
	PageScripts,
	PageDescription,
} from '../components/HeadScripts.tsx';
import HeadContent from '../components/HeadContent.tsx';
import ProxyPreloads from '../components/ProxyPreloads.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import ProxySettings from '../components/ProxySettings.tsx';
import Footer from '../components/Footer.tsx';
import App from '../components/AppButton.tsx';

export default function Applications() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id="header" class="fullwidth">
				<Header />
			</div>
			<div id="background" class="fullwidth"></div>
			<Cooking />
			<div data-aos="fade-right" class="hero-grid-container">
				<div class="box-hero">
					<div class="hero-content">
						<div class="proxy-header text-center">
							<h1 class="bigtitle">Applications</h1>
							<p>
								Select a website below to open it through the
								proxy. Be sure to avoid logging in with primary
								accounts, as this is a public proxy service.
								<br />
								If you are self-hosting however feel free.
							</p>
							<br />
							<br />
							Please enable Tor routing or swap regions if you
							have any issues. For GeForce Now disable ads also.
							<br />
							{'View the\n            '}
							<a href={route('/questions')}>FAQ</a> page if you
							have any issues with the proxy.
						</div>
						<div class="proxy-form text-center">
							<div class="glist">
								{sites.map((site) => (
									<App
										url={site.url}
										name={site.name}
									/>
								))}
							</div>
							<ProxySettings />
						</div>
					</div>
				</div>
			</div>
			<Cooking />
			<div id="footer" class="fullwidth">
				<Footer />
			</div>
			<Inline>
				<script src={route('assets/js/card.js', 'inline')} />
			</Inline>
		</>
	);
}

export function Head() {
	return (
		<>
			<title>InvisiProxy LTS | Applications</title>
			<PageDescription />
			<ProxyPreloads />
			<HeadContent />
			<ScramjetScripts />
			<RegisterServiceWorkerScript />
			<ParticlesScript />
			<TooltipScripts />
			<PageScripts />
		</>
	);
}
