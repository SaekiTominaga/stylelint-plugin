import pluginAttributeCaseSensitivity from '../packages/attribute-case-sensitivity/dist/index.js';
import pluginNoDefaultViewport from '../packages/no-default-viewport/dist/index.js';
import pluginRootColors from '../packages/root-colors/dist/index.js';

/** @type {import('stylelint').Config} */
export default {
	plugins: [pluginAttributeCaseSensitivity, pluginNoDefaultViewport, pluginRootColors],
	rules: {
		/* attribute-case-sensitivity */
		'plugin/attribute-case-sensitivity': true,

		/* no-default-viewport */
		'plugin/no-default-viewport': true,

		/* root-colors */
		'plugin/root-colors': true,
	},
};
