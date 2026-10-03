import { Cooking, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function Browser() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id={'header'} class={'fullwidth'}>
				<Header />
			</div>
			<div id={'background'} class={'fullwidth'}></div>
			<Cooking />
			<div id={'mainbody'} class={'fullwidth'}>
				<div class={'box-main-container'}>
					<div class={'box-text-container'}>
						<p class={'box-badge'}>
							<span class={'box-default-badge'}>{'Tip'}</span>
							InvisiProxy LTS features adblock and TOR support!
							{'\n          '}
						</p>
						<h1>
							{'\n            '} InvisiProxy LTS sets the standard
							for fast, secure, and highly advanced web proxy
							services. {'\n          '}
						</h1>
						<h2 class={'box-description'}>
							{'\n            '} Experience rapid and reliable
							proxy performance with InvisiProxy LTS. Our robust
							feature set includes CAPTCHA integration,
							customizable blacklist settings, leak prevention
							mechanisms, and advanced security measures.{' '}
							{'\n          '}
						</h2>
						<h3> Select a proxy service below to get started! </h3>
						<Cooking />
						<div class={'box-button-container'}>
							<a
								href={route('/scramjet')}
								class={'box-button tippy-button'}
								data-tippy-content={
									'Scramjet [Recommended]: Fast, secure, and frequently updated.'
								}
							>
								Scramjet (LATEST v2)
							</a>
							<a
								id={'uvtooltip'}
								href={route('/ultraviolet')}
								class={'box-button tippy-button'}
								data-tippy-content={
									'Ultraviolet [Fallback]: Popular, but use as fallback for CAPTCHA support.'
								}
							>
								Ultraviolet
							</a>
						</div>
						<p>
							<br />
							{'\n            '} Scramjet is the recommended proxy
							option for the best performance and security. Each
							proxy will have a different set of site support and
							ability to bypass restrictions. Use Ultraviolet as a
							fallback.
							{'\n          '}
						</p>
						<p>
							<br />
							{'\n            '} We offer more domains per month,
							beta access, personal domains and priority feature
							requests.
							{' You can donate\n            '}
							<a href={route('/patreon')}>{'here'}</a>
							{' or on '}
							<a href={route('/kofi')}>{'Ko-fi'}</a>
							{'.\n          '}
						</p>
					</div>
					<div class={'box-image-container'}>
						<img
							class={'box-pr-logo'}
							src={route('/assets/img/browsing_splash.webp')}
							alt={'InvisiProxy Browsing Splash'}
						/>
					</div>
				</div>
			</div>
			<Cooking />
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
		</>
	);
}
