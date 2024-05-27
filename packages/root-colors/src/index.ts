import stylelint from 'stylelint';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/stylelint-root-colors';

export const messages = utils.ruleMessages(ruleName, {
	rejected: (selector) => `\`color\` and \`background-color\` must be specified as a set within selector \`${String(selector)}\``,
});

const meta: stylelint.RuleMeta = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/root-colors/README.md',
};

const ruleFunction: stylelint.Rule = (primary) => (root, result) => {
	const validOptions = utils.validateOptions(result, ruleName, {
		actual: primary,
	});

	if (!validOptions) {
		return;
	}

	root.walkRules((ruleNode) => {
		const { selector } = ruleNode;

		if (![':root', 'html'].includes(selector)) {
			return;
		}

		let colorValue: string | undefined;
		let backgroundColorValue: string | undefined;

		ruleNode.walkDecls((decl) => {
			switch (decl.prop) {
				case 'color': {
					colorValue = decl.value;
					break;
				}
				case 'background-color': {
					backgroundColorValue = decl.value;
					break;
				}
				case 'background': {
					backgroundColorValue = decl.value; // TODO: これで正常に動作するが、本来はショートハンド値をパースして色情報のみを抜き出すべき
					break;
				}
				default:
			}
		});

		if ((colorValue === undefined && backgroundColorValue === undefined) || (colorValue !== undefined && backgroundColorValue !== undefined)) {
			return;
		}

		utils.report({
			result,
			ruleName,
			message: messages.rejected(selector),
			node: ruleNode,
			word: selector,
		});
	});
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);