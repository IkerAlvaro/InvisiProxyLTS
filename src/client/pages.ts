import { route } from './document-helpers.tsx';
import type { PageDefinition } from './types';
import PageTemplate from './pages/PageTemplate.tsx';
import PageTemplateMetadata from './metadata/PageTemplate.tsx';
import EntryPoint from './pages/EntryPoint.tsx';
import EntryPointMetadata from './metadata/EntryPoint.tsx';
import Loader from './pages/Loader.tsx';
import LoaderMetadata from './metadata/Loader.tsx';
import ScramjetError from './pages/ScramjetError.tsx';
import ScramjetErrorMetadata from './metadata/ScramjetError.tsx';
import Home from './pages/Home.tsx';
import HomeMetadata from './metadata/Home.tsx';
import DocumentationPage from './pages/DocumentationPage.tsx';
import DocumentationPageMetadata from './metadata/DocumentationPage.tsx';
import FAQPage from './pages/FAQPage.tsx';
import FAQPageMetadata from './metadata/FAQPage.tsx';
import NotFound from './pages/NotFound.tsx';
import NotFoundMetadata from './metadata/NotFound.tsx';
import ProxyFrame from './pages/ProxyFrame.tsx';
import ProxyFrameMetadata from './metadata/ProxyFrame.tsx';
import Credits from './pages/Credits.tsx';
import CreditsMetadata from './metadata/Credits.tsx';
import Privacy from './pages/Privacy.tsx';
import PrivacyMetadata from './metadata/Privacy.tsx';
import Partners from './pages/Partners.tsx';
import PartnersMetadata from './metadata/Partners.tsx';
import Icons from './pages/Icons.tsx';
import IconsMetadata from './metadata/Icons.tsx';
import Scramjet from './pages/Scramjet.tsx';
import ScramjetMetadata from './metadata/Scramjet.tsx';
import YouTube from './pages/YouTube.tsx';
import YouTubeMetadata from './metadata/YouTube.tsx';
import Applications from './pages/Applications.tsx';
import ApplicationsMetadata from './metadata/Applications.tsx';

export const pageDefinitions = {
	'pages/misc/template.html': {
		Page: PageTemplate,
		Head: PageTemplateMetadata,
	},
	'pages/misc/deobf/entry-point.html': {
		Page: EntryPoint,
		Head: EntryPointMetadata,
		bodyStyle: 'background-color: #0d1117',
	},
	'pages/misc/deobf/loader.html': {
		Page: Loader,
		Head: LoaderMetadata,
		bodyStyle: 'background-color: #0d1117',
	},
	'pages/proxnav/scramjet-error.html': {
		Page: ScramjetError,
		Head: ScramjetErrorMetadata,
	},
	'index.html': { Page: Home, Head: HomeMetadata, lang: 'en' },
	'docs.html': { Page: DocumentationPage, Head: DocumentationPageMetadata },
	'faq.html': {
		Page: FAQPage,
		Head: FAQPageMetadata,
		bodyScripts: [
			{
				get src() {
					return route('assets/js/faq-search.js');
				},
				defer: true,
			},
		],
	},
	'error.html': { Page: NotFound, Head: NotFoundMetadata },
	'pages/frame.html': { Page: ProxyFrame, Head: ProxyFrameMetadata },
	'pages/nav/credits.html': { Page: Credits, Head: CreditsMetadata },
	'pages/nav/privacy.html': { Page: Privacy, Head: PrivacyMetadata },
	'pages/nav/partners.html': { Page: Partners, Head: PartnersMetadata },
	'pages/nav/icons.html': { Page: Icons, Head: IconsMetadata },
	'pages/proxnav/scramjet.html': { Page: Scramjet, Head: ScramjetMetadata },
	'pages/proxnav/preset/youtube.html': {
		Page: YouTube,
		Head: YouTubeMetadata,
	},
	'pages/proxnav/preset/applications.html': {
		Page: Applications,
		Head: ApplicationsMetadata,
	},
} satisfies Record<string, PageDefinition>;
