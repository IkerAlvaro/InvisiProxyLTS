import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium, type Browser } from 'playwright';
const load = <T>(path: string): Promise<T> =>
	import(pathToFileURL(join(process.cwd(), path)).href);
const { createSiteApp } =
	await load<typeof import('../../src/app.ts')>('src/app.ts');
const { config, pages, serverUrl, getAltPrefix } =
	await load<typeof import('../../src/site-config.ts')>('src/site-config.ts');
const app = createSiteApp();
let browser: Browser | undefined;
try {
	await app.listen({ host: '127.0.0.1', port: 0 });
	const address = app.server.address();
	assert.ok(address && typeof address !== 'string');
	const origin = `http://127.0.0.1:${address.port}`;
	const base = origin + serverUrl.pathname;
	const route = (file: string) =>
		base + Object.keys(pages).find((key) => pages[key] === file);
	browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
	const context = await browser.newContext({ serviceWorkers: 'block' });
	await context.route('**/*', (request) =>
		new URL(request.request().url()).origin === origin
			? request.continue()
			: request.fulfill({
					status: 200,
					contentType: 'application/javascript',
					body: '',
				})
	);
	await context.addInitScript(() => {
		Object.assign(window, {
			AOS: { init() {}, refresh() {} },
			tippy: () => [],
			loadFull: async () => {},
			tsParticles: { load: async () => ({ destroy() {} }) },
		});
	});
	const page = await context.newPage();
	page.setDefaultTimeout(10000);
	if (config.disguiseFiles) {
		await page.goto(route('pages/nav/partners.html'));
		await page.getByText('403 Forbidden').waitFor();
		await page.goto(`${base}login`);
		await page.waitForURL(
			(url) => url.pathname === `${serverUrl.pathname}index`
		);
	}
	await page.goto(route('pages/nav/partners.html'));
	const button = page.locator('#dispense-link');
	await button.waitFor({ state: 'visible' });
	assert.equal(
		await button.getAttribute('data-endpoint'),
		`${serverUrl.pathname}api/link`
	);
	const styles = await page.evaluate(() =>
		['dispense-link', 'pr-trl'].map((id) => {
			const element = document.getElementById(id);
			if (!element) throw new Error(`Missing button: ${id}`);
			const css = getComputedStyle(element);
			return [css.backgroundColor];
		})
	);
	assert.deepEqual(
		styles[0],
		styles[1],
		'dispenser uses site button background'
	);
	assert.match(
		(await button.getAttribute('class')) ?? '',
		/fancybutton glowbutton/
	);
	assert.equal(
		await button.evaluate((el) => getComputedStyle(el).borderRadius),
		'8px'
	);
	await button.click();
	await page.waitForFunction(
		() =>
			document.querySelector<HTMLAnchorElement>('#dispensed-link')
				?.hidden === false
	);
	assert.ok(
		['https://first.example/', 'https://second.example/'].includes(
			(await page.locator('#dispensed-link').getAttribute('href')) ?? ''
		)
	);
	assert.equal(
		await page.locator('#dispensed-link').getAttribute('rel'),
		'noopener noreferrer'
	);
	await button.click();
	await page.waitForFunction(
		() =>
			document.querySelector<HTMLButtonElement>('#dispense-link')
				?.disabled === false
	);
	assert.equal(
		await page.locator('#dispensed-link').getAttribute('href'),
		null
	);
	assert.equal(
		await page
			.locator('#dispensed-link')
			.evaluate((el) => (el as HTMLAnchorElement).hidden),
		true
	);
	assert.match(
		(await page.locator('#dispenser-status').textContent()) ?? '',
		/wait|try again/i
	);
	for (const data of [
		{ error: 'Mirrors are unavailable.' },
		{ link: 'javascript:alert(1)' },
	]) {
		await page.route('**/api/link', (request) =>
			request.fulfill({ status: data.error ? 503 : 200, json: data })
		);
		await button.click();
		await page.waitForFunction(
			() =>
				document.querySelector<HTMLButtonElement>('#dispense-link')
					?.disabled === false
		);
		assert.equal(
			await page.locator('#dispensed-link').getAttribute('href'),
			null
		);
		assert.ok(await page.locator('#dispenser-status').textContent());
		await page.unroute('**/api/link');
	}
	const pending: { release?: () => void } = {};
	await page.route('**/api/link', async (request) => {
		await new Promise<void>((resolve) => {
			pending.release = resolve;
		});
		await request.fulfill({ json: { link: 'https://pending.example/' } });
	});
	await button.click();
	await page.waitForFunction(
		() =>
			document.querySelector<HTMLButtonElement>('#dispense-link')
				?.disabled === true
	);
	assert.ok(pending.release);
	pending.release();
	await page.waitForFunction(
		() =>
			document.querySelector<HTMLButtonElement>('#dispense-link')
				?.disabled === false
	);
	await page.unroute('**/api/link');

	await page.goto(route('faq.html'));
	const search = page.getByRole('searchbox', {
		name: 'Search frequently asked questions',
	});
	await search.waitFor();
	const entries = page.locator('#faqs > div');
	const total = await entries.count();
	assert.ok(total > 5);
	await search.fill('  DiS\u200bCoRd  ');
	await page.waitForFunction(
		() =>
			[...document.querySelectorAll<HTMLElement>('#faqs > div')].filter(
				(el) => el.style.display !== 'none'
			).length === 1
	);
	await search.fill('no-match-for-this-query');
	await page.waitForFunction(() =>
		[...document.querySelectorAll<HTMLElement>('#faqs > div')].every(
			(el) => el.style.display === 'none'
		)
	);
	await search.fill('');
	await page.waitForFunction(() =>
		[...document.querySelectorAll<HTMLElement>('#faqs > div')].every(
			(el) => el.style.display !== 'none'
		)
	);

	await page.evaluate(() => {
		const form = document.querySelector<HTMLFormElement>('#titleform');
		if (!form) throw new Error('Missing title form');
		(form.firstElementChild as HTMLInputElement).value = 'Test tab title';
		form.requestSubmit();
	});
	await page.waitForFunction(() => document.title === 'Test tab title');
	await page.reload();
	await page.waitForFunction(() => document.title === 'Test tab title');
	await search.waitFor();
	await search.fill('discord');
	await page.waitForFunction(
		() =>
			[...document.querySelectorAll<HTMLElement>('#faqs > div')].filter(
				(el) => el.style.display !== 'none'
			).length === 1
	);

	for (const engine of ['ultraviolet', 'scramjet']) {
		await page.goto(route(`pages/proxnav/${engine}.html`));
		await page.locator('#search-input').waitFor();
		await page.waitForFunction((engine) => {
			const el =
				document.querySelector<HTMLInputElement>('#search-input');
			if (!el) throw new Error('Missing search input');
			el.value = 'https://ready.example/';
			el.dispatchEvent(
				new KeyboardEvent('keydown', {
					code: 'Validator Test',
					bubbles: true,
				})
			);
			return engine === 'scramjet'
				? el.value.startsWith('sj:')
				: el.value.startsWith(location.origin);
		}, engine);
		for (const [input, expected] of [
			['https://example.com/path?q=1', 'https://example.com/path?q=1'],
			['example.com', 'http://example.com/'],
			['two words & symbols', null],
		] as const) {
			const resolved = await page.evaluate((input) => {
				const el =
					document.querySelector<HTMLInputElement>('#search-input');
				if (!el) throw new Error('Missing search input');
				el.value = input;
				el.dispatchEvent(
					new KeyboardEvent('keydown', {
						code: 'Validator Test',
						bubbles: true,
					})
				);
				return el.value;
			}, input);
			let target: string;
			if (engine === 'scramjet') {
				assert.ok(resolved.startsWith('sj:'));
				target = resolved.slice(3);
			} else {
				const prefix =
					origin +
					getAltPrefix('uv', serverUrl.pathname) +
					'service/';
				assert.ok(resolved.startsWith(prefix), resolved);
				target = [...decodeURIComponent(resolved.slice(prefix.length))]
					.map((char, i) =>
						i % 2
							? String.fromCharCode(char.charCodeAt(0) ^ 2)
							: char
					)
					.join('');
			}
			if (expected) assert.equal(target, expected);
			else {
				assert.equal(new URL(target).protocol, 'https:');
				assert.ok(target.includes(encodeURIComponent(input)));
			}
		}
		await page.locator('#search-input').fill('https://example.com/');
		await page.locator('#search-input').press('Enter');
		await page.waitForURL(
			(url) =>
				url.pathname === new URL(route('pages/frame.html')).pathname
		);
		assert.ok(
			await page.evaluate(() =>
				Object.keys(localStorage).some(
					(key) =>
						key.endsWith('-frame-url') &&
						(localStorage[key].startsWith(
							'sj:https://example.com/'
						) ||
							localStorage[key].startsWith(location.origin))
				)
			)
		);
	}
	console.log(
		'Mirror success, cooldown, pending/error/unsafe responses, styling, loader, FAQ hydration persistent tab settings and proxy URL/navigation boundaries passed.'
	);
} finally {
	await browser?.close();
	await app.close();
}
