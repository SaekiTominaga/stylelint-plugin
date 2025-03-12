import pluginDisplayMultiKeyword from '../packages/display-multi-keyword/dist/index.js';
import pluginNoDefaultViewport from '../packages/no-default-viewport/dist/index.js';
import pluginRootColors from '../packages/root-colors/dist/index.js';

/** @type {import('stylelint').Config} */
export default {
	plugins: [pluginDisplayMultiKeyword, pluginNoDefaultViewport, pluginRootColors],
	rules: {
		/* [plugin] display-multi-keyword*/
		'plugin/display-multi-keyword': [
			true,
			{
				severity: 'warning',
			},
		],

		/* [plugin] no-default-viewport */
		'plugin/no-default-viewport': [
			true,
			{
				severity: 'warning',
			},
		],

		/* [plugin] root-colors */
		'plugin/root-colors': true,
	},
};
