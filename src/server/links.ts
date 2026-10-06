export type ExternalPages = Record<string, string | Record<string, string>> & {
	github: Record<string, string>;
};

export const externalPages: ExternalPages = {
	github: {
		default: 'https://github.com/QuiteAFancyEmerald/InvisiProxy',
		aos: 'https://github.com/michalsnik/aos',
		'bare-module': 'https://github.com/motortruck1221/bare-as-module3',
		fastify: 'https://github.com/fastify/fastify',
		'font-awesome': 'https://github.com/FortAwesome/Font-Awesome',
		libcurl: 'https://github.com/MercuryWorkshop/libcurl-transport',
		epoxy: 'https://github.com/MercuryWorkshop/epoxy-transport',
		'nord-theme': 'https://github.com/nordtheme',
		'proxy-transports':
			'https://github.com/MercuryWorkshop/proxy-transports',
		scramjet: 'https://github.com/MercuryWorkshop/scramjet',
		wisp: 'https://github.com/MercuryWorkshop/wisp-protocol',
	},
	codespaces: 'https://github.com/codespaces',
	'tor-project':
		'https://support.torproject.org/little-t-tor/getting-started/installing/',
	patreon: 'https://www.patreon.com/invisiproxy',
	kofi: 'https://ko-fi.com/quiteafancyemerald',
	truffled: 'https://truffled.lol',
	freedomproject: 'https://nullatenus.com',
	wispurr: 'https://github.com/sylvieisnton/wispurr',
};
