import pluginDisplayMultiKeyword from '../packages/display-multi-keyword/dist/index.js';
import pluginRootColors from '../packages/root-colors/dist/index.js';

/** @type {import('stylelint').Config} */
export default {
	plugins: [pluginDisplayMultiKeyword, pluginRootColors],
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
	},
};
