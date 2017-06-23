class YearDate {
  constructor(month, day, year) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
  
  prettyPrint() {
    var suffix = "th";
    if (this.day % 10 === 1 && this.day !== 11) {
      suffix = "st";
    } else if (this.day % 10 === 2 && this.day !== 12) {
      suffix = "nd";
    } else if (this.day % 10 === 3 && this.day !== 13) {
      suffix = "rd";
    }
    
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var month = monthNames[this.month - 1];
    return `${month} ${this.day}${suffix}, ${this.year}`;
  }
  
  daysInMonth() {
    // January - 31 days
    // February - 28 days in a common year and 29 days in leap years
    // March - 31 days
    // April - 30 days
    // May - 31 days
    // June - 30 days
    // July - 31 days
    // August - 31 days
    // September - 30 days
    // October - 31 days
    // November - 30 days
    // December - 31 days
    if (this.month === 2 && this.year % 4 === 0) {
      return 29;
    }
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthDays[this.month - 1];
  }
  
  nextDay() {
    if (this.month === 12 && this.day === 31) {
      this.month = 1;
      this.day = 1;
      this.year++;
    } else if (this.day === this.daysInMonth()) {
      this.day = 1;
      this.month++;
    } else {
      this.day++;
    }
  }
  
  daysBetween(other) {
    // assume `this` is the smaller date until proved otherwise.
    var smallDate = this;
    var laterDate = other;
    
    var shouldSwap = false;
    if (laterDate.year < smallDate.year) {
      shouldSwap = true;
    } else if (laterDate.year == smallDate.year) {
      if (laterDate.month < smallDate.month) {
        shouldSwap = true;
      } else if (laterDate.month == smallDate.month) {
        if (laterDate.day <= smallDate.day) {
          shouldSwap = true;
        }
      }
    }
    
    if (shouldSwap) {
      smallDate = other;
      laterDate = this;
    }
    
    var days = 0;
    while (smallDate.day != laterDate.day || smallDate.month != laterDate.month || smallDate.year != laterDate.year) {
      smallDate.nextDay();
      days++;
    }
    
    return days;
  }
}

module.exports = YearDate;
