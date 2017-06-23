var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://facebook.com');

// require 'prompt' to avoid anyone mistakingly committing their facebook
// username or password.
var prompt = require('prompt');
var schema = [
  {name: 'email'},
  {name: 'password', hidden: true}
];
prompt.get(schema, function (err, result) {
  var email = result.email;
  var password = result.password;
  console.log("Email:", email);
  console.log("Your Selenium interactions here...");
});
