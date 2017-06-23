# Selenium Temperature Conversion Lab
Here's a lab with a website all set up all about temperature conversion. Let's
use Selenium and Mocha to make sure this site operates correctly.

## Setup
* Clone this repo
* `cd` into the repo directory
* Run `npm install` to install project dependencies
* Run `node index.js` to run the server
* Navigate to http://localhost:3000 to see the site we're working with
* Execute your tests with `mocha`

# Your Task
Complete the provided test file so Mocha and Selenium verify the website
behaves properly.

* Describe Temperature Conversion Site
  * it should convert from Fahrenheit to Celsius properly
  * it should convert from Celsius to Fahrenheit to properly
  * it should reset text to "" and "Output" after pressing the clear button

One clarification! When you press the "clear" button the text in the input looks
like it changes to say "Input." This is actually the value of the `placeholder`
attribute on the `<input>` element. If you try to use Selenium to look for
"Input" when nothing is in the box it will show up as an empty string, `""`.
Selenium and web browsers consider the `placeholder` value to be a different
thing than the text display in the input.

Your test should use `.getText()` on the search box and make sure the value is
an empty string.

# Solution
[Solution](test/temperature-conversion-test-solution.js)
