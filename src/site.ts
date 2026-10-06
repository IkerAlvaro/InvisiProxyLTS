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
	maskedTerms: string[];
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
export function ifSEO(text: string) {
	return values.usingSEO ? text : '';
}
export function ifDisguise(text: string) {
	return values.disguiseFiles ? text : '';
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
