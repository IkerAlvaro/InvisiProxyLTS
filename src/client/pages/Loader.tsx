import { Cooking, Inline, route } from '../document-helpers.tsx';

export default function Loader() {
	return (
		<>
			<Cooking />
			<Cooking />
			<Cooking />
			<Cooking />
			<Inline>
				<script src={route('assets/js/loader.js', 'inline')} />
			</Inline>
			<Cooking />
			<Cooking />
		</>
	);
}
