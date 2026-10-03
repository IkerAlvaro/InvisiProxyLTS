import { route, values } from '../document-helpers.tsx';

export default function Settings() {
	return (
		<div class={'settings-content'}>
			<div class={'settings-header'}>
				<p class={'cseltitle-main'}>{'Settings'}</p>
				<i class={'far fa-times-circle close-settings-btn'}></i>
			</div>
			<div class={'settings-content-body'}>
				<div class={'csel-container-left'}>
					<p class={'cseltitle'}>Browser Tab Cloak</p>
					<form id={'titleform'} class={'cloakform'}>
						<input
							type={'text'}
							placeholder={'Enter a tab title here...'}
							spellcheck={'false'}
						/>
						<input type={'submit'} value={'Apply'} />
					</form>
					<form id={'iconform'} class={'cloakform'}>
						<input
							type={'text'}
							placeholder={'Enter an icon URL here...'}
							spellcheck={'false'}
						/>
						<input type={'submit'} value={'Apply'} />
					</form>
					<a href={route('/questions')}>Find Icon URL</a>
					<p class={'cseltitle'}>Wisp Protocol Transport</p>
					<div
						class={`radio-group ${values.labels['wisp-transport']}-list`}
					>
						<label>
							<p>
								{'\n            '}
								Libcurl
								{'\n            '}
								<span class={'default-badge'}>
									Cross-Browser/Secure (Firefox)
								</span>
							</p>
							<input
								type={'radio'}
								name={values.labels['wisp-transport']}
								value={values.labels.libcurl}
								checked={true}
							/>
						</label>
						<label>
							<p>
								{'\n            '}
								Epoxy
								{'\n            '}
								<span class={'alt-badge'}>
									Fastest/Secure (Chromium, Apple)
								</span>
							</p>
							<input
								type={'radio'}
								name={values.labels['wisp-transport']}
								value={values.labels.epoxy}
							/>
						</label>
					</div>
					<p class={'cseltitle'}>{'Advanced Options'}</p>
					<div class={'radio-group'}>
						<label>
							<p>
								{'\n            '}
								Prevent Tab Leaks
								{'\n            '}
								<span class={'default-badge'}>
									Breaks Some Sites
								</span>
							</p>
							<input type={'checkbox'} class={'switch sandbox'} />
						</label>
						<label>
							<p>
								{'\n            Hide Ads\n            '}
								<span class={'default-badge'}>
									Layered Adblocking
								</span>
							</p>
							<input
								type={'checkbox'}
								class={'switch hideads'}
								checked={true}
							/>
						</label>
						<label>
							<p>
								{'\n            '}
								Enable Tor/Rotate IP
								{'\n            '}
								<span class={'alt-badge'}>
									Onion Browser Routing
								</span>
							</p>
							<input
								type={'checkbox'}
								class={'switch useonion'}
							/>
						</label>
						<label>
							<p>
								{
									'\n            Enable Autocomplete\n            '
								}
								<span class={'default-badge'}>
									Proxied Suggestions
								</span>
							</p>
							<input
								type={'checkbox'}
								class={'switch useac'}
								checked={true}
							/>
						</label>
					</div>
				</div>
				<div class={'csel-container-right'}>
					<p class={'cseltitle'}>{'Search Engine'}</p>
					<select
						id={'settings-search-engine'}
						name={'search-engine'}
						aria-label={'Search engine'}
						class={'search-engine-list'}
					>
						{[
							values.labels.Startpage,
							values.labels.DuckDuckGo,
							values.labels.Bing,
							values.labels.Brave,
						].map((engine) => (
							<option
								value={engine}
								selected={engine === values.defaultSearch}
							>
								{engine}
							</option>
						))}
					</select>
					<p class={'cseltitle'}>{'Select Theme'}</p>
					<div class={'radio-group theme-list'}>
						<label>
							<p>{'Enable Default (Dark) Theme'}</p>
							<input
								type={'radio'}
								name={'theme'}
								value={'dark'}
								checked={true}
							/>
						</label>
						<label>
							<p>{'Enable Light Theme'}</p>
							<input
								type={'radio'}
								name={'theme'}
								value={'light'}
							/>
						</label>
						<label>
							<p>{'Enable Nordish Theme'}</p>
							<input
								type={'radio'}
								name={'theme'}
								value={'nord'}
								checked={true}
							/>
						</label>
					</div>
					<p class={'cseltitle'}>{'Icon Presets'}</p>
					<select id={'icon-list'}>
						<option></option>
						<option>{values.labels.Google}</option>
						<option>{values.labels.Bing}</option>
						<option>{`${values.labels.Google} Drive`}</option>
						<option>{'Gmail'}</option>
					</select>
					<p class={'cseltitle'}>{'Experimental Settings'}</p>
					<div class={'radio-group'}>
						<label>
							<p>
								{'\n            '}
								Region
								{'\n            '}
								<span class={'default-badge'}>
									Swap Proxy Region
								</span>
							</p>
							<select class={'region-list'}>
								<option value={'off'}>{'Off'}</option>
								<option value={'eu'}>{'Sweden'}</option>
								<option value={'jp'}>{'Japan'}</option>
							</select>
						</label>
						<label>
							<p>
								{'\n            '}
								Hide History
								{'\n            '}
								<span class={'default-badge'}>
									Experimental
								</span>
							</p>
							<select class={'history-toggle'}>
								<option value={'none'}>{'Off'}</option>
								<option value={'hidehistory'}>
									{'Enabled'}
								</option>
							</select>
						</label>
						<label>
							<p>
								{'\n            '}
								Window Type
								{'\n            '}
								<span class={'default-badge'}>
									about:blank | blob
								</span>
							</p>
							<select class={'cloak-type-list'}>
								<option
									{...{
										name: 'cloak-type',
										value: 'none',
										checked: true,
									}}
								>
									{'Off'}
								</option>
								<option
									{...{ name: 'cloak-type' }}
									value={'blank'}
								>
									about:blank
								</option>
								<option
									{...{ name: 'cloak-type' }}
									value={'blob'}
								>
									blob
								</option>
							</select>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
