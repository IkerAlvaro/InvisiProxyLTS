import { createHash } from 'node:crypto';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { minify } from 'html-minifier-terser';
import { parse, type DefaultTreeAdapterTypes } from 'parse5';
import type { Plugin } from 'vite';
import {
	classNames,
	rewriteClasses,
	rewriteClassReferences,
	rewriteStylesheet,
} from './class-obfuscation.ts';

const marker = '/* InvisiProxy obfuscated */';

export function obfuscateScript(source: string, name: string): string {
	if (!source.trim() || source.trimStart().startsWith(marker)) return source;
	const prefix = createHash('sha256').update(name).digest('hex').slice(0, 12);
	return (
		marker +
		JavaScriptObfuscator.obfuscate(rewriteClassReferences(source, name), {
			compact: true,
			identifierNamesGenerator: 'hexadecimal',
			identifiersPrefix: `_${prefix}_`,
			renameGlobals: true,
			renameProperties: false,
			transformObjectKeys: true,
			stringArray: true,
			stringArrayThreshold: 1,
			stringArrayEncoding: ['base64'],
			stringArrayCallsTransform: true,
			splitStrings: true,
			splitStringsChunkLength: 8,
			numbersToExpressions: true,
			unicodeEscapeSequence: true,
			seed: 1,
			sourceMap: false,
			target: 'browser-no-eval',
			controlFlowFlattening: false,
			deadCodeInjection: false,
			debugProtection: false,
			selfDefending: false,
		}).getObfuscatedCode()
	);
}

export function browserObfuscationPlugin(): Plugin {
	return {
		name: 'invisiproxy-obfuscation',
		apply: 'build',
		enforce: 'post',
		generateBundle(_options, bundle) {
			if (process.env.INVISIPROXY_VITE_DEV === '1') return;
			for (const output of Object.values(bundle)) {
				if (output.type === 'chunk') {
					output.code = obfuscateScript(output.code, output.fileName);
					output.map = null;
				}
			}
		},
	};
}

export async function obfuscateDocument(html: string, name: string) {
	if (process.env.INVISIPROXY_VITE_DEV === '1') return html;
	const edits: { start: number; end: number; source: string }[] = [];
	const names = classNames();
	function visit(node: DefaultTreeAdapterTypes.Node) {
		if ('tagName' in node) {
			const attr = node.attrs.find((attr) => attr.name === 'class');
			const location = node.sourceCodeLocation?.attrs?.class;
			if (attr && location)
				edits.push({
					start: location.startOffset,
					end: location.endOffset,
					source: `class="${rewriteClasses(attr.value, names).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`,
				});
			if (
				node.tagName === 'style' &&
				node.sourceCodeLocation?.startTag &&
				node.sourceCodeLocation.endTag
			) {
				const start = node.sourceCodeLocation.startTag.endOffset;
				const end = node.sourceCodeLocation.endTag.startOffset;
				edits.push({
					start,
					end,
					source: rewriteStylesheet(html.slice(start, end), names),
				});
			}
		}
		if ('tagName' in node && node.tagName === 'script') {
			const type = node.attrs.find((attr) => attr.name === 'type')?.value;
			const location = node.sourceCodeLocation;
			if (
				!node.attrs.some((attr) => attr.name === 'src') &&
				(!type ||
					/^(?:module|(?:text|application)\/(?:java|ecma)script)$/i.test(
						type
					)) &&
				location?.startTag &&
				location.endTag
			) {
				const start = location.startTag.endOffset;
				const end = location.endTag.startOffset;
				edits.push({
					start,
					end,
					source: obfuscateScript(
						html.slice(start, end),
						`${name}:${start}`
					).replace(/<\/script/gi, '<\\/script'),
				});
			}
		}
		if ('childNodes' in node)
			for (const child of node.childNodes) visit(child);
		if ('content' in node)
			visit(node.content as DefaultTreeAdapterTypes.DocumentFragment);
	}
	visit(parse(html, { sourceCodeLocationInfo: true }));
	for (const edit of edits.sort((a, b) => b.start - a.start))
		html = html.slice(0, edit.start) + edit.source + html.slice(edit.end);
	return minify(html, {
		removeComments: true,
		collapseWhitespace: true,
		conservativeCollapse: true,
		minifyCSS: true,
		minifyJS: false,
		keepClosingSlash: true,
	});
}
