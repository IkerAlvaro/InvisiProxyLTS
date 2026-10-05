import { Cooking, route } from '../document-helpers.tsx';
import AntiExfil from '../components/AntiExfil.tsx';
import Footer from '../components/Footer.tsx';

export default function NotFound() {
	return (
		<>
			<Cooking />
			<AntiExfil />
			<div id={'background'} class={'fullwidth'}></div>
			<Cooking />
			<div id={'mainbody'} class={'fullwidth'}>
				<div class={'box-error text-center'}>
					<h1>Site Error!</h1>
					<h2>
						{'\n          '}
						Reload the page or do Ctrl+R!!! This fixes a lot of
						issues
						{'\n        '}
					</h2>
					<h2>
						{'\n          '}
						The proxy connection is unavailable.... reloading the
						page will resolve this issue.
						{'\n        '}
					</h2>
					<p>
						{'\n          '}
						Might be doing some maintenance or the web server is
						down.
						{'\n        '}
					</p>
					<p>In that case wait a bit until it is resolved!</p>
					<br />
					<p>
						{'\n          Invalid URL? View the\n          '}
						<a href={route('/questions')} class={'bluelink'}>
							{'FAQ page'}
						</a>
						{' for\n          help!\n        '}
					</p>
				</div>
			</div>
			<div id={'footer'} class={'fullwidth'}>
				<Footer />
			</div>
			<Cooking />
		</>
	);
}
