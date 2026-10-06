import { Cooking, Inline, route } from '../document-helpers.tsx';
import {
	ParticlesScript,
	PageScripts,
	PageDescription,
} from '../components/HeadScripts.tsx';
import HeadContent from '../components/HeadContent.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import FAQ from '../components/FAQ.tsx';
import Footer from '../components/Footer.tsx';

export default function FAQPage() {
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
				<div id="documentation" class="hero-grid-container">
					<div class="box-hero">
						<div class="box-noflex">
							<FAQ />
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
			<title>InvisiProxy LTS | FAQ</title>
			<PageDescription />
			<HeadContent />
			<ParticlesScript />
			<PageScripts />
		</>
	);
}
