var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('https://www.wikipedia.org/');

driver.findElement(By.id('searchInput')).sendKeys('javascript');
driver.findElement(By.id('search-form')).submit();

driver.findElement(By.linkText('Node.js')).click();
driver.findElement(By.linkText('Random article')).click();

for (var i = 0; i < 3; i++) {
  driver.findElement(By.linkText('Random article')).click();
  driver.findElement(By.id('firstHeading')).getText().then(function(txt) {
    console.log("Article:", txt);
  });
}

