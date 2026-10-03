import { Cooking, Inline, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import ProxySettings from '../components/ProxySettings.tsx';
import Footer from '../components/Footer.tsx';

export default function Partners() {
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
							<h1 class={'bigtitle'}>Mirror Links</h1>
							<p>
								<br />
								<br />
								In order to keep using InvisiProxy (if it gets
								blocked), please join the{' '}
								<a href={route('/titaniumnetwork-discord')}>
									{'TN discord'}
								</a>{' '}
								to obtain more links.
								{'\n              '}
								<br />
								{
									'Simply verify your discord account then head over to '
								}
								<strong>#panel</strong>
								{' channel and select '}
								<code>{'InvisiProxy'}</code>
								{'.\n              '}
								<br />
								The links are restocked from a database monthly
								so be sure to check back often after restocks!
								{'\n              '}
								<br />
								This is
								<strong>free to use</strong> for everyone but we
								also have a{' '}
								<a href={route('/patreon')}>{'patreon'}</a> if
								you would like to support the project.
								{'\n            '}
							</p>
						</div>
						<div class={'proxy-header text-center'}>
							<h2>Partners Services</h2>
							<p>
								{'\n              '}
								Select an exclusively supported partner service
								that is proxied. Our partners feature a similar
								model to InvisiProxy so be sure to join their
								respective discords for more links.
								{'\n            '}
							</p>
						</div>
						<div class={'proxy-form text-center'}>
							<div class={'glist'}>
								<a
									href={route('/freedomproject')}
									id={'pr-fe'}
									data-tippy-content={
										'Anti-Censorship Proxy [Hard Fork]: A hard fork of InvisiProxy LTS that focuses purely on anti-censorship functionality and minimal design.'
									}
									class={
										'fancybutton glowbutton tippy-button pr-go2'
									}
								>
									The Freedom Project
								</a>
								<button
									type="button"
									id={'pr-trl'}
									data-tippy-content={
										'Web Ports, Proxy, Games [Third Party]: The best unblocked games site available with many web ports and a huge collection.'
									}
									class="fancybutton glowbutton tippy-button pr-go2 link-button"
								>
									Truffled
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
