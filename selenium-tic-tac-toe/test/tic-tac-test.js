var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe("Tic Tac Toe Site", function() {
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
    it("should start by saying just Tic Tac Toe.", function(done) {
      driver.findElement(By.id('top-message')).getText().then(function(txt) {
        var expected = "Tic Tac Toe";
        assert.equal(txt, expected);
      }).then(done);
    });
    
    it("should have an empty board.", function(done) {
      var foundNum = 0;
      for (var cell = 0; cell < 9; cell++) {
        var cellId = "cell" + cell;
        driver.findElement(By.id(cellId)).getText().then(function(txt) {
          assert.equal(txt, "_");
        }).then(function() {
          foundNum++;
          if (foundNum == 9) {
            done();
          }
        });
      }
    });
    
    it("should say it's X's turn.", function(done) {
      driver.findElement(By.id('winner')).getText().then(function(txt) {
        assert.equal(txt, "X's turn.");
      }).then(done);
    });
  });
  
  describe("clicking on squares", function() {
    it("clicking on first square places X.", function(done) {
      driver.findElement(By.id('cell0')).click();
      driver.findElement(By.id('cell0')).getText().then(function(txt) {
        assert.equal(txt, "X");
      }).then(done);
    });
    
    it("should say it's O's turn after placing first X.", function(done) {
      driver.findElement(By.id('winner')).getText().then(function(txt) {
        assert.equal(txt, "O's turn.");
      }).then(done);
    });
    
    it("should keep X if someone clicks first cell again.", function(done) {
      driver.findElement(By.id('cell0')).click()
      driver.findElement(By.id('cell0')).getText().then(function(txt) {
        assert.equal(txt, "X");
      }).then(done);
    });
    
    it("clicking on another square places O.", function(done) {
      driver.findElement(By.id('cell1')).click();
      driver.findElement(By.id('cell1')).getText().then(function(txt) {
        assert.equal(txt, "O");
      }).then(done);
    });
    
    it("should say it's X's turn again after placing first O.", function(done) {
      driver.findElement(By.id('winner')).getText().then(function(txt) {
        assert.equal(txt, "X's turn.");
      }).then(done);
    });
    
    it("should detect win condition", function(done) {
      driver.findElement(By.id('cell3')).click();
      driver.findElement(By.id('cell4')).click();
      driver.findElement(By.id('cell6')).click();
      driver.findElement(By.id('winner')).getText().then(function(txt) {
        assert.equal(txt, "X won!");
      }).then(done);
    });
    
    it("should prevent anyone from playing after win.", function(done) {
      driver.findElement(By.id('cell7')).click();
      driver.findElement(By.id('cell7')).getText().then(function(txt) {
        assert.equal(txt, "_");
      }).then(function() {
        return driver.findElement(By.id('winner')).getText();
      }).then(function(txt) {
        assert.equal(txt, "X won!");
      }).then(done);
    });
  });
});
