import stylelint, { type Rule, type RuleMeta } from 'stylelint';
import { getUnit } from './util/syntax.js';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/viewport-explicit';

export const messages = utils.ruleMessages(ruleName, {
	rejected: (defaultUnit: string) =>
		`Disallow the use of default viewport-percentage units (\`${defaultUnit}\` → \`s${defaultUnit}\`, \`l${defaultUnit}\` or \`d${defaultUnit}\`)`,
});

const meta: Readonly<RuleMeta> = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/viewport-explicit/README.md',
};

const DEFAULT_VIEWPORT_PERCENTAGE_UNITS: string[] = [
	/* https://www.w3.org/TR/css-values-4/#viewport-relative-lengths */
	'vw',
	'vh',
	'vi',
	'vb',
	'vmin',
	'vmax',
];

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
