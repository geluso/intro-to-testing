var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("(Solution) Temperature Conversion Site", function() {
  before(function(done) {
    // load the website once for all the tests
    var port = 3000;
    driver.get('http://localhost:' + port).then(function() {
      done();
    });
  });
  
  after(function() {
    // shut down the Selenium web driver after all the tests.
    driver.quit();
  });

  it("should convert from Fahrenheit to Celsius properly", function(done) {
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).sendKeys('32');
    driver.findElement(By.id('F')).click();
    driver.findElement(By.id('submit')).click();
    driver.findElement(By.id('result')).click();
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "0.0 °C";
      assert.equal(txt, expected);
      done();
    });
  });

  it("should convert from Celsius to Fahrenheit to properly", function(done) {
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).sendKeys('100');
    driver.findElement(By.id('C')).click();
    driver.findElement(By.id('submit')).click();
    driver.findElement(By.id('result')).click();
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "212.0 °F";
      assert.equal(txt, expected);
      done();
    });
  });

  it("should reset text to '' and 'Output' after pressing the clear button", function(done) {
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).getText().then(function(txt) {
      var expected = "";
      assert.equal(txt, expected);
      driver.findElement(By.id('result')).getText().then(function(txt) {
        var expected = "Output";
        assert.equal(txt, expected);
        done();
      });
    });
  });
});
