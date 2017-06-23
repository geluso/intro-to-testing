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
  
  var password1, password2;
  var lengthRequirement;
  var submit;


  var lengthRequirement, matchRequirement;
  var otherRequirements;

  var upperCaseRequirement, lowerCaseRequirement,
      numbersRequirement, specialCharactersRequirement;
  
  before(function(done) {
    // load the website
    var url = "http://localhost:8000/password-form.html";
    url = "file:///Users/moonmayor/Lessons/testing/selenium-password-form/password-form.html";
    driver.get(url);
    password1 = driver.findElement(By.id("pass1"));
    password2 = driver.findElement(By.id("pass2"));

    lengthRequirement = driver.findElement(By.id("length-requirement"));
    matchRequirement = driver.findElement(By.id("password-match-error"));

    otherRequirements = driver.findElement(By.id("other-requirements"));

    upperCaseRequirement = driver.findElement(By.id("has-uppercase-error"));
    lowerCaseRequirement = driver.findElement(By.id("has-lowercase-error"));
    numbersRequirement = driver.findElement(By.id("has-numbers-error"));
    specialCharactersRequirement = driver.findElement(By.id("has-special-chars-error"));
    
    submit = driver.findElement(By.id("password-submit"));
    
    // clear the password boxes before each test.
    password1.clear().then(function() {
      return password2.clear();
    }).then(done);
  });
  
  after(function() {
    // quit the Selenium web driver
    driver.quit();
  });
  
  it("should have the submit button disabled when the page loads", function(done) {
    submit.getAttribute("disabled").then(function(val) {
      assert.equal(val, null);
      done();
    });
  });
  
  it("should show error if password is too short", function(done) {
    password1.sendKeys("short");
    lengthRequirement.getAttribute("class").then(function(val) {
      assert.equal(val, 'fail');
      done();
    });
  });
  
  it("should highlight no upper case letters error", function(done) {
    password1.sendKeys("badpassword");
    upperCaseRequirement.getAttribute("class").then(function(val) {
      assert.equal(val, 'fail');
      done();
    });
  });
  
  it("should highlight no lower case letters error", function(done) {
    password1.clear();
    password1.sendKeys("BADPASSWORD");
    lowerCaseRequirement.getAttribute("class").then(function(val) {
      assert.equal(val, 'fail');
      done();
    });
  });
  
  it("should highlight no number characters error", function(done) {
    password1.clear();
    password1.sendKeys("WeakPassword");
    numbersRequirement.getAttribute("class").then(function(val) {
      assert.equal(val, 'fail');
      done();
    });
  });
  
  it("should highlight no special characters error", function(done) {
    password1.clear();
    password1.sendKeys("MixedPassword42");
    specialCharactersRequirement.getAttribute("class").then(function(val) {
      assert.equal(val, 'fail');
      done();
    });
  });
  
  it("should highlight error is passwords don't match", function(done) {
    password1.clear();
    password2.clear();
    
    password1.sendKeys("HardPassword!40");
    password2.sendKeys("HardPassword!41");
    matchRequirement.getAttribute("class").then(function(val) {
      assert.equal(val, 'fail');
      done();
    });
  });
  
  it("should enable submit button if all requirements are satisfied", function(done) {
    password1.clear();
    password2.clear();
    
    password1.sendKeys("HardPassword!42");
    password2.sendKeys("HardPassword!42");
    // Refere to Selenium JS docs to see what val is returned
    // when reading the disabled attribute. Disabled is an HTML attribute
    // that doesn't have a value associated with it. It's either there, or
    // it's not. .getAttribute returns only either "true" or null.
    // Read the docs for WebElement.getAttribute:
    // http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html
    submit.getAttribute("disabled").then(function(val) {
      assert.equal(val, null);
      done();
    });
  });
});
