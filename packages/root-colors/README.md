# stylelint-root-colors

[![npm version](https://badge.fury.io/js/stylelint-root-colors.svg)](https://www.npmjs.com/package/stylelint-root-colors)
[![Workflow status](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/package-root-colors.yml/badge.svg)](https://github.com/SaekiTominaga/stylelint-plugin/actions/workflows/package-root-colors.yml)

## Summary

It is recommended to use `color` and `background-color` together on the root element.

Typically, the term <dfn>[root element](https://drafts.csswg.org/css-display-4/#root-element)</dfn> refers to the `<html>` element. However, the [CSS specification](https://www.w3.org/TR/css-backgrounds-3/#body-background) states that <q>It is recommended that authors of HTML documents specify the canvas background using the `BODY` element rather than the `HTML` element</q>. Therefore, this plugin performs linting on the `<body>` element by default.

```css
/* 🆖 Do not specify only either `color` or `background-color` in the root element */
body {
  color: #000;
}

body,
.foo {
  background-color: #fff;
}

/* 🆗 It is good to specify both `color` and `background-color` */
body {
  background-color: #fff;
  color: #000;
}

/* 🆗 You may use the `background` short hand */
body {
  background: #fff;
  color: #000;
}

/* 🆗 The `color` and `background-color` are not required, but can be overridden with the `required` option */
body {
}

/* 🆗 Except in the root element, only either `color` or `background-color` may be specified */
.foo {
  color: #000;
}
```

## Why?

The text and background colors in browsers have long been customizable by users.

▼ Internet Explorer 3 (1996) <q>General</q> Settings

<img src="https://raw.githubusercontent.com/SaekiTominaga/stylelint-plugin/refs/heads/main/packages/root-colors/assets/setting_ie3.png" alt="Dialog with color selection palettes for Text, Background, Visited Links, and Unvisited Links" width="404" height="448">

The following screenshot shows a user-defined dark mode configuration in Firefox's <q>Manage Colors</q> settings, where the text color is set to white and the background color is set to black.

▼ Firefox 130 (2024) <q>Colors</q> Settings

<img src="https://raw.githubusercontent.com/SaekiTominaga/stylelint-plugin/refs/heads/main/packages/root-colors/assets/setting_firefox130.png" alt="Dialog with color selection palettes for Text, Background, Unvisited Links, and Visited Links" width="1780" height="1386">

And around 2024, browsers began implementing forced dark mode.

▼ iOS Vivaldi 7.7 (2025) <q>Appearance & Theme</q> Settings

<img src="https://raw.githubusercontent.com/SaekiTominaga/stylelint-plugin/refs/heads/main/packages/root-colors/assets/setting_ios-vivaldi7.7.png" alt="Dialog with a switch control for “Force a dark theme on all websites”" width="2360" height="1575">

In this case, if only either `color` or `background-color` is specified in the root element through producer stylesheets, the text will be unreadable in some cases.

The following screenshot shows a web page with `body { color: black }` displayed after setting iOS's system appearance to <q>Dark</q> and enabling Vivaldi's <q>Force a dark theme on all websites</q>.

▼ iOS Vivaldi 7.7 (2025) Rendering

<img src="https://raw.githubusercontent.com/SaekiTominaga/stylelint-plugin/refs/heads/main/packages/root-colors/assets/rendaring_ios-vivaldi7.7.png" alt="The background color is light gray, and the text color is white" width="1640" height="1025">

See also [F24 in Techniques for WCAG 2.2](https://www.w3.org/WAI/WCAG22/Techniques/failures/F24).

## Usage

```javascript
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-root-colors'],
  rules: {
    'plugin/root-colors': [
      true,
      {
        root: ['#root'],
        required: true,
      },
    ],
  },
};
```

### Rule options

| name       | type                 | default    | description                                       |
| ---------- | -------------------- | ---------- | ------------------------------------------------- |
| `root`     | `string \| string[]` | `['body']` | Specifies the selector of the root element        |
| `required` | `boolean`            | `false`    | Make both `color` and `background-color` required |

\* Note that setting `required: true` will considered problem when the code is divided into multiple declaration blocks as shown below.

```css
body {
  background-color: #fff;
  color: #000;
}

.any-selector {
}

body /* considered problem */ {
  line-height: 1.8;
}
```
