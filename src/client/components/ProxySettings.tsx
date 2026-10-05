import { route } from '../document-helpers.tsx';

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
		</div>
	);
}
