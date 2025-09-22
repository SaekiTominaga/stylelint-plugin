# stylelint-attribute-case-sensitivity

[![npm version](https://badge.fury.io/js/stylelint-attribute-case-sensitivity.svg)](https://www.npmjs.com/package/stylelint-attribute-case-sensitivity)
[![Workflow status](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/package-attribute-case-sensitivity.yml/badge.svg)](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/package-attribute-case-sensitivity.yml)

## Summary

CSS Selectors Level 4 defines identifiers for [attribute selectors' case-sensitivity](https://www.w3.org/TR/selectors-4/#attribute-case).

This function sets whether to allow or disallow each of the three patterns: no identifier, `i` identifier, and `s` identifier.

```css
/* default case-sensitivity */
input[type='text'] {
}

/* case-insensitively */
input[type='text' i] {
}

/* case-sensitively */
input[type='text' s] {
}
```

## Usage

```javascript
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-attribute-case-sensitivity'],
  rules: {
    'plugin/attribute-case-sensitivity': [
      true,
      {
        default: ['class', 'for', 'id', 'name', 'tabindex', /^data-/v],
        i: ['hreflang', 'lang', 'method', 'rel', 'type'],
        s: [],
      },
    ],
  },
};
```

### Rule options

| name      | type                   | description                                             |
| --------- | ---------------------- | ------------------------------------------------------- |
| `default` | `(string \| RegExp)[]` | List of attribute names that enforce no identifier      |
| `i`       | `(string \| RegExp)[]` | List of attribute names that enforce the identifier `i` |
| `s`       | `(string \| RegExp)[]` | List of attribute names that enforce the identifier `s` |

\* For all properties, if omitted, [the default values](src/definitionAttributes.ts) is set.

\* If you wish to add attributes to the default values, please submit an issue.
