var assert = require("assert");

function rot13(str) {
  var plain = "abcdefghijklmnopqrstuvwxyz";
  var other = "nopqrstuvwxyzabcdefghijklm";

  var result = "";
  for (var i = 0; i < str.length; i++) {
    // find where the letter appears in the plain alphabet
    var index = plain.indexOf(str[i]);
    // get the letter in the other alphabet and add that to the result.
    result += other[index];
  }

  return result;
}

describe("ROT13 tests", function() {
  describe("simple substitutions", function() {
    it("should convert A into N", function() {
      assert.equal("n", rot13("a"));
    });
    it("should convert N into A", function() {
      assert.equal("a", rot13("n"));
    });
    it("should convert Z into M", function() {
      assert.equal("m", rot13("z"));
    });
    it("should convert M into Z", function() {
      assert.equal("z", rot13("m"));
    });

    it("should convert 'hello' into 'uryyb'", function() {
      assert.equal("uryyb", rot13("hello"));
    });
    it("should convert 'uryyb' into 'hello'", function() {
      assert.equal("hello", rot13("uryyb"));
    });
  });
});
