import config from '@w0s/oxlint-config/node';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [config],
	options: {
		typeAware: true,
		typeCheck: true,
	},
	overrides: [
		{
			files: ['packages/*/src/**/*.ts'],
			rules: {
				'node/no-sync': 'off',
			},
		},
	],
});
