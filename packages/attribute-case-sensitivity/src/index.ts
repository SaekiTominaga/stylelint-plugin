import stylelint, { type Rule, type RuleMeta } from 'stylelint';
import selectorParser from 'postcss-selector-parser';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/attribute-case-sensitivity';

export const messages = utils.ruleMessages(ruleName, {
	rejected: (attr: string, identifier: string) => {
		if (identifier === '') {
			return `The attribute selector \`${attr}\` require case-sensitivity identifier`;
		}
		return `The case-sensitivity identifier for the attribute selector \`${attr}\` is not permitted`;
	},
});

const meta: Readonly<RuleMeta> = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/attribute-case-sensitivity/README.md',
};

const ruleFunction: Rule = (primary: unknown, secondaryOptions: Readonly<{ default?: boolean; i?: boolean; s?: boolean }>) => (root, result) => {
	const validOptions = utils.validateOptions(
		result,
		ruleName,
		{
			actual: primary,
			possible: [true],
		},
		{
			actual: secondaryOptions,
			possible: {
				default: [(value: unknown) => typeof value === 'boolean'],
				i: [(value: unknown) => typeof value === 'boolean'],
				s: [(value: unknown) => typeof value === 'boolean'],
			},
		},
	);

	if (!validOptions) {
		return;
	}

	root.walkRules((ruleNode) => {
		selectorParser((selectors) => {
			selectors.walkAttributes((attr) => {
				// @ts-expect-error: ts(2551)
				const identifier = attr.insensitive ? 'i' : (attr.raws.insensitiveFlag as string | undefined)?.toLowerCase();

				if (secondaryOptions.default && identifier === undefined) {
					return;
				}
				if (secondaryOptions.i && identifier === 'i') {
					return;
				}
				if (secondaryOptions.s && identifier === 's') {
					return;
				}

				utils.report({
					message: messages.rejected(attr.toString(), identifier ?? ''),
					node: ruleNode,
					result,
					ruleName,
				});
			});
		}).processSync(ruleNode.selector);
	});
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
