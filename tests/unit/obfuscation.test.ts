import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { parse, type DefaultTreeAdapterTypes } from 'parse5';
import { obfuscateDocument, obfuscateScript } from '../../src/obfuscation.ts';

test('obfuscation hides identifiers and strings while preserving public object interfaces', () => {
	const code = obfuscateScript(
		`
		const privateObject = { message: 'private-message-value' };
		function privateFunction(privateArgument) { return privateArgument.message; }
		globalThis.result = privateFunction(privateObject);
	`,
		'test.js'
	);
	assert.doesNotMatch(
		code,
		/privateObject|privateFunction|privateArgument|private-message-value/
	);
	const context: Record<string, unknown> = {};
	runInNewContext(code, context);
	assert.equal(context.result, 'private-message-value');
	assert.equal(obfuscateScript(code, 'inline.js'), code);
});

test('HTML obfuscation handles executable inline scripts and preserves data and vendor script references', async () => {
	const html = await obfuscateDocument(
		`<!doctype html><html><head>
		<script src="/scram/controller.api.js"></script>
		<script type="application/ld+json">{"name":"Structured data"}</script>
		</head><body><!-- comment --><pre>  literal  spacing\n</pre>
		<script>const privateValue = 'inline-secret'; globalThis.result = privateValue;</script>
		</body></html>`,
		'test.html'
	);
	assert.doesNotMatch(html, /privateValue|inline-secret|<!-- comment -->/);
	assert.match(html, /src="\/scram\/controller.api.js"/);
	assert.match(html, /\{"name":"Structured data"\}/);
	assert.match(html, /<pre>  literal  spacing\n<\/pre>/);
	function scripts(
		node: DefaultTreeAdapterTypes.Node
	): DefaultTreeAdapterTypes.Element[] {
		return [
			...('tagName' in node && node.tagName === 'script' ? [node] : []),
			...('childNodes' in node ? node.childNodes.flatMap(scripts) : []),
		];
	}
	const script = scripts(parse(html)).find((node) => node.attrs.length === 0);
	assert.ok(script);
	const source = script.childNodes
		.map((node) => ('value' in node ? node.value : ''))
		.join('');
	const context: Record<string, unknown> = {};
	runInNewContext(source, context);
	assert.equal(context.result, 'inline-secret');
});
