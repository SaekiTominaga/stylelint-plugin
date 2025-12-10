import pluginDisplayMultiKeyword from '../packages/display-multi-keyword/dist/index.js';
import pluginNoDefaultViewport from '../packages/no-default-viewport/dist/index.js';
import pluginRootColors from '../packages/root-colors/dist/index.js';

/** @type {import('stylelint').Config} */
export default {
	plugins: [pluginDisplayMultiKeyword, pluginNoDefaultViewport, pluginRootColors],
	rules: {
		/* display-multi-keyword*/
		'plugin/display-multi-keyword': true,

		/* no-default-viewport */
		'plugin/no-default-viewport': true,

		/* root-colors */
		'plugin/root-colors': true,
	},
};
