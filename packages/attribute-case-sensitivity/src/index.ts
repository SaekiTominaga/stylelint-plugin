import stylelint, { type Rule, type RuleMeta } from 'stylelint';
import selectorParser from 'postcss-selector-parser';
import { defaultBases, insensitivelyBases, sensitivelyBases, type AttributeList } from './definitionAttributes.ts';

const { createPlugin, utils } = stylelint;

export const ruleName = 'plugin/attribute-case-sensitivity';

export const messages = utils.ruleMessages(ruleName, {
	rejected: (attr: string, identifier: string) => {
		if (identifier === '') {
			return `The attribute selector \`${attr}\` require \`${identifier}\` identifier`;
		}
		return `Do not set the case-sensitivity identifier for attribute selector \`${attr}\``;
	},
});

const meta: Readonly<RuleMeta> = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/attribute-case-sensitivity/README.md',
};

const isMatche = (value: string, list: (string | RegExp)[]): boolean =>
	list.some((item) => {
		if (item instanceof RegExp) {
			return item.test(value);
		}

		return value === item;
	});

const ruleFunction: Rule =
	(
		primary: unknown,
		secondaryOptions?: Readonly<{
			default?: AttributeList;
			i?: AttributeList;
			s?: AttributeList;
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
					default: [(value: unknown) => typeof value === 'string' || value instanceof RegExp],
					i: [(value: unknown) => typeof value === 'string' || value instanceof RegExp],
					s: [(value: unknown) => typeof value === 'string' || value instanceof RegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			selectorParser((selectors) => {
				selectors.walkAttributes((attr) => {
					if (attr.value === undefined) {
						return;
					}

					// @ts-expect-error: ts(2551)
					const identifier = attr.insensitive ? 'i' : (attr.raws.insensitiveFlag as string | undefined)?.toLowerCase();

					const degaultAttributes = secondaryOptions?.default ?? defaultBases;
					const insensitivelyAttributes = secondaryOptions?.i ?? insensitivelyBases;
					const sensitivelyAttributes = secondaryOptions?.s ?? sensitivelyBases;

					if (!isMatche(attr.attribute, [...degaultAttributes, ...insensitivelyAttributes, ...sensitivelyAttributes])) {
						/* 定義されていない属性はチェック対象外 */
						return;
					}

					if (isMatche(attr.attribute, degaultAttributes) && identifier === undefined) {
						return;
					}
					if (isMatche(attr.attribute, insensitivelyAttributes) && identifier === 'i') {
						return;
					}
					if (isMatche(attr.attribute, sensitivelyAttributes) && identifier === 's') {
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
