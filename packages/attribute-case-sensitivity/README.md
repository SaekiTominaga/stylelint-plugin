# stylelint-plugin-attribute-case-sensitivity

[![npm version](https://badge.fury.io/js/stylelint-plugin-attribute-case-sensitivity.svg)](https://www.npmjs.com/package/stylelint-plugin-attribute-case-sensitivity)
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
  plugins: ['stylelint-plugin-attribute-case-sensitivity'],
  rules: {
    'plugin/attribute-case-sensitivity': [
      true,
      {
        default: false,
        i: true,
        s: false,
      },
    ],
  },
};
```

### Rule options

| name      | type      | description                                                                |
| --------- | --------- | -------------------------------------------------------------------------- |
| `default` | `boolean` | Whether to allow default case sensitivity. If omitted, it will be `false`. |
| `i`       | `boolean` | Whether to allow case-insensitively (`i`). If omitted, it will be `false`. |
| `s`       | `boolean` | Whether to allow case-sensitively (`s`). If omitted, it will be `false`.   |

\* While it is possible to omit all properties (`{}`), we do not recommend doing so. In that case, all attribute selectors will result in errors.
