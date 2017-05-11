var assert = require('assert');

describe("JavaScript Mathematics", function() {
  it("should add numbers correctly", function() {
    assert.equal(1 + 1, 2);
  });

  it("should multiply numbers correctly", function() {
    assert.equal(9 * 8, 72);
  });

  it("should calculate powers correctly", function() {
    assert.equal(Math.pow(3, 3), 27);
  });

  // 1 + 1 does not equal 99.
  // This test is designed to fail intentionally.
  it("should show us when tests fail", function() {
    assert.equal(1 + 1, 99);
  });
});
