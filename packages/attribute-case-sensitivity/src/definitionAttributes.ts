export type AttributeList = (string | RegExp)[];

export const defaultBases: AttributeList = [
	'class',
	'for',
	'id',
	'name',
	'tabindex',

	/^data-/v,

	'aria-activedescendant', // ID reference
	'aria-controls', // ID reference list
	'aria-describedby', // ID reference list
	'aria-details', // ID reference list
	'aria-errormessage', // ID reference list
	'aria-flowto', // ID reference list
	'aria-labelledby', // ID reference list
	'aria-owns', // ID reference list
];

export const insensitivelyBases: AttributeList = [
	'autocomplete',
	'charset',
	'contenteditable',
	'crossorigin',
	'dir',
	'enctype',
	'hidden',
	'hreflang',
	'http-equiv',
	'lang',
	'method',
	'rel',
	'spellcheck',
	'style',
	'target',
	'translate',
	'type',

	/* "modern browsers treat the role or aria-* attribute values as ASCII case-insensitive" https://www.w3.org/TR/html-aria/#case-sensitivity */
	'role',
	'aria-atomic', // true/false
	'aria-autocomplete', // token
	'aria-busy', // true/false
	'aria-checked', // tristate (true/false/mixed/undefined)
	'aria-current', // token
	'aria-disabled', // true/false
	'aria-expanded', // true/false/undefined
	'aria-haspopup', // token
	'aria-hidden', // true/false/undefined
	'aria-invalid', // token
	'aria-keyshortcuts', // string
	'aria-live', // token
	'aria-modal', // true/false
	'aria-multiline', // true/false
	'aria-multiselectable', // true/false
	'aria-orientation', // token
	'aria-pressed', // tristate (true/false/mixed/undefined)
	'aria-readonly', // true/false
	'aria-relevant', // token list
	'aria-required', // true/false
	'aria-selected', // true/false/undefined
	'aria-sort', // token
];

export const sensitivelyBases: AttributeList = [];
