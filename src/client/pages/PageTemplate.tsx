import { Cooking } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function PageTemplate() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id={'header'} class={'fullwidth'}>
				<Header />
			</div>
			<div id={'background'} class={'fullwidth'}></div>
			<div id={'mainbody'} class={'fullwidth'}>
				<div class={'box text-center'}></div>
			</div>
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
		</>
	);
}
