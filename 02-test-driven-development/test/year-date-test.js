var assert = require("assert");
var YearDate = require('../code/year-date.js');

describe("YearDate", function() {
  describe("correctly reports days in month.", function() {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    it("January", function() {
      var day = new YearDate(1, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
    it("February (Not a Leap Year)", function() {
      var day = new YearDate(2, 1, 2001);
      assert.equal(day.daysInMonth(), 28);
    });
    it("February (During Leap Year)", function() {
      var day = new YearDate(2, 1, 2000);
      assert.equal(day.daysInMonth(), 29);
    });
    it("March", function() {
      var day = new YearDate(3, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
    it("April", function() {
      var day = new YearDate(4, 1, 2001);
      assert.equal(day.daysInMonth(), 30);
    });
    it("May", function() {
      var day = new YearDate(5, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
    it("June", function() {
      var day = new YearDate(6, 1, 2001);
      assert.equal(day.daysInMonth(), 30);
    });
    it("July", function() {
      var day = new YearDate(7, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
    it("August", function() {
      var day = new YearDate(8, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
    it("September", function() {
      var day = new YearDate(9, 1, 2001);
      assert.equal(day.daysInMonth(), 30);
    });
    it("October", function() {
      var day = new YearDate(10, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
    it("November", function() {
      var day = new YearDate(11, 1, 2001);
      assert.equal(day.daysInMonth(), 30);
    });
    it("December", function() {
      var day = new YearDate(12, 1, 2001);
      assert.equal(day.daysInMonth(), 31);
    });
  });
  
  describe("correctly rolls forward to next day.", function() {
    it("From Jan 1 to Jan 2", function() {
      var day = new YearDate(1, 1, 2001);
      day.nextDay();
      
      assert.equal(day.month, 1);
      assert.equal(day.day, 2);
      assert.equal(day.year, 2001);
    });
    
    it("From Feb 28 to March 1 (Non Leap Year)", function() {
      var day = new YearDate(2, 28, 2001);
      day.nextDay();
      
      assert.equal(day.month, 3);
      assert.equal(day.day, 1);
      assert.equal(day.year, 2001);
    });
    
    it("From Feb 28 to Feb 29 (During Leap Year)", function() {
      var day = new YearDate(2, 28, 2000);
      day.nextDay();
      
      assert.equal(day.month, 2);
      assert.equal(day.day, 29);
      assert.equal(day.year, 2000);
    });
    
    it("From Feb 29 to March 1 (During Leap Year)", function() {
      var day = new YearDate(2, 29, 2000);
      day.nextDay();
      
      assert.equal(day.month, 3);
      assert.equal(day.day, 1);
      assert.equal(day.year, 2000);
    });
    
    it("New Years Eve to New Years Day", function() {
      var day = new YearDate(12, 31, 1999);
      day.nextDay();
      
      assert.equal(day.month, 1);
      assert.equal(day.day, 1);
      assert.equal(day.year, 2000);
    });
  });
  
  describe("correctly calculates days between dates.", function() {
    it("Days between Jan 1 and Jan 1", function() {
      var jan1 = new YearDate(1, 1, 1999);
      var jan1 = new YearDate(1, 1, 1999);
      var days = jan1.daysBetween(jan1);
      assert.equal(days, 0);
    });
    
    it("Days between Jan 1 and Jan 2", function() {
      var jan1 = new YearDate(1, 1, 1999);
      var jan2 = new YearDate(1, 2, 1999);
      var days = jan1.daysBetween(jan2);
      assert.equal(days, 1);
    });
    
    it("Days between Jan 2 and Jan 1", function() {
      var jan1 = new YearDate(1, 1, 1999);
      var jan2 = new YearDate(1, 2, 1999);
      var days = jan2.daysBetween(jan1);
      assert.equal(days, 1);
    });
    
    it("Days between Jan 2 and Jan 30", function() {
      var jan02 = new YearDate(1, 02, 1999);
      var jan30 = new YearDate(1, 30, 1999);
      var days = jan02.daysBetween(jan30);
      assert.equal(days, 28);
    });
    
    it("Days between Jan 30 and Jan 2", function() {
      var jan30 = new YearDate(1, 30, 1999);
      var jan02 = new YearDate(1, 02, 1999);
      var days = jan30.daysBetween(jan02);
      assert.equal(days, 28);
    });
    
    it("Rolls over New Year's correctly", function() {
      var dec31 = new YearDate(12, 31, 2000);
      var jan01 = new YearDate(1, 1, 2001);
      var days = dec31.daysBetween(jan01);
      assert.equal(days, 1);
    });
    
    it("Rolls over New Year's correctly (reversed)", function() {
      var dec31 = new YearDate(12, 31, 2000);
      var jan01 = new YearDate(1, 1, 2001);
      var days = jan01.daysBetween(dec31);
      assert.equal(days, 1);
    });
    
    it("Rolls over one year correctly", function() {
      var jan2001 = new YearDate(1, 1, 2001);
      var jan2002 = new YearDate(1, 1, 2002);
      var days = jan2001.daysBetween(jan2002);
      assert.equal(days, 365);
    });
  });
});
