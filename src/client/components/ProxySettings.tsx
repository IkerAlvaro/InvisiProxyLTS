import { route, values } from '../document-helpers.tsx';

export default function ProxySettings() {
	return (
		<div id={'settings-panel'} class={'pr-settings'}>
			<p>
				Please join the{' '}
				<a href={route('/titaniumnetwork-discord')}>TitaniumNetwork</a>{' '}
				discord server for more links in case this site is blocked!
			</p>
			<br />
			<label>
				{'\n    '}
				Tor Browsing Mode
				{'\n    '}
				<span
					class={'pr-tippy'}
					data-tippy-content={
						'Choose your Tor browsing mode. This allows you to use Tor routing in any browser. TLDR: You can access any .onion link in any browser.'
					}
				>
					{'(?)\n    '}
				</span>
				<select class={'useonion'}>
					<option>{'Off'}</option>
					<option>{'Enabled'}</option>
				</select>
			</label>
			<label>
				{'\n    Hide Ads\n    '}
				<span
					class={'pr-tippy'}
					data-tippy-content={'Enable or disable ad blocking.'}
				>
					{'(?)\n    '}
				</span>
				<select class={'hideads'}>
					<option>{'Off'}</option>
					<option selected={true}>{'Enabled'}</option>
				</select>
			</label>
			<label>
				{'\n    Hide History\n    '}
				<span
					class={'pr-tippy'}
					data-tippy-content={
						'WARNING MAY BREAK SITES: Flood history then notice the lack of any history being stored.'
					}
				>
					{'(?)\n    '}
				</span>
				<select class={'history-toggle'}>
					<option value={'none'}>{'Off'}</option>
					<option value={'hidehistory'}>{'Enabled'}</option>
				</select>
			</label>
			<label>
				{'\n    Region Selection\n    '}
				<span
					class={'pr-tippy'}
					data-tippy-content={'Enable or select regional proxies.'}
				>
					{'(?)\n    '}
				</span>
				<select class={'region-list'}>
					<option value={'off'}>{'Off'}</option>
					<option value={'eu'}>{'Sweden'}</option>
					<option value={'jp'}>{'Japan'}</option>
				</select>
			</label>
			<div class={'wisp-box'}>
				<p class={'cseltitle'}>
					{'\n      '}
					Wisp Protocol Transport
					{'\n      '}
					<span
						class={'pr-tippy'}
						data-tippy-content={
							'Wisp is designed to be a low-overhead, easy to implement protocol for proxying multiple TCP sockets over a single websocket connection. TLDR: Selecting a specific option will provide a focus on either speed, security or both at once. Just options for the user to select when utilizing Scramjet.'
						}
					>
						{'(?)\n      '}
					</span>
				</p>
				<table
					class={`transport-table ${values.labels['wisp-transport']}-list`}
				>
					<tbody>
						<tr>
							<td class={'transport-label'}>
								<label for="wisp-libcurl">
									{'\n            '}
									Libcurl
									{'\n            '}
									<span
										class={'pr-tippy'}
										data-tippy-content={
											'Libcurl transport focuses on full TLS encryption but has slightly slower speeds than Epoxy. [ALTERNATIVE/FIREFOX DEFAULT]'
										}
									>
										{'(?)'}
									</span>
									<span class={'default-badge'}>
										Cross-Browser/Secure (Firefox)
									</span>
								</label>
							</td>
							<td class={'transport-radio'}>
								<input
									type={'radio'}
									name={`${values.labels['wisp-transport']}-2`}
									id="wisp-libcurl"
									value={values.labels.libcurl}
									checked={true}
								/>
							</td>
						</tr>
						<tr>
							<td class={'transport-label'}>
								<label for="wisp-epoxy">
									{'\n            '}
									Epoxy
									{'\n            '}
									<span
										class={'pr-tippy'}
										data-tippy-content={
											'Epoxy allows you to make requests that bypass CORS without compromising security by running SSL/TLS inside webassembly with incredible performance. [HIGHLY RECOMMEND AND OPTIMIZED FOR SPEED].'
										}
									>
										{'(?)'}
									</span>
									<span class={'alt-badge'}>
										Fastest/Secure (Chromium, Apple)
									</span>
								</label>
							</td>
							<td class={'transport-radio'}>
								<input
									type={'radio'}
									name={`${values.labels['wisp-transport']}-2`}
									id="wisp-epoxy"
									value={values.labels.epoxy}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<p>
					<br />
					{'\n      '} We offer more domains per month, beta access,
					personal domains and priority feature requests.
					{' You can donate '}
					<a href={route('/patreon')}>{'here'}</a>
					{' or on '}
					<a href={route('/kofi')}>{'Ko-fi'}</a>
					{'.\n    '}
				</p>
			</div>
		</div>
	);
}
