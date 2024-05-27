import { testRule } from 'stylelint-test-rule-node';
import plugin, { ruleName, messages } from './index.js';

testRule({
	plugins: [plugin],
	ruleName,
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
	],
});
