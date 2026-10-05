export interface SiteValues {
	development?: boolean;
	usingSEO: boolean;
	showSplash: boolean;
	disguiseFiles: boolean;
	inlineAssets: boolean;
	basePath: string;
	aliases: Record<string, string>;
	cacheBust: Record<string, string>;
	version: string;
	cacheKey: number;
	storageNamespace: string;
	labels: Record<string, string>;
	defaultSearch: string;
	splash: string[];
	cookingText: string[];
	cookingFacts: string[];
	characters: string[];
	textMasks: Record<string, string[]>;
	delimiter: string;
	errors: Record<string, { beforeScript: string; afterScript: string }>;
	readAsset?: (path: string) => string | undefined;
}

export let values: SiteValues;
export function setSiteValues(next: SiteValues) {
	values = next;
}
export function randomItem<T>(items: readonly T[]): T {
	return items[Math.floor(Math.random() * items.length)];
}
export function route(path: string, conditional?: 'inline'): string {
	const endPoint = /((?<![^/])github\/)?[^/]+$/;
	if (conditional === 'inline' && values.inlineAssets)
		return path.replace(
			endPoint,
			(name) =>
				values.cacheBust[name] ||
				values.aliases[`files/${name}`] ||
				name
		);
	return path
		.replace(endPoint, (name, ancestor) =>
			ancestor
				? values.aliases[name] || name
				: values.aliases[`files/${name}`] ||
					values.cacheBust[name] ||
					values.aliases[name] ||
					name
		)
		.replace(
			/[^/]+(?=\/)/g,
			(part) =>
				values.aliases[`prefixes/${part}`] ||
				values.aliases[part] ||
				part
		)
		.replace(/^~?\/+|^~$|^(?!\.\/)/, values.basePath);
}
const maskRules = new WeakMap<
	SiteValues['textMasks'],
	{
		terms: string[];
		pattern: RegExp;
	}
>();

export function maskText(text: string): string {
	if (values.usingSEO) return text;
	let rules = maskRules.get(values.textMasks);
	if (!rules) {
		const terms = Object.keys(values.textMasks).sort(
			(a, b) => b.length - a.length
		);
		const escaped = terms.map((term) =>
			term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		);
		rules = {
			terms,
			pattern: new RegExp(escaped.join('|') || '(?!)', 'gi'),
		};
		maskRules.set(values.textMasks, rules);
	}
	const { terms, pattern } = rules;
	const masked = text.replace(pattern, (term) => {
		const original = terms.find(
			(key) => key.toLowerCase() === term.toLowerCase()
		);
		if (!original) return term;
		const parts = original.match(/[A-Z]?[^A-Z]+|[A-Z]/g) || [];
		const capitals = parts.map((part) => {
			const letter = term[0];
			term = term.slice(part.length);
			return letter;
		});
		return randomItem(values.textMasks[original])
			.replace(
				/[A-Z]?[^A-Z]+|[A-Z]/g,
				(word) => capitals.shift() + word.slice(1)
			)
			.replaceAll(values.delimiter, () => randomItem(values.characters));
	});
	const result = masked.replace(/\S+/g, (term) =>
		/&#\d+;|&#x[A-z\d]+;|&[A-z]+;/.test(term)
			? term
			: term.replace(/(?<=[AEIOUYaeiouy])(?!$)/g, () =>
					randomItem(values.characters)
				)
	);
	return result
		.replace(/&#173;|&shy;/g, '\u00ad')
		.replace(/&#8203;/g, '\u200b');
}
export function ifSEO(text: string) {
	return values.usingSEO ? text : '';
}
export function ifDisguise(text: string) {
	return values.disguiseFiles ? text : '';
}
export function getSplash() {
	return maskText(randomItem(values.splash));
}
export function renderProxyError(kind: 'scramjet', scriptUrl: string) {
	const parts = values.errors[kind];
	if (!parts) throw new Error(`Missing ${kind} error document`);
	const escaped = scriptUrl
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;');
	return parts.beforeScript + escaped + parts.afterScript;
}
export function inlineHtml(html: string): string {
	const readAsset = values.readAsset;
	if (!values.inlineAssets || !readAsset) return html;
	return html.replace(
		/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*><\/script>|<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi,
		(
			element,
			scriptPath: string | undefined,
			stylePath: string | undefined
		) => {
			if (stylePath && !/\brel=["']stylesheet["']/i.test(element))
				return element;
			const path = scriptPath || stylePath;
			if (!path) return element;
			if (/^(?:https?:)?\/\//.test(path)) return element;
			const content = readAsset(path);
			if (content === undefined) return element;
			if (stylePath) return `<style>${content.trim()}</style>`;
			const attributes = element
				.slice('<script'.length, element.indexOf('>'))
				.replace(/\s*src=["'][^"']+["']/i, '');
			return `<script${attributes}>${content.trim().replace(/<\/script/gi, '<\\/script')}</script>`;
		}
	);
}
