import selectorParser from 'postcss-selector-parser';
import stylelint, { type Rule } from 'stylelint';
import { defaultBases, insensitivelyBases, sensitivelyBases } from './definitionAttributes.ts';
import { isMatch as isAttributeMatch } from './util/attribute.ts';

type Attribute = string | RegExp;
type Identifier = 'default' | 'i' | 's';

const { createPlugin, utils } = stylelint;

const ruleName = 'plugin/attribute-case-sensitivity' as const;

const messages = utils.ruleMessages(ruleName, {
	rejected: (attr: string, identifier: Identifier) => {
		if (identifier === 'default') {
			return `Do not set the case-sensitivity identifier for attribute selector \`${attr}\``;
		}
		return `The attribute selector \`${attr}\` require \`${identifier}\` identifier`;
	},
});

const meta = {
	url: 'https://github.com/SaekiTominaga/stylelint-plugin/blob/main/packages/attribute-case-sensitivity/README.md',
} as const;

const ruleFunction: Rule =
	(
		primary: unknown,
		secondaryOptions?: Readonly<{
			default?: readonly Attribute[];
			i?: readonly Attribute[];
			s?: readonly Attribute[];
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

					if (!isAttributeMatch(attr.attribute, [...degaultAttributes, ...insensitivelyAttributes, ...sensitivelyAttributes])) {
						/* 定義されていない属性はチェック対象外 */
						return;
					}

					let ldealIdentifier: Identifier;
					switch (identifier) {
						case undefined: {
							if (isAttributeMatch(attr.attribute, insensitivelyAttributes)) {
								ldealIdentifier = 'i';
							} else if (isAttributeMatch(attr.attribute, sensitivelyAttributes)) {
								ldealIdentifier = 's';
							} else {
								return;
							}
							break;
						}
						case 'i': {
							if (isAttributeMatch(attr.attribute, degaultAttributes)) {
								ldealIdentifier = 'default';
							} else if (isAttributeMatch(attr.attribute, sensitivelyAttributes)) {
								ldealIdentifier = 's';
							} else {
								return;
							}
							break;
						}
						case 's': {
							if (isAttributeMatch(attr.attribute, degaultAttributes)) {
								ldealIdentifier = 'default';
							} else if (isAttributeMatch(attr.attribute, insensitivelyAttributes)) {
								ldealIdentifier = 'i';
							} else {
								return;
							}
							break;
						}
						default: {
							throw new Error(`Unknown identifier: ${identifier}`);
						}
					}

					utils.report({
						message: messages.rejected(attr.toString(), ldealIdentifier),
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

export { type Attribute, ruleName, messages };
