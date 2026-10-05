import { Cooking, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function Credits() {
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
				<Cooking />
				<div class={'box-clear box-credits text-center textm'}>
					<h1 class={'bigtitle'}>{'Credits'}</h1>
					<p>
						{'Contact information can be viewed '}
						<a href={'/?t'}>{'here.'}</a>
					</p>
					<h2>What is InvisiProxy?</h2>
					<p>
						{'\n          '} InvisiProxy LTS is an official web
						proxy service can bypass web filters regardless of
						whether it is an extension or network-based.
						<br />
						This project allows you to access content otherwise
						blocked by governments, schools, or workplaces.
						{'\n        '}
					</p>
					<h2>What is TitaniumNetwork about?</h2>
					<p>
						{'\n          '} TitaniumNetwork is an organization
						dedicated to providing private internet access by
						bypassing the over-restrictive filters employed by
						institutions like schools or workplaces. Services for a
						less restrictive web experience, built with a focus on
						access, privacy, and practical deployment.
						{'\n        '}
					</p>
					<div>
						<h3>{'Main Developers:'}</h3>
						<ul class={'binside'}>
							<li>
								{'\n              '} Quite A Fancy Emerald
								(Creator and Owner, Mercury Workshop, Discord:
								@quiteafancyemerald) {'\n            '}
							</li>
							<li>
								{'\n              '} YOCTDONALD'S (Co-Owner,
								v6+, Main Contributor, "HU no-lifer", Obfuscated
								Bughunter Legend, Discord: @yoct.){' '}
								{'\n            '}
							</li>
							<li>
								{'\n              '} OlyB/BinBashBanana
								(Co-Owner, Main Contributor, v5 rewrite, Tab
								Cloak, Mercury Workshop webretro dev, NGINX
								suffering, Discord: OlyB#9420){' '}
								{'\n            '}
							</li>
							<li>
								{'\n              '} Sylvia (Main Contributor,
								wispurr, TODO squasher, Discord: @sylvieisnton,
								https://github.com/sylvieisnton/wispurr){' '}
								{'\n            '}
							</li>
						</ul>
						<h3>{'Contributors and Notable Mentions:'}</h3>
						<ul class={'binside'}>
							<li>
								{'\n              '}
								b4kt (The Freedom Project (Former Hard Fork),
								https://discord.gg/jMm65ktMCz)
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								MUATEX (Designer for Logo/Branding,
								https://www.muatex.com)
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								ProgrammerIn-wonderland (Mercury Workshop,
								Developer)
								{'\n            '}
							</li>
							<li>Kinglalu (Games Page, Developer)</li>
							<li>
								{'\n              '}
								MotorTruck1221 (Massive Contributor, Fastify
								Rewrite, Mercury Workshop, Developer)
								{'\n            '}
							</li>
							<li>
								{'\n              '}
								percs (Scramjet, Wisp, Mercury
								Workshop, Developer)
								{'\n            '}
							</li>
							<li>
								velzie (Scramjet, Mercury Workshop, Developer)
							</li>
							<li>scaratek (Contributor, Refactor Support)</li>
							<li>
								{'\n              '} MikeLime (Old Co-Owner of
								TitaniumNetwork &amp;amp; Mass Proxy Site Maker,
								Web Developer, and Software Developer){' '}
								{'\n            '}
							</li>
							<li>SexyDuceDuce (Proxy and Web Developer)</li>
							<li>Divide (Chatbox, Proxy/Web Developer)</li>
							<li>LQ16 (Creator of TN, Retired)</li>
							<li>
								{'\n              '}
								Shirt (Old Co-Owner of TN, Everything Developer
								And King Of Pokemon)
								{'\n            '}
							</li>
							<li>Soup (Cat Lady) hehe</li>
							<li>aub (Owner of TitaniumNetwork)</li>
							<li>Binary Person (pretty pog)</li>
							<li>Pillow (Hosting Contributor, Developer)</li>
							<li>Navyyy</li>
							<li>luphoria (Mercury Workshop, Developer)</li>
							<li>trentwiles (Developer)</li>
							<li>Degen-dev (Developer)</li>
							<li>B3ATDROP3R</li>
							<li>Catolan</li>
							<li>Nautica (Reinin)</li>
							<li>LinuxTerm (Contributor)</li>
							<li>H (Not Speed)</li>
							<li>BananaVeyLover</li>
							<li>IronApple (The Apple Addict)</li>
						</ul>
						<h3>{'Translators:'}</h3>
						<ul class={'binside'}>
							<li>
								{'\n              '}
								Manjit (English to Italian, Website:
								https://manjit.dev, Discord: @mnjt, GitHub:
								@manjit73)
								{'\n            '}
							</li>
						</ul>
						<p>
							{'\n            '} And everyone else inside
							TitaniumNetwork, the various testers and of course
							Mercury Workshop. Also a certain Michael :D{' '}
							{'\n          '}
						</p>
						<div class={'text-center'}>
							<div class={'image-container-hero'}>
								<img
									class={'potato'}
									src={route('/assets/img/potato.png')}
									alt={'icon'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
		</>
	);
}
