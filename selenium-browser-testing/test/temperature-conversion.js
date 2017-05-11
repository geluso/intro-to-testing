var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Temperature Conversion Site", function() {
  // configure Mocha to wait up to 30 seconds for the test to finish.
  // Mocha only waits 2 seconds by default, and web pages take time to load.
  this.timeout(30000);
  
  before(function() {
    // load the website
    var url = "https://tommy-lim.github.io/temperature-converter-dom/";
    driver.get(url);
  });
  
  after(function() {
    // quit the Selenium web driver
    driver.quit();
  });
  
  it("should convert from Fahrenheit to Celsius properly", function(done) {
    // clear input, put in your own input, click the submit button.
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).sendKeys('32');
    driver.findElement(By.id('F')).click();
    driver.findElement(By.id('submit')).click();

    // get the result and see if it's what we expect
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "0.0 °C";
      assert.equal(txt, expected);
    }).finally(done);
  });
  
  it("should convert from Fahrenheit to Celsius properly", function(done) {
    // clear input, put in your own input, click the submit button.
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).sendKeys('100');
    driver.findElement(By.id('C')).click();
    driver.findElement(By.id('submit')).click();

    // get the result and see if it's what we expect
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "212.0 °F";
      assert.equal(txt, expected);
    }).finally(done);
  });
});
