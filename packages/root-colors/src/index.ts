import stylelint, { type Rule } from 'stylelint';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/root-colors' as const;

export const messages = utils.ruleMessages(ruleName, {
	rejected: (selector: string) => `\`color\` and \`background-color\` must be specified as a set within selector \`${selector}\``,
});

const meta = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/root-colors/README.md',
} as const;

const DEFAULT_ROOT_SELECTORS = ['body'] as const;

const ruleFunction: Rule =
	(
		primary: unknown,
		secondaryOptions?: Readonly<{
			root?: string | string[];
			required?: boolean;
		}>,
	) =>
	(root, result) => {
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
					root: [(value: unknown) => typeof value === 'string'],
					required: [(value: unknown) => typeof value === 'boolean'],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		const rootSelectors = ((): readonly string[] => {
			if (secondaryOptions?.root !== undefined) {
				if (Array.isArray(secondaryOptions.root)) {
					return secondaryOptions.root;
				}

				return [secondaryOptions.root];
			}

			return DEFAULT_ROOT_SELECTORS;
		})();

		const required = secondaryOptions?.required ?? false;

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

			if (required && colorValue !== undefined && backgroundColorValue !== undefined) {
				return;
			}

			if (!required && ((colorValue === undefined && backgroundColorValue === undefined) || (colorValue !== undefined && backgroundColorValue !== undefined))) {
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
