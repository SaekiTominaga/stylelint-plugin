# stylelint-no-default-viewport

[![npm version](https://badge.fury.io/js/stylelint-no-default-viewport.svg)](https://www.npmjs.com/package/stylelint-no-default-viewport)
[![Workflow status](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/package-no-default-viewport.yml/badge.svg)](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/package-no-default-viewport.yml)

## Summary

Disallow default viewport-percentage units (`vw`, `vh`, `vi`, `vb`, `vmin`, `vmax`) and use small viewport-percentage units (e.g. `svi`), large viewport-percentage units (e.g. `lvi`) or dynamic viewport-percentage units (e.g. `dvi`).

```css
/* 🆖 default viewport-percentage units */
.any-selector {
  inline-size: 10vi;
  block-size: 20vb;
}

/* 🆗 large viewport-percentage units */
.any-selector {
  inline-size: 10lvi;
  block-size: 20lvb;
}
```

See [Viewport-percentage Lengths in CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths) for all units.

## Usage

```javascript
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-no-default-viewport'],
  rules: {
    'plugin/no-default-viewport': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
};
```
