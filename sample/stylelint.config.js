import pluginAttributeCaseSensitivity from '../packages/attribute-case-sensitivity/dist/index.js';
import pluginDisplayMultiKeyword from '../packages/display-multi-keyword/dist/index.js';
import pluginNoDefaultViewport from '../packages/no-default-viewport/dist/index.js';
import pluginRootColors from '../packages/root-colors/dist/index.js';

/** @type {import('stylelint').Config} */
export default {
	plugins: [pluginAttributeCaseSensitivity, pluginDisplayMultiKeyword, pluginNoDefaultViewport, pluginRootColors],
	rules: {
		/* attribute-case-sensitivity */
		'plugin/attribute-case-sensitivity': true,

		/* display-multi-keyword */
		'plugin/display-multi-keyword': true,

		/* no-default-viewport */
		'plugin/no-default-viewport': true,

		/* root-colors */
		'plugin/root-colors': true,
	},
};
