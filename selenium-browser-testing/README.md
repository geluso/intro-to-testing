# Browser Testing with Selenium

## Objectives
* Identify what we can automate with a UI testing framework like **Selenium**.
* Write tests to interact with a website.
* Study tests that click on buttons.
* Study tests that enter text and manipulate inputs.
* Study tests that verify the state of the page.
* Write a comprehensive test for a website

We've seen Unit Testing, database testing, and API server testing. These
things are easy to test because we're using JavaScript to interact with
JavaScript. It's easy to write our own code to verify that our functions
are behaving as we expect. It's possible to write our own scripts to make
sure we're interacting with our database as we expect.

But what about UI testing? There's not an immediately easy way to verify
that when someone clicks on a button the appearance of a website reacts
according to specification. We'll need to learn another library, **Selenium**,
that allows us to interact with the browser and automate UI testing.

The **Selenium** library allows us to literally boot up it's browser and
interact with the browser programatically. It allows us to write code to
do basic things like this automatically:

* Load a website at a URL
* Find elements by their id, CSS class names, HTML tags name or a few other ways.
* Click on elements that have been found on the page.
* Insert text for elements that can accept text (like `<input>`, `<textarea>`)
* Get the value of text inside an element on the page

Using combinations of these basic features (and more!) we're able to write
comprehensive tests for our website:

* We can make sure users can type their username, password and login.
* We can make sure proper error messages appear when people type in wrong
  information.
* We can make sure our webpage displays the correct information, like making
  sure the cash total in a shopping cart matches items in the cart and updates
  properly when items are added or removed.
* All sorts of things!

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

# Importing Selenium
In order to interact with our website with **Selenium** and test things with
**Mocha** we'll need to import everything we'll need. Here's what all the
imports look like at a glance:

```js
var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
```

The program imports `assert` as per our usual **Unit Tests**. The `assert`
function is used to verify that values in our program are exactly what we
expect them to be.

**Selenium** brings in several functions.

* The `webdriver` is the **Selenium** interface for interacting with browsers.
  It has some configuration methods that turn it into the `driver` varaible,
  specifically configured to drive the Chrome web browser.
* `By` is a collection of functions that help us locate elements on the web page
  inside the browser. We'll be able to find elements specified by their id,
  CSS class name, HTML tag name, and more ways using things like `By.id('login-button')`,
  `By.tagName('button')` and so forth.
* `until` is a function that helps us tell the driver to wait for certain things
  until it tries to control the browser. Since webpages take some time to load,
  and they take time to react to user interaction it's necessary to be able to
  tell **Selenium** to wait until certain things are ready.
  
# Using Selenium
Once you have imports set up it's time to tie **Mocha** and **Selenium**
together. Let's try to test a temperature conversion website. The site
allows users to type in a temperature, select whether to convert from Fahrenheit
or Celcius, and shows users the converted temperature after they click to see
the result.

We're going to write a test to `describe()` how the Temperature Conversion Site
should behave. First we'll test that `it()` should convert from Fahrenheit to
Celsius properly. In order to achieve this test we'll use some basic
**Selenium** features.

Here's the website we're testing: https://tommy-lim.github.io/temperature-converter-dom/

And here's what the code looks like at a glance. Read through and see if you
can get a feel for how **Mocha** and **Selenium** work together to control
the browser and assert certain things. In-depth explanations about the code
appear below the code sample.

```js
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
      assert.equals(txt, expected);
    }).finally(done);
  });
});
```

Two things to notice right off the bat are the intial call to `this.timeout(30000)`
and the overall structure of the test program.

### Increasing the Mocha Test Timeout
`this.timeout(30000)` configures **Mocha** to wait for up to 30 seconds to let
each test finish. **Mocha** normally only waits two seconds for tests to finish.
Web pages may take more than two seconds to load in the first place, so we crank
up the timeout to give the test ample time to finish. Any test that does not
call the `done()` function and complete in under 30 seconds will fail.

