# Selenium Browser Testing
Here's an example repo where we can see how to use Selenium to test websites.
The website is a simple temperature converter. Users can enter a temperature,
select whether their converting to Fahrenheit or to Celsius and see the converted
temperature. The website has a slider users can grab to scale the temperature up
or down to see how it varies. The temperature uses color to indicate whether a
temperature is cold, medium or hot.

```
npm install selenium-webdriver
```

```
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
```

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
