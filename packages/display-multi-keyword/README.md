# stylelint-display-multi-keyword

[![npm version](https://badge.fury.io/js/stylelint-display-multi-keyword.svg)](https://www.npmjs.com/package/stylelint-display-multi-keyword)
[![test status](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/display-multi-keyword-test.yml/badge.svg)](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/display-multi-keyword-test.yml)

## Summary

The `display` keyword has multi keyword values defined and good browser support. ([Can I use...](https://caniuse.com/mdn-css_properties_display_multi-keyword_values))

This function prohibits the use of conventional values (short values) and forces the use of multi-keyword values (full values).

```css
/* 🆖 Short value are not available */
.any-selector {
  display: block;
}

/* 🆗 Full value are available */
.any-selector {
  display: block flow;
}

/* 🆗 Short value are available if a full value does not exist */
.any-selector {
  display: contents;
}
```

See [summary table in CSS Display Module Level 3](https://drafts.csswg.org/css-display/#display-value-summary) for a list of all keywords.

## Usage

```javascript
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-display-multi-keyword'],
  rules: {
    'plugin/display-multi-keyword': true,
  },
};
```
