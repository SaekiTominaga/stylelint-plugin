/**
 * Whether the attribute name matches
 *
 * @param name Attribute name
 * @param list List of defined attribute names
 *
 * @returns If it matches, true
 */
export const isMatch = (name: string, list: (string | RegExp)[]): boolean =>
	list.some((item) => {
		if (item instanceof RegExp) {
			return item.test(name);
		}

		return name === item;
	});
