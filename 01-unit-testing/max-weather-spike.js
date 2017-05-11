function maxWeatherSpike(weatherData) {
  var largestSpike = 0;
  for (var i = 0; i < weatherData.length; i++) {
    // calculate how much the temperature rose between this day and yesterday
    var dailyIncrease = weatherData[i] - weatherData[i - 1];
    
    // save the current dailyIncrease if it beats the previous largestSpike.
    if (dailyIncrease > largestSpike) {
      largestSpike = dailyIncrease;
    }
  }
  return largestSpike;
}

module.exports = maxWeatherSpike;
