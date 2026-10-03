import { Cooking } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';

export default function UltravioletError() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div class={'container-fluid text-center'}>
				<h1>Network Error</h1>
				<code>
					{'Failed to load: '}
					<b id={'fetchedURL'}></b>
				</code>
				<br />
				<button type="button" id={'reload'}>
					{'Refresh'}
				</button>
				<br />
				<br />
				<h5>
					<p>
						<textarea
							id={'errorTrace'}
							cols={'40'}
							rows={'10'}
							readonly={true}
						>
							{'test'}
						</textarea>
					</p>
				</h5>
				<code class={'uv-small'}>
					{'Refresh the network service | Ultraviolet v'}

					<span id={'uvVersion'}></span>
					{'.'}
				</code>
				<br />
				<br />
				<div class={'container text-wrap'}>
					<ul class={'list-group text-start'}>
						<li class={'list-group-item'}>
							{'\n            '} - Verifying you entered the
							correct address {'\n          '}
						</li>
						<li class={'list-group-item'}>
							{'\n            '} - Clearing your browser or site
							cache data via Ctrl+Shift+R and browser settings{' '}
							{'\n          '}
						</li>
						<li class={'list-group-item'}>
							{'\n            '} - In the case of website
							maintenance or updates, please wait for the issue to
							be resolved. {'\n          '}
						</li>
						<li class={'list-group-item'}>
							{'\n            '} - If the issue persists be sure
							to mention this in the TitaniumNetwork Discord.{' '}
							{'\n          '}
						</li>
						<li class={'list-group-item'}>
							{'\n            '} - View the FAQ page for specific
							site compatibility issues. {'\n          '}
						</li>
					</ul>
				</div>
				<br />
				<p class={'footer-spacing'}>
					<i>
						<>InvisiProxy LTS © 2020-2026 | Made With Love </>
					</i>
					<i class={'nf nf-fa-heart'}></i>
				</p>
				<script
					id={'proxy-error-script'}
					src={'about:blank'}
					innerHTML={''}
				/>
			</div>
		</>
	);
}
