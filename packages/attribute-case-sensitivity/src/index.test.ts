import { testRule } from 'stylelint-test-rule-node';
import plugin, { ruleName, messages } from './index.ts';

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: true,

	accept: [
		{
			code: 'foo {}',
		},
		{
			code: '[foo] {}',
		},
		{
			code: '[foo=""] {}',
		},
		{
			code: '[foo="" i] {}',
		},
		{
			code: '[foo="" s] {}',
		},
		{
			code: '[class="foo"] {}',
		},
		{
			code: '[data-xxx="foo"] {}',
		},
		{
			code: '[type="foo" i] {}',
		},
	],

	reject: [
		{
			code: `
[class="foo" i] {
}
`,
			message: messages.rejected('[class="foo" i]', 'default'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[data-xxx="foo" i] {
}
`,
			message: messages.rejected('[data-xxx="foo" i]', 'default'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[type="foo"] {
}
`,
			message: messages.rejected('[type="foo"]', 'i'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[type="foo" s] {
}
`,
			message: messages.rejected('[type="foo" s]', 'i'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: [
		true,
		{
			default: ['foo'],
			i: ['bar1', 'bar2'],
			s: ['baz'],
		},
	],

	accept: [
		{
			code: 'foo {}',
		},
		{
			code: '[foo] {}',
		},
		{
			code: '[foo="xxx"] {}',
		},
		{
			code: '[bar1="xxx" i] {}',
		},
		{
			code: '[bar2="xxx" i] {}',
		},
		{
			code: '[baz="xxx" s] {}',
		},
	],

	reject: [
		{
			code: `
[foo="xxx" i] {
}
`,
			message: messages.rejected('[foo="xxx" i]', 'default'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[bar1="xxx"] {
}
`,
			message: messages.rejected('[bar1="xxx"]', 'i'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[bar1="xxx" s] {
}
`,
			message: messages.rejected('[bar1="xxx" s]', 'i'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[baz="xxx"] {
}
`,
			message: messages.rejected('[baz="xxx"]', 's'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
	],
});
