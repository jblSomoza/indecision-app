// sum.test.js
import { expect, test } from 'vitest'
import { sum, addArray } from '../../src/helpers/sum'
import { describe } from 'node:test';

describe('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        const a = 1;
        const b = 2;

        const result = sum(a, b);

        expect(result).toBe(a + b);
    });
});

describe('addArray', () => {
    test('should return 0 for empty array', () => {
        const arr = [];

        const result = addArray(arr);

        expect(result).toBe(0);
    });

    test('should return sum of array', () => {
        const arr = [1, 2, 3, 4, 5];

        const result = addArray(arr);

        expect(result).toBe(15);
    });
});