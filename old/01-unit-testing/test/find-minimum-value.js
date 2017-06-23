var assert = require('assert');
var findMinimumValue = require('../find-min');

describe("Find minimum value", function() {
  it("should find min values in a small array", function() {
    var arr = [97];
    assert.equal(findMinimumValue(arr), 97);
  });
  
  it("should find min values at the front of an array.", function() {
    var arr = [1, 2, 2, 3, 3];
    assert.equal(findMinimumValue(arr), 1);
  });
  
  it("should find min values in the middle of an array.", function() {
    var arr = [2, 2, 1, 3, 3];
    assert.equal(findMinimumValue(arr), 1);
  });
  
  it("should find min values at the end of an array.", function() {
    var arr = [2, 2, 3, 3, 1];
    assert.equal(findMinimumValue(arr), 1);
  });
  
  it("should work for negative numbers.", function() {
    var arr = [0, 1, 34, 65, 43, 65, -2, 234];
    assert.equal(findMinimumValue(arr), -2);
  });
  
  it("should work for largely negative numbers.", function() {
    var arr = [0, 1, 34, 65, 43, 65, -999888, 234];
    assert.equal(findMinimumValue(arr), -999888);
  });
  
  it("should work for largely negative numbers in small arrays.", function() {
    var arr = [-999888];
    assert.equal(findMinimumValue(arr), -999888);
  });
  
  it("should return zero for an empty array.", function() {
    var arr = [];
    assert.equal(findMinimumValue(arr), 0);
  });
});
