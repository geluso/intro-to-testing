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
  driver.findElement(By.id('email')).sendKeys(result.email);
  driver.findElement(By.id('pass')).sendKeys(result.password);
  driver.findElement(By.id('loginbutton')).click();
});
