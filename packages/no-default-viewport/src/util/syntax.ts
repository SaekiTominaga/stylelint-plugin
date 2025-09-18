/**
 * Get only units from CSS values
 *
 * <dimension-token>: <number-token><ident-token>
 * <number-token>: [+-]?(?:[0-9]*.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?
 * https://www.w3.org/TR/2021/CRD-css-syntax-3-20211224/#token-diagrams
 *
 * @param declarationValue - e.g. '-10.1vi'
 * @param units - e.g. ['vi', 'vb']
 *
 * @returns e.g. 'vi'
 */
export const getUnit = (declarationValue: string, units: string[]): string | undefined => {
	const matchGroups = new RegExp(`\\b[+\\-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+\\-]?[0-9]+)?(?<unit>${units.join('|')})\\b`, 'gv').exec(declarationValue)?.groups;
	return matchGroups?.['unit'];
};
