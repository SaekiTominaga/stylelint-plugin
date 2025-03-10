import pluginDisplayMultiKeyword from '../packages/display-multi-keyword/dist/index.js';
import pluginRootColors from '../packages/root-colors/dist/index.js';
import pluginViewportExplicit from '../packages/viewport-explicit/dist/index.js';

/** @type {import('stylelint').Config} */
export default {
	plugins: [pluginDisplayMultiKeyword, pluginRootColors, pluginViewportExplicit],
	rules: {
		/* [plugin] stylelint-display-multi-keyword*/
		'plugin/display-multi-keyword': [
			true,
			{
				severity: 'warning',
			},
		],

		/* [plugin] stylelint-root-colors */
		'plugin/root-colors': true,

		/* [plugin] viewport-explicit */
		'plugin/viewport-explicit': [
			true,
			{
				severity: 'warning',
			},
		],
	},
};
