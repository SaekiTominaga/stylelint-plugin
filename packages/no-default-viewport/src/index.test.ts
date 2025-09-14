import { testRule } from 'stylelint-test-rule-node';
import plugin, { ruleName, messages } from './index.ts';

testRule({
	plugins: [plugin],
	ruleName: ruleName,
	config: true,

	accept: [
		{
			code: '.foo { inline-size: 10svw }',
		},
		{
			code: '.foo { margin: 10lvb 10dvmin }',
		},
	],

	reject: [
		{
			code: `
.foo {
	inline-size: 10vw;
}
`,
			message: messages.rejected('vw'),
			line: 3,
			column: 15,
			endLine: 3,
			endColumn: 19,
		},
		{
			code: `
.foo {
	margin: 10dvb 10vmin;
}
`,
			message: messages.rejected('vmin'),
			line: 3,
			column: 10,
			endLine: 3,
			endColumn: 22,
		},
	],
});