### Test Program Structure
Notice the overall structure of the rest program:

```
import statements
describe what we're testing
  increate the timeout for everything we're testing here.
  
  before
  after
  
  it should...
  it should...
  it should...
```

The `before()` function is a function that runs once before all of the tests.
In this case we use the `driver` to load the webpage we're testing just once.
It's better to load the webpage once than to reload it for every test.

The `after()` function is run just once once all the tests are complete. In this
case we tell the `driver` to quit the browser it started up.

### Selenium Specifics
There's bits of **Selenium**-specific code in the test. Anything that uses the
`driver` variable is using the **Selenium** web driver to control the browser.
Here's what each of the `driver` methods do in detail:

* `driver.get(url)` loads the given `url` in the browser.
* `driver.findElement(selector)` get a reference to an element on the page
  using one of the following selectors:
  * `By.id('clear')` - find an element by it's Id.
  * `By.className('nav-link')` find an element by it's CSS class name.
  * `By.tagName('button')` find an element by it's HTML tag.
* `.click()` allows us to click an element that's been found by the driver.
* `.sendText('the quick brown fox')` allows us to insert text in something like
  an `<input>` element so we can fill out forms and enter text when testing pages.
* `.getText()` returns a `.then(function(txt) {})` promise that lets us
  test the text inside of an element.

We can use those basic features to build up simple tests. Here's the outline
of the steps we'll take for our first test:

* Load the Temperature Convertor website by a URL
* Click the clear button to clear out all text.
* Find the input element where we can type in a temperature.
* Type in the temperature we want to convert.
* Click a button to select which type of temperature unit we're using.
* Click the convert button.
* Find the element containing the converted result.
* Check the text of the element with the converted result and make sure it's
  what we expect!

# Exercise: Add Another Temperature Test
Add another test to the suite by adding another `it()` function. This test should
test Celsius to Fahrenheit conversion. Write a test to make sure `100` degress
Celsius is equal to `212` degrees Fahrenheit.

# More Selenium Features
**Selenium** offers many ways for programmers to interact with the browser.
Download this cheatsheet and see a brief summary of what all it has to offer.

[Download Selenium Cheatsheet](assets/selenium-cheatsheet.pdf)

Here's a full list of everything you can do when you get a reference to an HTML
element on a webpage. Read about the details of each method on the official
[Selenium WebElement API Documentation](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html).

```js
var el = driver.findElement(By.id('foo'));
el.clear()
el.click()
el.findElement( locator )
el.findElements( locator )
el.getAttribute( attributeName )
el.getCssValue( cssStyleProperty )
el.getDriver()
el.getId()
el.getLocation()
el.getSize()
el.getTagName()
el.getText()
el.isDisplayed()
el.isEnabled()
el.isSelected()
el.sendKeys( ...var_args )
el.submit()
el.takeScreenshot( opt_scroll )
```

# Exercise: Test Hot/Cold Red/Blue Result Background Color
Use the methods above to write a new test that makes sure the temperature website
changes the background color of the result area to be Red/Blue or gray according
to how hot or cold the temperature is.

# Solution: Test Hot/Cold Red/Blue Result Background Color
One solution is to use the `el.getAttribute()` method to read the `class`
attribute of the `result` element. This method returns a `.then()` promise
that passes a parameter with the value of the attribute you ask for.

Review this code to see how the test tests to make sure the proper class name
is set on the element after performing a temperature conversion:

```js
it("should show red for hot temperatures", function(done) {
  // clear input, put in your own input, click the submit button.
  driver.findElement(By.id('clear')).click();
  driver.findElement(By.id('degrees-number')).sendKeys('213');
  driver.findElement(By.id('F')).click();
  driver.findElement(By.id('submit')).click();

  // get the result and see if it's what we expect
  driver.findElement(By.id('result')).getAttribute('class').then(function(className) {
    assert.equal(className, "hot");
  }).finally(done);
});
```
