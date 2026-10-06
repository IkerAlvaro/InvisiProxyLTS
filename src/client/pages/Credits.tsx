import { Cooking, Inline, route } from '../document-helpers.tsx';
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
			<div id="mainbody" class="box-hero">
				<Cooking />
				<div id="credits" class="hero-grid-container">
					<div class="box-hero">
						<div class="box-noflex">
							<h1 class="bigtitle">Credits</h1>
							<h2>What is InvisiProxy?</h2>
							<p>
								InvisiProxy LTS is an official web proxy service
								can bypass web filters regardless of whether it
								is an extension or network-based.
								<br />
								This project allows you to access content
								otherwise blocked by governments, schools, or
								workplaces.
							</p>
							<div>
								<h3>Main Developers</h3>
								<table class="documentation-table">
									<thead>
										<tr>
											<th scope="col">Name</th>
											<th scope="col">Contributions</th>
											<th scope="col">
												Notes and Contact Info
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<strong>
													Quite A Fancy Emerald
												</strong>
											</td>
											<td>Creator and Owner</td>
											<td>
												<a
													href="https://github.com/QuiteAFancyEmerald"
													target="_blank"
													rel="noopener noreferrer"
												>
													@quiteafancyemerald
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>YOCTDONALD'S</strong>
											</td>
											<td>Co-Owner, Main Contributor</td>
											<td>
												<a
													href="https://github.com/yoct1"
													target="_blank"
													rel="noopener noreferrer"
												>
													@yoct
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>
													OlyB/BinBashBanana
												</strong>
											</td>
											<td>Co-Owner, Main Contributor</td>
											<td>
												<a
													href="https://github.com/BinBashBanana"
													target="_blank"
													rel="noopener noreferrer"
												>
													@olyb / @binbashbanana
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>Sylvia</strong>
											</td>
											<td>
												Co-Owner, Main Contributor,
												English to French
											</td>
											<td>
												<a
													href="https://sylvieon.dev"
													target="_blank"
													rel="noopener noreferrer"
												>
													@sylvieisnton
												</a>
											</td>
										</tr>
									</tbody>
								</table>
								<h3>Contributors</h3>
								<table class="documentation-table">
									<thead>
										<tr>
											<th scope="col">Name</th>
											<th scope="col">Contributions</th>
											<th scope="col">
												Notes and Contact Info
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<strong>MUATEX</strong>
											</td>
											<td>Designer for Logo/Branding</td>
											<td>
												<a
													href="https://www.muatex.com"
													target="_blank"
													rel="noopener noreferrer"
												>
													@muatex
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>Kinglalu</strong>
											</td>
											<td>Games Page, Developer</td>
											<td>
												<a
													href="https://github.com/kinglalu"
													target="_blank"
													rel="noopener noreferrer"
												>
													@kinglalu
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>MotorTruck1221</strong>
											</td>
											<td>
												Massive Contributor, Fastify
												Rewrite, Mercury Workshop,
												Developer
											</td>
											<td>
												<a
													href="https://github.com/MotorTruck1221"
													target="_blank"
													rel="noopener noreferrer"
												>
													@motortruck1221
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>percs</strong>
											</td>
											<td>
												Scramjet, Wisp, Mercury
												Workshop, Developer
											</td>
											<td>
												<a
													href="https://github.com/percslol"
													target="_blank"
													rel="noopener noreferrer"
												>
													@percslol
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>velzie</strong>
											</td>
											<td>
												Scramjet, Mercury Workshop,
												Developer
											</td>
											<td>
												<a
													href="https://github.com/velzie"
													target="_blank"
													rel="noopener noreferrer"
												>
													@velzie
												</a>
											</td>
										</tr>
										<tr>
											<td>
												<strong>b4kt</strong>
											</td>
											<td>
												The Freedom Project (Former Hard
												Fork)
											</td>
											<td>
												<a
													href="https://discord.gg/jMm65ktMCz"
													target="_blank"
													rel="noopener noreferrer"
												>
													The Freedom Project Discord
												</a>
											</td>
										</tr>
									</tbody>
								</table>
								<h3>Translators</h3>
								<table class="documentation-table">
									<thead>
										<tr>
											<th scope="col">Name</th>
											<th scope="col">Contributions</th>
											<th scope="col">
												Notes and Contact Info
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<strong>Manjit</strong>
											</td>
											<td>English to Italian</td>
											<td>
												<a
													href="https://manjit.dev"
													target="_blank"
													rel="noopener noreferrer"
												>
													@manjit
												</a>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="text-center">
									<div class="image-container-hero">
										<img
											class="potato"
											src={route(
												'/assets/img/potato.png'
											)}
											alt="icon"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="footer" class="fullwidth">
				<Footer />
			</div>
			<Cooking />
			<Inline>
				<script src={route('assets/js/card.js', 'inline')} />
			</Inline>
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
