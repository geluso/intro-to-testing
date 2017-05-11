var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
driver.manage().timeouts().pageLoadTimeout(10000);

describe("Yahoo!", function() {
  // tell Mocha to wait up to 10 seconds before quitting.
  this.timeout(30000);

  it("should load the homepage and perform a search.", function(done) {
    driver.get('http://yahoo.com/');
    driver.findElement(By.id('uh-search-box')).sendKeys('selenium javascript web driver');
    driver.findElement(By.id('uh-search-button')).click();

    driver.wait(until.elementLocated(By.css('#web .first a'))).click();

    driver.sleep(10000).then(function() {
      done();
    });
  });
});
