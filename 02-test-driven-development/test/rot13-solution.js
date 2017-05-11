var assert = require("assert");

function rot13(str) {
  var plain = "abcdefghijklmnopqrstuvwxyz";
  var other = "nopqrstuvwxyzabcdefghijklm";

  var result = "";
  for (var i = 0; i < str.length; i++) {
    var isUppercase = str[i] === str[i].toUpperCase();
    var lowercased = str[i].toLowerCase();
    
    // find where the letter appears in the plain alphabet
    var index = plain.indexOf(lowercased);
    
    if (index >= 0) {
      var newLetter = other[index];
      if (isUppercase) {
        newLetter = newLetter.toUpperCase();
      }
      
      // get the letter in the other alphabet and add that to the result.
      result += newLetter;
    } else {
      result += str[i];  
    }
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
  
  describe("preserving capitalization", function() {
    it("should convert A into N", function() {
      assert.equal("N", rot13("A"));
    });
    it("should convert N into A", function() {
      assert.equal("A", rot13("N"));
    });
    it("should convert Z into M", function() {
      assert.equal("M", rot13("Z"));
    });
    it("should convert M into Z", function() {
      assert.equal("Z", rot13("M"));
    });
    
    it("should convert 'hello' into 'uryyb'", function() {
      assert.equal("urYYB", rot13("heLLO"));
    });
    it("should convert 'uryyb' into 'hello'", function() {
      assert.equal("heLLO", rot13("urYYB"));
    });
  });
  
  describe("preserve whitespace and punctuation", function() {
    it("should ignore whitespace", function() {
      it("should convert 'hello' into 'uryyb'", function() {
        assert.equal(rot13("Today I went to the store"), "Gbqnl V jrag gb gur fgber");
      });
    });
    
    it("should ignore punctuation", function() {
        assert.equal(rot13("I'm telling you, \"go away!\" Can you hear me?"), "V'z gryyvat lbh, \"tb njnl!\" Pna lbh urne zr?");
    });
  });
});
