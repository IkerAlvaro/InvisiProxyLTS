import { Cooking, iconBookmarklet } from '../document-helpers.tsx';

export default function FAQ() {
	return (
		<>
			<div class={'faq-center'}>
				<h2>InvisiProxy FAQ and Support</h2>
			</div>
			<div class={'faq-box'}>
				<div id="faq-search-root">
					<input
						class={'faq-search'}
						type={'text'}
						autocomplete={'off'}
						spellcheck={'false'}
						placeholder={'Search'}
					/>
				</div>
			</div>
			<div class={'box-clear text-center textm'}>
				<Cooking />
				<h2 class={'bigtitle'}>{'Icon Information'}</h2>
				<h4>How to find the Icon URL of a Site</h4>
				<p>
					{'\n    '}
					Go to the website you want an icon from, then use this
					bookmarklet (drag it to your bookmarks bar):
					{'\n  '}
				</p>
				<div id={'bks-parent'}>
					<a
						href={iconBookmarklet()}
						id={'iconfinder'}
						class={'fancybutton fb-l glowbutton'}
					>
						{'Find Icon URL'}
					</a>
				</div>
				<p>
					{'\n    '} Copy the URL that the bookmarklet gives you. Then
					go back to HU and enter in the URL for the Icon URL in
					Settings. Enjoy! {'\n  '}
				</p>
			</div>
			<div id={'faqs'} class={'faq'}>
				<div class={'faq-text'}>
					<h3>
						<strong>
							I am getting "Network Error" or Site Error every
							time I use the proxy?
						</strong>
					</h3>
					<p>
						{'\n      '}
						This is a known issue with our modern web proxies.
						Simply hit the Refresh Page button and reload the page
						to resolve the issue.
						{'\n    '}
					</p>
					<p>
						{'\n      '} This typically happens the first time you
						use the proxy. We have a future fix for this. {'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>
							I am having problems logging into sites or viewing
							content since it thinks I am a bot.
						</strong>
					</h3>
					<p>
						{'\n      '}
						During peak traffic hours this is very common due to
						everything going through only two respective IPs. The
						solution is to swap regions via Region Selection or
						enable Tor routing.
						{'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>
							I am getting an error similar to: "'cdn.example.com'
							cannot be reached."
						</strong>
					</h3>
					<p>
						{'\n      '} Reload the page. If that doesn't work the
						first time, simply use the browser's back button or head
						back to the Scramjet page and try again. {'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>
							Why is my site loading in partially or just blank?
						</strong>
					</h3>
					<p>
						{'\n      '} Not all websites are supported. Naturally
						this is due to the wide expanses of the web with
						different technologies and methods of loading content.
						If you are having issues with a specific site, please
						report it to us on our Discord server or GitHub.
						Otherwise try filtering through our proxy options to see
						if one of them supports the site. {'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>
							{
								'I am getting an error relating to the IDB Database'
							}
						</strong>
					</h3>
					<p>
						{'\n      '} This typically happens whenever we do
						updates to our project. Simply click on the (i) icon in
						the top left corner of your browser (or lock symbol) and
						select "Clear Site Data" or "Clear Cookies and Site Data
						&gt; Manage On-Site Data &gt; Trash Icon". This will
						clear the IndexedDB database and allow you to use the
						proxy again. {'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>Is Discord supported?</strong>
					</h3>
					<p>Yes, Discord is supported.</p>
					<ul>
						<li>
							{'\n        '} However, there are some limitations
							with the free proxies. Ensure that you don't utilize
							your main account unless if you are self-hosting or
							using a small domain. {'\n      '}
						</li>
					</ul>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>Why are YouTube videos not working?</strong>
					</h3>
					<p>
						{'\n      '} If you are having persistent issues even
						after doing the steps above there is a chance that the
						instance is down temporarily, especially if large groups
						of people are also having the issue. This issue doesn't
						happen for self-hosting.
						{'\n    '}
					</p>
					<p>
						{'\n      '}
						Try selecting the "Tor" option as this may fix the
						problem but greatly reduce loading speeds.
						{'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>Is it safe for me to login to sites?"</strong>
					</h3>
					<p>
						{'\n      '} Yes, it is safe to login to sites. However,
						we recommend that you do not login into sites you do not
						trust or use personal accounts due to the number of
						traffic being routed into a single domain. We try to
						migate this problem by rotating IPs however it is just a
						common practice to not use personal accounts on public
						proxies. Self-hosting however you can do so with ease.{' '}
						{'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>
							Why is the site I am on not working correctly or
							having CAPTCHA errors?
						</strong>
					</h3>
					<p>
						{'\n      '} Captcha support works with Scramjet but it
						will take trial and error. The reason for this is
						Scramjet is often simply too fast and naturally CAPTCHA
						is very spotty. The solution is just keep trying to
						solve the CAPTCHA until it works. Try not to go too
						fast. {'\n    '}
					</p>
				</div>
				<div class={'faq-text'}>
					<h3>
						<strong>
							{' '}
							When using YouTube on any of the proxy sites, why
							does the page not load fully or the video is just
							white?
						</strong>
					</h3>
					<p>There are two methods for fixing this:</p>
					<ul>
						<li>
							<p>
								{'\n          '}
								Reloading the page normally when the error above
								happens should load the video.
								{'\n        '}
							</p>
						</li>
						<li>
							<p>
								{
									'\n          Or right-clicking the page and doing\n          '
								}
								<code>{'Reload Frame'}</code> if you are using
								some form of Stealth Mode.
								{'\n        '}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
