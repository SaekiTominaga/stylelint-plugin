import { testRule } from 'stylelint-test-rule-node';
import plugin, { ruleName, messages } from './index.js';

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: true,

	accept: [
		{
			code: ':root { background-color: #000; color: #000 }',
		},
		{
			code: ':root { color: #000; background: url(foo) #000 repeat }',
		},
		{
			code: ':root {}',
		},
		{
			code: 'html { color: #000; background-color: #000 }',
		},
		{
			code: 'html { background: url(foo) #000 repeat; color: #000 }',
		},
		{
			code: 'html {}',
		},
		{
			code: '.foo { color: #000 }',
		},
		{
			code: 'html, :root, .foo {}',
		},
	],

	reject: [
		{
			code: 'html { background-color: #000 }',
			message: messages.rejected('html'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 5,
		},
		{
			code: 'html { background: url(foo) #000 repeat }',
			message: messages.rejected('html'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 5,
		},
		{
			code: 'html { color: #000 }',
			message: messages.rejected('html'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 5,
		},
		{
			code: ':root { background-color: #000 }',
			message: messages.rejected(':root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: ':root { background: url(foo) #000 repeat }',
			message: messages.rejected(':root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: ':root { color: #000 }',
			message: messages.rejected(':root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: 'html, :root, .foo { background-color: #000 }',
			message: messages.rejected('html, :root, .foo'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 18,
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: [
		true,
		{
			root: '.root',
		},
	],

	accept: [
		{
			code: '.root { background-color: #000; color: #000 }',
		},
		{
			code: '.root { color: #000; background: url(foo) #000 repeat }',
		},
		{
			code: '.root {}',
		},
		{
			code: ':root { color: #000 }',
		},
	],

	reject: [
		{
			code: '.root { background-color: #000 }',
			message: messages.rejected('.root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: '.root { background: url(foo) #000 repeat }',
			message: messages.rejected('.root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: '.root { color: #000 }',
			message: messages.rejected('.root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: '.root, .foo { background-color: #000 }',
			message: messages.rejected('.root, .foo'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 12,
		},
	],
});

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: [
		true,
		{
			root: ['#root', '[element=root]'],
		},
	],

	accept: [
		{
			code: '#root { background-color: #000; color: #000 }',
		},
		{
			code: '#root { color: #000; background: url(foo) #000 repeat }',
		},
		{
			code: '#root {}',
		},
		{
			code: '[element=root] { background-color: #000; color: #000 }',
		},
		{
			code: '[element=root] { color: #000; background: url(foo) #000 repeat }',
		},
		{
			code: '[element=root] {}',
		},
		{
			code: ':root { color: #000 }',
		},
	],

	reject: [
		{
			code: '#root { background-color: #000 }',
			message: messages.rejected('#root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: '#root { background: url(foo) #000 repeat }',
			message: messages.rejected('#root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: '#root { color: #000 }',
			message: messages.rejected('#root'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 6,
		},
		{
			code: '[element=root] { background-color: #000 }',
			message: messages.rejected('[element=root]'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 15,
		},
		{
			code: '[element=root] { background: url(foo) #000 repeat }',
			message: messages.rejected('[element=root]'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 15,
		},
		{
			code: '[element=root] { color: #000 }',
			message: messages.rejected('[element=root]'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 15,
		},
		{
			code: '[element=root], [element=foo] { background-color: #000 }',
			message: messages.rejected('[element=root], [element=foo]'),
			line: 1,
			column: 1,
			endLine: 1,
			endColumn: 30,
		},
	],
});
