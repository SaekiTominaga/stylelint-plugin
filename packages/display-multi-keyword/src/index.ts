import stylelint, { type Rule, type RuleMeta } from 'stylelint';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/display-multi-keyword';

export const messages = utils.ruleMessages(ruleName, {
	rejected: (short: string, full: string) => `Use multi-keyword syntax (\`${short}\` → \`${full}\`)`,
});

const meta: Readonly<RuleMeta> = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/display-multi-keyword/README.md',
};

const DISPLAY_VALUE: Readonly<Record<string, string>> = {
	/* https://drafts.csswg.org/css-display/#display-value-summary */
	block: 'block flow',
	'flow-root': 'block flow-root',
	inline: 'inline flow',
	'inline-block': 'inline flow-root',
	'run-in': 'run-in flow',
	'list-item': 'block flow list-item',
	'inline list-item': 'inline flow list-item',
	flex: 'block flex',
	'inline-flex': 'inline flex',
	grid: 'block grid',
	'inline-grid': 'inline grid',
	ruby: 'inline ruby',
	/* 'block ruby': 'block ruby', */
	table: 'block table',
	'inline-table': 'inline table',
};

const ruleFunction: Rule = (primary: unknown) => (root, result) => {
	const validOptions = utils.validateOptions(result, ruleName, {
		actual: primary,
		possible: [true],
	});

	if (!validOptions) {
		return;
	}

	root.walkRules((ruleNode) => {
		ruleNode.walkDecls((decl) => {
			if (decl.prop !== 'display') {
				return;
			}

			const value = Object.entries(DISPLAY_VALUE).find(([short]) => decl.value === short);
			if (value === undefined) {
				return;
			}

			const [short, full] = value;

			utils.report({
				result: result,
				ruleName: ruleName,
				message: messages.rejected(short, full),
				node: decl,
				word: decl.value,
			});
		});
	});
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
