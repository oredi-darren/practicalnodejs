/**
 * Created by darren on 8/7/14.
 */
var assert = require('chai').assert;
var expected, current;

before(function () {
    expected = ['a','b','c'];
});

describe('String#split', function () {
    beforeEach(function () {
        current = 'a,b,c'.split(',');
    });

    it('should return an array', function () {
        assert(Array.isArray(current));
    });

    it('should return the same array', function () {
        assert.equal(expected.length, current.length, 'arrays should have equal length');
        for (var i = 0; i < expected.length; i++) {
            assert.equal(expected[i], current[i], i + ' element should be equal');

        }
    });
});