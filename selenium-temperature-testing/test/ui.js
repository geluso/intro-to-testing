var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Temperature Conversion Site", function() {
  it("should convert from Fahrenheit to Celsius properly", function(done) {
    driver.get('http://localhost:8000/');
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).sendKeys('32');
    driver.findElement(By.id('F')).click();
    driver.findElement(By.id('submit')).click();
    driver.findElement(By.id('result')).click();
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "0.0 °C";
      assert.equals(txt, expected);
    }).finally(function() {
      driver.quit();
      done();
    });
  });
});
