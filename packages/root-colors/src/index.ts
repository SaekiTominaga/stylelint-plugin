import stylelint, { type Rule, type RuleMeta } from 'stylelint';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/root-colors';

export const messages = utils.ruleMessages(ruleName, {
	rejected: (selector: string) => `\`color\` and \`background-color\` must be specified as a set within selector \`${selector}\``,
});

const meta: Readonly<RuleMeta> = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/root-colors/README.md',
};

const DEFAULT_ROOT_SELECTORS: readonly string[] = [':root', 'html'];

const ruleFunction: Rule = (primary: unknown, secondaryOptions?: Readonly<{ root: string | string[] }>) => (root, result) => {
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
				root: [(value) => typeof value === 'string'],
			},
			optional: true,
		},
	);

	if (!validOptions) {
		return;
	}

	let rootSelectors = DEFAULT_ROOT_SELECTORS;
	if (secondaryOptions !== undefined) {
		if (Array.isArray(secondaryOptions.root)) {
			rootSelectors = secondaryOptions.root;
		} else {
			rootSelectors = [secondaryOptions.root];
		}
	}

	root.walkRules((ruleNode) => {
		const { selector, selectors } = ruleNode;

		if (!selectors.some((selectorPart) => rootSelectors.includes(selectorPart))) {
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
			result: result,
			ruleName: ruleName,
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
