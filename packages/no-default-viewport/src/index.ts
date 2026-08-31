import stylelint, { type Rule } from 'stylelint';
import { getUnit } from './util/syntax.ts';

const { createPlugin, utils } = stylelint;

const ruleName = 'plugin/no-default-viewport' as const;

const messages = utils.ruleMessages(ruleName, {
	rejected: (defaultUnit: string) =>
		`Disallow default viewport-percentage units (\`${defaultUnit}\` → \`s${defaultUnit}\`, \`l${defaultUnit}\` or \`d${defaultUnit}\`)`,
});

const meta = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/no-default-viewport/README.md',
} as const;

const DEFAULT_VIEWPORT_PERCENTAGE_UNITS = [
	/* https://www.w3.org/TR/css-values-4/#viewport-relative-lengths */
	'vw',
	'vh',
	'vi',
	'vb',
	'vmin',
	'vmax',
] as const;

const ruleFunction: Rule = (primary: unknown) => (root, result) => {
	const validOptions = utils.validateOptions(result, ruleName, {
		actual: primary,
		possible: [true],
	});

	if (!validOptions) {
		return;
	}

	root.walkDecls((decl) => {
		const unit = getUnit(decl.value, DEFAULT_VIEWPORT_PERCENTAGE_UNITS);
		if (unit === undefined) {
			return;
		}

		utils.report({
			result: result,
			ruleName: ruleName,
			message: messages.rejected(unit),
			node: decl,
			word: decl.value,
		});
	});
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);

export { ruleName, messages };
