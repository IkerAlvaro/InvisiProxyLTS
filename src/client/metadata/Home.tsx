import { SEO, Inline, route, values } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function HomeMetadata() {
	return (
		<>
			<meta http-equiv={'x-ua-compatible'} content={'IE=edge'} />
			<meta name={'version'} content={values.version} />
			<SEO>
				<meta name={'googlebot'} content={'index, follow, snippet'} />
				<meta
					name={'robots'}
					content={
						'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
					}
				/>
				<meta name={'author'} content={'TitaniumNetwork'} />
				<meta name={'application-name'} content={'InvisiProxy LTS'} />
				<link rel={'canonical'} href={'https://invisiproxy.com/'} />
			</SEO>
			<title>
				InvisiProxy LTS | Free Web Proxy - Bypass Filters &amp; Access
				Blocked Sites
			</title>
			<SEO>
				<meta
					name={'description'}
					content={
						'InvisiProxy LTS is a cutting-edge web proxy service designed to bypass web filters and blockers. Whether dealing with client-side or network-based censorship, InvisiProxy LTS provides seamless access to blocked sites and secure, private browsing on devices like Chromebooks. Overcome content blockers, Chrome extensions, firewalls, and more with our advanced proxy solution.'
					}
				/>
				<meta
					name={'keywords'}
					content={
						'web proxy, free web proxy, proxy web browser, proxy web, proxy web page, proxy for web, secure proxy, unblock websites, free proxy, bypass censorship, unblock Chromebook, proxy service, online security, private browsing, unblock social media, access blocked content, TitaniumNetwork, proxy server, internet freedom, unblock at school, unblock at work'
					}
				/>
				<meta property={'og:site_name'} content={'InvisiProxy LTS'} />
				<meta
					property={'og:url'}
					content={'https://invisiproxy.com/'}
				/>
				<meta
					property={'og:title'}
					content={
						'InvisiProxy LTS | Free Web Proxy - Bypass Filters & Access Blocked Sites'
					}
				/>
				<meta property={'og:type'} content={'website'} />
				<meta
					property={'og:description'}
					content={
						'InvisiProxy LTS is a top-tier web proxy service that bypasses network and browser restrictions to access blocked websites securely. Enjoy a seamless browsing experience with robust security and advanced features.'
					}
				/>
			</SEO>
			<meta
				property={'og:image'}
				content={route('assets/img/hero.webp')}
			/>
			<meta
				property={'og:image:secure_url'}
				content={route('assets/img/hero.webp')}
			/>
			<SEO>
				<meta property={'og:image:alt'} content={'InvisiProxy Logo'} />
				<meta property={'og:locale'} content={'en_US'} />
				<meta name={'twitter:card'} content={'summary_large_image'} />
				<meta name={'twitter:site'} content={'@titaniumnetdev'} />
				<meta name={'twitter:creator'} content={'@titaniumnetdev'} />
				<meta
					name={'twitter:title'}
					content={
						'InvisiProxy LTS | Free Web Proxy - Bypass Filters & Access Blocked Sites'
					}
				/>
				<meta
					name={'twitter:description'}
					content={
						'Discover InvisiProxy LTS, a premier web proxy service that bypasses censorship and filters to provide secure access to blocked websites. Ideal for private browsing and overcoming network restrictions on devices like Chromebooks.'
					}
				/>
				<meta
					name={'twitter:image'}
					content={route('assets/img/hero.webp')}
				/>
				<meta name={'twitter:image:alt'} content={'InvisiProxy Icon'} />
			</SEO>
			<meta name={'msapplication-TileColor'} content={'#b4213b'} />
			<meta
				name={'msapplication-TileImage'}
				content={route('assets/ico/ms-icon-144x144.png')}
			/>
			<meta name={'apple-mobile-web-app-capable'} content={'yes'} />
			<meta
				name={'apple-mobile-web-app-status-bar-style'}
				content={'black-translucent'}
			/>
			<SEO>
				<meta
					name={'apple-mobile-web-app-title'}
					content={'InvisiProxy LTS'}
				/>
			</SEO>
			<HeadContent />
			<script
				src={
					'https://unpkg.com/tsparticles@3.8.1/tsparticles.bundle.min.js'
				}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<script
				src={'https://unpkg.com/aos@next/dist/aos.js'}
				defer={true}
				data-module={''}
				innerHTML={''}
			/>
			<Inline>
				<script
					src={route('assets/js/csel.js', 'inline')}
					defer={true}
					innerHTML={''}
				/>
				<script
					src={route('assets/js/common.js', 'inline')}
					defer={true}
					innerHTML={''}
				/>
			</Inline>
			<link rel={'mask-icon'} href={route('new.svg')} color={'#b4213b'} />
			<link rel={'manifest'} href={route('manifest.json')} />
			<link
				rel={'stylesheet'}
				href={'https://unpkg.com/aos@next/dist/aos.css'}
			/>
			<meta name={'mobile-web-app-capable'} content={'yes'} />
			<SEO>
				<script
					type={'application/ld+json'}
					innerHTML={
						'\n      {\n        "@context": "https://schema.org",\n        "@type": "Organization",\n        "name": "InvisiProxy LTS",\n        "alternateName": "InvisiProxy (TitaniumNetwork)",\n        "url": "https://invisiproxy.com",\n        "logo": "https://invisiproxy.com/assets/img/logo_github.png",\n        "sameAs": [\n          "https://github.com/QuiteAFancyEmerald/InvisiProxy",\n          "https://github.com/titaniumnetwork-dev",\n          "https://twitter.com/titaniumnetdev",\n          "https://www.youtube.com/channel/UC6LaREFvs9L72SK1s2PcxNg"\n        ],\n        "description": "InvisiProxy is an advanced web proxy service designed to bypass network censorship and filters, providing a secure and private browsing experience. It supports a wide range of websites, including YouTube, and receives frequent updates to ensure optimal performance.",\n        "founder": {\n          "@type": "Person",\n          "name": "Quite A Fancy Emerald"\n        },\n        "foundingDate": "2020",\n        "contactPoint": {\n          "@type": "ContactPoint",\n          "contactType": "Customer Support",\n          "email": "8xz62b0ce@mozmail.com",\n          "url": "https://invisiproxy.com/credits"\n        }\n      }\n    '
					}
				/>
				<script
					type={'application/ld+json'}
					innerHTML={
						'\n      {\n        "@context": "https://schema.org",\n        "@type": "FAQPage",\n        "mainEntity": [\n          {\n            "@type": "Question",\n            "name": "What is InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy is a free and secure web proxy service designed to bypass web filters and blockers. It supports numerous sites, emphasizing detailed design, mechanics, and advanced features to provide a seamless browsing experience."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "How do I unblock websites at school using InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "To unblock websites at school, use InvisiProxy, a free web proxy service that is frequently updated. If a site gets blocked, join the TitaniumNetwork Discord to request a new site. Monthly restocks help prevent mass blocking."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "What websites can I access with InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy allows access to a wide variety of websites, including popular sites like Discord, Spotify, YouTube, and many game sites."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "Is InvisiProxy safe to use?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "Absolutely! InvisiProxy ensures a safe browsing experience by not collecting or logging any user data. Refer to our Privacy Policy for more details. Additionally, InvisiProxy is open-source, ensuring full transparency."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "Does InvisiProxy hide my search history?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "Yes, InvisiProxy hides your search history. You can customize your tab appearance via Settings > Tab Cloak and use Stealth mode for private browsing."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "How can I get more InvisiProxy sites?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "Join the TitaniumNetwork Discord at discord.gg/unblock and type \\"/proxy\\" in our bots channel to receive a new site via DMs from our bot."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "Is InvisiProxy open-source?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "Yes, InvisiProxy is open-source. Visit our GitHub to deploy or host your own instance of InvisiProxy, ensuring maximum privacy control."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "How fast and advanced is InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy is a fast and highly advanced web proxy service, featuring CAPTCHA integration, TOR browsing, customizable blacklist settings, leak prevention mechanisms, robust security measures, and extensive site compatibility via Ultraviolet + Wisp."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "Can I self-host InvisiProxy for better privacy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "Yes, you can easily fork the InvisiProxy repository and self-host it for maximum privacy control, ensuring no user data is collected."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "What makes InvisiProxy different from other web proxy services?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy stands out with its transparency and privacy control, collecting no user data. It leverages custom source randomization and projects like Epoxy, Wisp, and Scramjet to effectively bypass web and network filters."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "What design principles does InvisiProxy follow?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy uses the Nord Theme for its optimal design color palette, prioritizing readable code syntax and user-friendly UI components."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "How do I start using InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "Head to the Web Proxies page and select one of the featured proxies. Then, type the site you wish to access in the search box. Each web proxy has its own level of effectiveness, speed, and security. Scramjet is highly recommended for the best experience."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "What pre-linked applications does InvisiProxy feature?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy features a collection of pre-linked applications, including YouTube, Spotify, Webretro (an online everything emulator), Ruffle.fs (Adobe Flash Emulator), and an expansive library for each respective app."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "How do I deploy InvisiProxy on my own server?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy is designed to be easy to deploy and use on personal setups or production loads. Detailed guides can be found at the official GitHub repository and TitaniumNetwork Docs."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "Where is the default proxy location when starting InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "The default place for the proxy when started is http://localhost:8080. You can change this setting if needed in config.json. This website is hosted locally with Scramjet and Ultraviolet built-in."\n            }\n          },\n          {\n            "@type": "Question",\n            "name": "How can I contribute to InvisiProxy?",\n            "acceptedAnswer": {\n              "@type": "Answer",\n              "text": "InvisiProxy thrives thanks to its contributors. You can get involved in various ways, including design, core development, applications, documentation, and testing and QA. Visit our GitHub repository and join our Discord server to get started."\n            }\n          }\n        ]\n      }\n    '
					}
				/>
			</SEO>
		</>
	);
}
