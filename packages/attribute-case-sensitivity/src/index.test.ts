import { testRule } from 'stylelint-test-rule-node';
import plugin, { ruleName, messages } from './index.ts';

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: [true, {}],

	accept: [
		{
			code: 'foo {}',
		},
		{
			code: '[foo] {}',
		},
	],

	reject: [
		{
			code: `
[type="foo"] {
}
`,
			message: messages.rejected('[type="foo"]', ''),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[type="foo" i] {
}
`,
			message: messages.rejected('[type="foo" i]', 'i'),
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
			message: messages.rejected('[type="foo" s]', 's'),
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
			default: true,
		},
	],

	accept: [
		{
			code: '[type="foo"] {}',
		},
	],

	reject: [
		{
			code: `
[type="foo" i] {
}
`,
			message: messages.rejected('[type="foo" i]', 'i'),
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
			message: messages.rejected('[type="foo" s]', 's'),
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
			i: true,
		},
	],

	accept: [
		{
			code: '[type="foo" i] {}',
		},
		{
			code: '[type="foo" I] {}',
		},
	],

	reject: [
		{
			code: `
[type="foo"] {
}
`,
			message: messages.rejected('[type="foo"]', ''),
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
			message: messages.rejected('[type="foo" s]', 's'),
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
			s: true,
		},
	],

	accept: [
		{
			code: '[type="foo" s] {}',
		},
		{
			code: '[type="foo" S] {}',
		},
	],

	reject: [
		{
			code: `
[type="foo"] {
}
`,
			message: messages.rejected('[type="foo"]', ''),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
		{
			code: `
[type="foo" i] {
}
`,
			message: messages.rejected('[type="foo" i]', 'i'),
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
			default: true,
			i: true,
			s: true,
		},
	],

	accept: [
		{
			code: '[type="foo"] {}',
		},
		{
			code: '[type="foo" i] {}',
		},
		{
			code: '[type="foo" I] {}',
		},
		{
			code: '[type="foo" s] {}',
		},
		{
			code: '[type="foo" S] {}',
		},
	],

	reject: [
		{
			code: `
[type="foo" x] {
}
`,
			message: messages.rejected('[type="foo" x]', 'x'),
			line: 2,
			column: 1,
			endLine: 3,
			endColumn: 2,
		},
	],
});
