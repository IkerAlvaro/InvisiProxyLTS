import { Cooking, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';

export default function ScramjetError() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id={'cover'}></div>
			<div id={'inner'} class={'container-fluid text-center'}>
				<h1 id={'errorTitle'}>Scramjet Network Error</h1>
				<code>
					{'Failed to load: '}
					<b id={'fetchedURL'}></b>
				</code>
				<h2>Reloading the page will fix your problem.</h2>
				<br />
				<button type="button" id={'reload'}>
					Refresh Page
				</button>
				<br />
				<div id={'info'}>
					<div id={'errorTrace-wrapper'} class={'container'}>
						<textarea
							id={'errorTrace'}
							cols={'40'}
							rows={'10'}
							readonly={true}
						></textarea>
						<button
							type="button"
							id={'copy-button'}
							class={'primary'}
						>
							{'Copy'}
						</button>
					</div>
					<div id={'troubleshooting'} class={'container text-wrap'}>
						<p>{'Try:'}</p>
						<ul>
							<li>
								{'\n              '}
								Reloading the page; this is a known issue with
								our proxies
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								In the case of an IDB Database error please
								clear your site data by clicking on the lock
								icon in the address bar and selecting "Site
								settings" or "Site data" and then clicking
								"Clear site data"
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								Clearing your browser or site cache data via
								Ctrl+Shift+R and browser settings
								{'\n            '}
							</li>
							<li>Verifying you entered the correct address</li>
							<li>
								{'\n              '}
								In the case of website maintenance or updates,
								please wait for the issue to be resolved.
								{'\n            '}
							</li>
							<li>Verifying you entered the correct address</li>
							<li>Verify the server isn't censored</li>
							<li>
								{'\n              '}
								View the FAQ page for specific site
								compatibility issues.
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								Troubleshooting the error on the{' '}
								<a
									href={route('/github/scramjet')}
									target={'_blank'}
									rel="noopener"
								>
									Scramjet GitHub.
								</a>
							</li>
							<li>
								{'\n              '}
								Try a different proxy engine via the settings
								panel.
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								If the issue persists be sure to mention this in
								the TitaniumNetwork Discord.
								{'\n            '}
							</li>
						</ul>
					</div>
				</div>
				<code>
					<i>
						{
							'Refresh the network service | Scramjet v1.1.0 - build\n          57ba89e.'
						}
					</i>
				</code>
				<p class={'footer-spacing'}>
					<i>
						<>InvisiProxy LTS © 2020-2026 | Made With Love </>
					</i>
					<i class={'nf nf-fa-heart'}></i>
				</p>
			</div>
			<script
				id={'proxy-error-script'}
				src={'about:blank'}
				innerHTML={''}
			/>
		</>
	);
}
