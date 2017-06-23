var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Temperature Conversion Site", function() {
  it("should convert from Fahrenheit to Celsius properly", function(done) {
  });

  it("should convert from Celsius to Fahrenheit to properly", function(done) {
  });

  it("should reset text to '' and 'Output' after pressing the clear button", function(done) {
  });
});
