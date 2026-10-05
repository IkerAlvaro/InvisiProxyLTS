import { Cooking, route, values } from '../document-helpers.tsx';

export default function EntryPoint() {
	return (
		<>
			<Cooking />
			<Cooking />
			<Cooking />
			<Cooking />
			<script
				innerHTML={`
      localStorage.setItem('${values.storageNamespace}-loader-key', navigator.userAgent);
      location.replace('${route('/index')}${values.development ? '' : `?cache=${values.cacheKey}`}');
    `}
			/>
			<Cooking />
			<Cooking />
		</>
	);
}
