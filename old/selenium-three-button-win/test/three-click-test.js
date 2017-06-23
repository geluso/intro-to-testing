var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Three Button Game Site", function() {
  before(function(done) {
    // load the website once for all the tests
    driver.get('http://localhost:8000').then(function() {
      done();
    });
  });
  
  
  after(function() {
    // shut down the Selenium web driver after all the tests.
    driver.quit();
  });
  
  describe("initial state", function() {
    it("should have the top message say: Three Button Game.", function(done) {
      driver.findElement(By.id('top-message')).getText().then(function(txt) {
        var expected = "Three Button Game";
        assert.equal(txt, expected);
      }).then(done);
    });
    
    it("should have the bottom message say: Click those buttons!", function(done) {
      driver.findElement(By.id('winner')).getText().then(function(txt) {
        var expected = "Click those buttons!";
        assert.equal(txt, expected);
      }).then(done);
    });
    
    it("each button should say click me", function(done) {
      var foundNum = 0;
      for (var i = 1; i <= 3; i++) {
        var buttonId = "button" + i;
        driver.findElement(By.id(buttonId)).getText().then(function(txt) {
          assert.equal(txt, "click me");
        }).then(function() {
          foundNum++;
          if (foundNum == 3) {
            done();
          }
        });
      }
    });
  });
  
  describe("button clicking", function() {
    it("should not win if one button is clicked", function(done) {
      driver.findElement(By.id('button1')).click();
      driver.findElement(By.id('button1')).getText().then(function(txt) {
        assert.equal(txt, "clicked");
      });
      driver.findElement(By.id('winner')).getText().then(function(txt) {
        assert.equal(txt, "Click those buttons!");
      }).then(done);
    });
    
    it("should display 'clicked' for all buttons", function(done) {
      for (var i = 1; i <= 3; i++) {
        var id = 'button' + i;
        driver.findElement(By.id(id)).click();
        driver.findElement(By.id(id)).getText().then(function(txt) {
          assert.equal(txt, "clicked");
        }).then(function() {
          done();
        });
      }
      // driver.findElement(By.id('winner')).getText().then(function(txt) {
      //   assert.equal(txt, "You win!");
      // }).then(done);
    });
    
    // it("should win if all three buttons are clicked", function(done) {
    //   driver.findElement(By.id('button1')).click();
    //   driver.findElement(By.id('button1')).getText().then(function(txt) {
    //     assert.equal(txt, "clicked");
    //   });
    //   driver.findElement(By.id('button2')).click();
    //   driver.findElement(By.id('button2')).getText().then(function(txt) {
    //     assert.equal(txt, "clicked");
    //   });
    //   driver.findElement(By.id('button3')).click();
    //   driver.findElement(By.id('button3')).getText().then(function(txt) {
    //     assert.equal(txt, "clicked");
    //   });
    //   driver.findElement(By.id('winner')).getText().then(function(txt) {
    //     assert.equal(txt, "You win!");
    //   }).then(done);
    // });
  });
});
