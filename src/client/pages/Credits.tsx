import { Cooking, route } from '../document-helpers.tsx';
import {
	ParticlesScript,
	PageScripts,
	PageDescription,
} from '../components/HeadScripts.tsx';
import HeadContent from '../components/HeadContent.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function Credits() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id="header" class="fullwidth">
				<Header />
			</div>
			<div id="background" class="fullwidth"></div>
			<Cooking />
			<div id="mainbody" class="fullwidth">
				<Cooking />
				<div class="box-clear box-credits text-center textm">
					<h1 class="bigtitle">Credits</h1>
					<p>
						{'Contact information can be viewed '}
						<a href="/?t" aria-label="View contact information">
							here.
						</a>
					</p>
					<h2>What is InvisiProxy?</h2>
					<p>
						InvisiProxy LTS is an official web proxy service can
						bypass web filters regardless of whether it is an
						extension or network-based.
						<br />
						This project allows you to access content otherwise
						blocked by governments, schools, or workplaces.
					</p>
					<h2>What is TitaniumNetwork about?</h2>
					<p>
						TitaniumNetwork is an organization dedicated to
						providing private internet access by bypassing the
						over-restrictive filters employed by institutions like
						schools or workplaces. Services for a less restrictive
						web experience, built with a focus on access, privacy,
						and practical deployment.
					</p>
					<div>
						<h3>Main Developers:</h3>
						<ul class="binside">
							<li>
								Quite A Fancy Emerald (Creator and Owner,
								Mercury Workshop, Discord: @quiteafancyemerald)
							</li>
							<li>
								YOCTDONALD'S (Co-Owner, v6+, Main Contributor,
								"HU no-lifer", Obfuscated Bughunter Legend,
								Discord: @yoct.)
							</li>
							<li>
								OlyB/BinBashBanana (Co-Owner, Main Contributor,
								v5 rewrite, Tab Cloak, Mercury Workshop webretro
								dev, NGINX suffering, Discord: OlyB#9420)
							</li>
							<li>
								Sylvia (Co-Owner, Main Contributor, wispurr,
								TODO squasher, Discord: @sylvieisnton,
								https://github.com/sylvieisnton/wispurr)
							</li>
						</ul>
						<h3>Contributors and Notable Mentions:</h3>
						<ul class="binside">
							<li>
								b4kt (The Freedom Project (Former Hard Fork),
								https://discord.gg/jMm65ktMCz)
							</li>
							<li>
								MUATEX (Designer for Logo/Branding,
								https://www.muatex.com)
							</li>
							<li>
								ProgrammerIn-wonderland (Mercury Workshop,
								Developer)
							</li>
							<li>Kinglalu (Games Page, Developer)</li>
							<li>
								MotorTruck1221 (Massive Contributor, Fastify
								Rewrite, Mercury Workshop, Developer)
							</li>
							<li>
								percs (Scramjet, Wisp, Mercury Workshop,
								Developer)
							</li>
							<li>
								velzie (Scramjet, Mercury Workshop, Developer)
							</li>
							<li>scaratek (Contributor, Refactor Support)</li>
							<li>
								MikeLime (Old Co-Owner of TitaniumNetwork
								&amp;amp; Mass Proxy Site Maker, Web Developer,
								and Software Developer)
							</li>
							<li>SexyDuceDuce (Proxy and Web Developer)</li>
							<li>Divide (Chatbox, Proxy/Web Developer)</li>
							<li>LQ16 (Creator of TN, Retired)</li>
							<li>
								Shirt (Old Co-Owner of TN, Everything Developer
								And King Of Pokemon)
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
						<h3>Translators:</h3>
						<ul class="binside">
							<li>
								Manjit (English to Italian, Website:
								https://manjit.dev, Discord: @mnjt, GitHub:
								@manjit73)
							</li>
						</ul>
						<p>
							And everyone else inside TitaniumNetwork, the
							various testers and of course Mercury Workshop. Also
							a certain Michael :D
						</p>
						<div class="text-center">
							<div class="image-container-hero">
								<img
									class="potato"
									src={route('/assets/img/potato.png')}
									alt="icon"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="footer" class="fullwidth">
				<Footer />
			</div>
			<Cooking />
		</>
	);
}

export function Head() {
	return (
		<>
			<title>InvisiProxy LTS | Credits</title>
			<PageDescription />
			<HeadContent />
			<ParticlesScript />
			<PageScripts common={false} />
		</>
	);
}
