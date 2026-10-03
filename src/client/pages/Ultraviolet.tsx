import { Cooking, Inline, route, values } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import ProxySettings from '../components/ProxySettings.tsx';
import Footer from '../components/Footer.tsx';

export default function Ultraviolet() {
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
							<img
								class={'pr-logo'}
								src={route('/assets/img/uv.webp')}
								alt={'Ultraviolet Web Proxy'}
							/>
							<p>
								<a href={route('/github/ultraviolet')}>
									<strong>Ultraviolet</strong>
								</a>
								{'\n              '}
								is a proxy of TitaniumNetwork using technologies
								such as service workers and with CAPTCHA
								support.
								<br />
								This is the most recent legacy project of
								TitaniumNetwork. You can use this as a fallback
								in case Scramjet does not have support for your
								site. <br />
								<br />
								If you have any issues with Ultraviolet, please
								report them on the
								{'\n              '}
								<a href={route('/github/ultraviolet')}>
									Ultraviolet GitHub repository
								</a>
								{'.'}
								<br />
								<br />
								Enable Tor routing if you are struggling to
								login to services or view sites.
								<br />
								<br />
								{'View the\n              '}
								<a href={route('/questions')}>{'FAQ'}</a> page
								if you have any issues with the proxy.
								{'\n            '}
							</p>
						</div>
						<div class={'proxy-form text-center'}>
							<div id={'pr-uv'} class={'pr-form'}>
								<select
									id={'search-engine'}
									name={'search-engine'}
									aria-label={'Search engine'}
									class={
										'pr-button glowbutton search-engine-list'
									}
								>
									{[
										values.labels.Startpage,
										values.labels.Google,
										values.labels.Bing,
										values.labels.Brave,
										values.labels.DuckDuckGo,
									].map((engine) => (
										<option
											value={engine}
											selected={engine === values.defaultSearch}
										>
											{engine}
										</option>
									))}
								</select>
								<div class={'search-box'}>
									<input
										type={'text'}
										spellcheck={'false'}
										autocomplete={'off'}
										placeholder={
											'Type a URL here or enter a search query!'
										}
										id={'search-input'}
									/>
									<ul id={'autocomplete'}></ul>
								</div>
								<button
									type="button"
									class="pr-button glowbutton pr-go2 link-button"
									id={'search-btn'}
								>
									{'SEARCH'}
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
