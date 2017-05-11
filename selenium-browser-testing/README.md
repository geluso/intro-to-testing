# Browser Testing with Selenium
We've seen Unit Testing, database testing, and API server testing. These
things are easy to test because we're using JavaScript to interact with
JavaScript. It's easy to write our own code to verify that our functions
are behaving as we expect. It's possible to write our own scripts to make
sure we're interacting with our database as we expect.

But what about UI testing? There's not an immediately easy way to verify
that when someone clicks on a button the appearance of a website reacts
according to specification. We'll need to learn another library, **Selenium**,
that allows us to interact with the browser and automate UI testing.

## Objectives
* Identify what we can automate with a UI testing framework like **Selenium**.
* Write tests to interact with a website.
* Study tests that click on buttons.
* Study tests that enter text and manipulate inputs.
* Study tests that verify the state of the page.
* Write a comprehensive test for a website

# Setting Up Selenium
**Selenium** is one library designed to automate many different web browsers.
**Selenium** requires additional programs in order to interact with different
browsers. We'll download one program that allows **Selenium** to specifically
interact with our Chrome Browser. If we wanted to have **Selenium** control
Firefox, Safari or Internet Explorer we would have to install additional
dependencies.

**Selenium** is not a testing framework. It's just used to control the browser.
We will still rely on **Mocha** to create tests and run test suites.
**Selenium** controls the browser. **Mocha** gives us ways to `describe` the
website and make sure `it` passes all of the `assert` statements we create.

Install `chromedriver` with npm and save it as a global module.

```
npm install -g chromedriver
```

Install the **Selenium** webdriver and **Mocha** testing framework and save them
as dev dependencies for your project.

```
npm install --save-dev selenium-webdriver
npm install --save-dev mocha
```

Now you're set up and ready to go!

# Using Selenium
In order to interact with our website with **Selenium** and test things with **Mocha**
we'll need to import everything we'll need.

```js
var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Temperature Conversion Site", function() {
  it("should convert from Fahrenheit to Celsius properly", function(done) {
    // load the website
    driver.get('http://google.com');

    driver.findElement(By.id('clear')).click();

    // get the result and see if it's what we expect
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "0.0 °C";
      assert.equals(txt, expected);
    }).finally(function() {
      // quit the Selenium web driver
      driver.quit();

      // let Mocha know the test is complete.
      done();
    });
  });
});
```
```js
var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Temperature Conversion Site", function() {
  it("should convert from Fahrenheit to Celsius properly", function(done) {
    // load the website
    driver.get('http://localhost:8000/');

    // clear input, put in your own input, click the submit button.
    driver.findElement(By.id('clear')).click();
    driver.findElement(By.id('degrees-number')).sendKeys('32');
    driver.findElement(By.id('F')).click();
    driver.findElement(By.id('submit')).click();

    // get the result and see if it's what we expect
    driver.findElement(By.id('result')).getText().then(function(txt) {
      var expected = "0.0 °C";
      assert.equals(txt, expected);
    }).finally(function() {
      // quit the Selenium web driver
      driver.quit();

      // let Mocha know the test is complete.
      done();
    });
  });
});
```
