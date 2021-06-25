import assert from 'assert';
import { flatten } from './flatten.js';

describe("Flatten method", function() {
    it("should return the same when an empty array is sent", function() {
        const array = [];
        const expected = [];
        assert.strictEqual(JSON.stringify(flatten(array)), JSON.stringify(expected), "The result is not expected");
    });

    it("should be able to flatten a simple nested array", function() {
        const array = [1, 2, [3, 4]];
        const expected = [1, 2, 3, 4];
        assert.strictEqual(JSON.stringify(flatten(array)), JSON.stringify(expected), "The result is not expected");
    });

    it("should be able to flatten a complex nested array", function() {
        const array = [1, 2, [3, 4], 5, [6, [7, 8, [9], [[]], [5,7,8]]]];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 7, 8];
        assert.strictEqual(JSON.stringify(flatten(array)), JSON.stringify(expected), "The result is not expected");
    });

    it("should throw an error when an element is neither a number nor an array of numbers", function() {
        const expected = "Error: Every element inside the array must be a number or an array of numbers";
        const array = ["string", 2];
        assert.strictEqual(flatten(array), expected, "The result is not expected");
    });

    it("should throw an error when the first parameter is not an array", function() {
        const expected = "Error: The first parameter must be an array"
        const array = "string";
        assert.strictEqual(flatten(array), expected, "The result is not expected");
    });
});
