import { testRule } from 'stylelint-test-rule-node';
import plugin, { ruleName, messages } from './index.ts';

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: true,

	accept: [
		{
			code: '.foo { display: none }',
		},
		{
			code: '.foo { display: block flow }',
		},
		{
			code: '.foo { display: block ruby }',
		},
		{
			code: '.foo { display: xxx }',
		},
	],

	reject: [
		{
			code: `
.foo {
	display: block;
}
`,
			message: messages.rejected('block', 'block flow'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 16,
		},
		{
			code: `
.foo {
	display: flow-root;
}
`,
			message: messages.rejected('flow-root', 'block flow-root'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 20,
		},
		{
			code: `
.foo {
	display: inline;
}
`,
			message: messages.rejected('inline', 'inline flow'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 17,
		},
		{
			code: `
.foo {
	display: inline-block;
}
`,
			message: messages.rejected('inline-block', 'inline flow-root'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 23,
		},
		{
			code: `
.foo {
	display: run-in;
}
`,
			message: messages.rejected('run-in', 'run-in flow'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 17,
		},
		{
			code: `
.foo {
	display: list-item;
}
`,
			message: messages.rejected('list-item', 'block flow list-item'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 20,
		},
		{
			code: `
.foo {
	display: inline list-item;
}
`,
			message: messages.rejected('inline list-item', 'inline flow list-item'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 27,
		},
		{
			code: `
.foo {
	display: flex;
}
`,
			message: messages.rejected('flex', 'block flex'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 15,
		},
		{
			code: `
.foo {
	display: inline-flex;
}
`,
			message: messages.rejected('inline-flex', 'inline flex'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 22,
		},
		{
			code: `
.foo {
	display: grid;
}
`,
			message: messages.rejected('grid', 'block grid'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 15,
		},
		{
			code: `
.foo {
	display: inline-grid;
}
`,
			message: messages.rejected('inline-grid', 'inline grid'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 22,
		},
		{
			code: `
.foo {
	display: ruby;
}
`,
			message: messages.rejected('ruby', 'inline ruby'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 15,
		},
		{
			code: `
.foo {
	display: table;
}
`,
			message: messages.rejected('table', 'block table'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 16,
		},
		{
			code: `
.foo {
	display: inline-table;
}
`,
			message: messages.rejected('inline-table', 'inline table'),
			line: 3,
			column: 11,
			endLine: 3,
			endColumn: 23,
		},
	],
});
