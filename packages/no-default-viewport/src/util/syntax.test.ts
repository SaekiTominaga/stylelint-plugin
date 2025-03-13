import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { getUnit } from './syntax.js';

const DEFAULT_VIEWPORT_PERCENTAGE_UNITS = ['vw', 'vh', 'vi', 'vb', 'vmin', 'vmax'];

await test('single value', async (t) => {
	await t.test('integer', () => {
		assert.equal(getUnit('10vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});

	await t.test('plus', () => {
		assert.equal(getUnit('+10vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});

	await t.test('minus', () => {
		assert.equal(getUnit('-10vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});

	await test('decimal', () => {
		assert.equal(getUnit('10.1vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});

	await test('dot start', () => {
		assert.equal(getUnit('-.1vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});

	await t.test('exponential', () => {
		assert.equal(getUnit('10e1vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});

	await t.test('exponential - minus', () => {
		assert.equal(getUnit('10E-4vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vi');
	});
});

await test('multi value', () => {
	assert.equal(getUnit(' 10xx 20vb 30vi ', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), 'vb');
});

await test('unit error', async (t) => {
	await t.test('undefined unit', () => {
		assert.equal(getUnit('10xx', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), undefined);
	});

	await t.test('no unit', () => {
		assert.equal(getUnit('0', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), undefined);
	});
});

await test('syntactic error', async (t) => {
	await t.test('whitespace', () => {
		assert.equal(getUnit('10 vi', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), undefined);
	});

	await t.test('no unit', () => {
		assert.equal(getUnit('10', DEFAULT_VIEWPORT_PERCENTAGE_UNITS), undefined);
	});
});
