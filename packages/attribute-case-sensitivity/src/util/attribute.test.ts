import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { isMatch } from './attribute.ts';

await test('isAttributeMatch', async (t) => {
	await t.test('string', () => {
		assert.equal(isMatch('foo', ['foo']), true);
		assert.equal(isMatch('foo', ['bar']), false);
	});

	await t.test('RegExp', () => {
		assert.equal(isMatch('foo', [/foo/v, 'bar']), true);
		assert.equal(isMatch('foo', [/bar/v, 'baz']), false);
	});
});
