var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('https://www.wikipedia.org/');

driver.findElement(By.id('searchInput')).sendKeys('javascript');
driver.findElement(By.id('search-form')).submit();
