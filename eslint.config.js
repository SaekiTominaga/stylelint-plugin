// @ts-check

import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default [
	...w0sConfig,
	{
		ignores: ['packages/*/dist'],
	},
	{
		files: ['packages/*/src/**/*.ts'],
		rules: {
			'import/no-extraneous-dependencies': [
				'error',
				{
					peerDependencies: true,
				},
			],
		},
	},
];
