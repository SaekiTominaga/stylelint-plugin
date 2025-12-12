export type AttributeList = readonly (string | RegExp)[];

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
	/* HTML standard 4.16.2 Case-sensitivity of selectors https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors */
	'accept',
	'accept-charset',
	/* align */ // Non-conforming features
	/* alink */ // Non-conforming features
	/* axis */ // Non-conforming features
	/* bgcolor */ // Non-conforming features
	'charset',
	'checked',
	/* clear */ // Non-conforming features
	/* codetype */ // Non-conforming features
	/* color */ // Non-conforming features
	/* compact */ // Non-conforming features
	/* declare */ // Non-conforming features
	'defer',
	'dir',
	/* direction */ // Non-conforming features (<marquee> element)
	'disabled',
	'enctype',
	/* face */ // Non-conforming features (<font> element)
	/* frame */ // Non-conforming features
	'hreflang',
	'http-equiv',
	'lang',
	/* language */ // Non-conforming features
	/* link */ // Non-conforming features
	'media',
	'method',
	'multiple',
	/* nohref */ // Non-conforming features
	/* noresize */ // Non-conforming features (<frame> element)
	/* noshade */ // Non-conforming features
	/* nowrap */ // Non-conforming features
	'readonly',
	'rel',
	/* rev */ // Non-conforming features
	/* rules */ // Non-conforming features
	'scope',
	/* scrolling */ // Non-conforming feature
	'selected',
	'shape',
	'target',
	/* text */ // Non-conforming features
	'type',
	/* valign */ // Non-conforming features
	/* valuetype */ // Non-conforming features (<param> element)
	/* vlink */ // Non-conforming features

	/* Other attributes in the HTML standard */
	'autocomplete',
	'contenteditable',
	'crossorigin',
	'hidden',
	'spellcheck',
	'style',
	'translate',

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
