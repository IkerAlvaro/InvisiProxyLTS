import { Cooking } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Terms from '../components/Terms.tsx';
import Footer from '../components/Footer.tsx';

export default function Privacy() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id={'header'} class={'fullwidth'}>
				<Header />
			</div>
			<div id={'background'} class={'fullwidth'}></div>
			<Cooking />
			<div id={'mainbody'} class={'box-hero'}>
				<div id={'documentation'} class={'hero-grid-container'}>
					<div class={'box-hero'}>
						<div class={'box-noflex'}>
							<Terms />
						</div>
					</div>
				</div>
			</div>
			<Cooking />
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
		</>
	);
}
