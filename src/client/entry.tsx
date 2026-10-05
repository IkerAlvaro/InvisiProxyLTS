import { renderToString } from 'solid-js/web';
import { setSiteValues, type SiteValues } from '../site-values.ts';
import Bookmarks from './components/Bookmarks.tsx';
import Document from './Document.tsx';
import { pageDefinitions } from './pages.ts';
import { maskDocument } from './mask-document.ts';

export function renderDocuments(context: SiteValues) {
	setSiteValues(context);
	const documents = Object.fromEntries(
		Object.entries(pageDefinitions).map(([path, definition]) => [
			path,
			maskDocument(
				'<!doctype html>\n' +
					renderToString(() => <Document {...definition} />)
			),
		])
	);
	documents['pages/misc/deobf/bookmarks.html'] = maskDocument(
		renderToString(() => <Bookmarks />)
	);
	return documents;
}
