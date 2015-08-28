(function() {
  angular
    .module('weather-widget')
    .factory('WeatherFactory', WeatherFactory);

  function WeatherFactory($http, $q) {
    var factory = {};
    factory.rawConditions;
    factory.rawForecast;
    factory.conditions = {};
    factory.forecast = {};
    factory.showConditions = false;
    factory.showForecast = false;

    factory.getConditions = function() {
      var deferred = $q.defer();
      $http.get('http://api.wunderground.com/api/416ff8fce0c84725/conditions/q/IL/Chicago.json')
        .success(function(data){
          deferred.resolve(data);
          console.log(data);
          factory.rawConditions = data;
          extractDataForConditions();
          factory.showConditions = true;
        })
        .error(function(err){
          console.log('Error retrieving weather conditions');
          deferred.reject(err);
        });
      return deferred.promise;
    };

    factory.getForecast = function() {
      var deferred = $q.defer();
      $http.get('http://api.wunderground.com/api/416ff8fce0c84725/forecast/q/IL/Chicago.json')
        .success(function(data){
          deferred.resolve(data);
          console.log(data);
          factory.rawForecast = data;
          extractDataForForecast();
          factory.showForecast = true;
        })
        .error(function(err){
          console.log('Error retrieving weather conditions');
          deferred.reject(err);
        });
      return deferred.promise;
    };

    function extractDataForConditions() {
      getLocation();
      getCurrentTemp();
      getWeatherConditions();
      getImageForCurrent();
    }

    function getLocation() {
      var conditionsShortcut = factory.rawConditions.current_observation;
      factory.conditions["city"] = conditionsShortcut.display_location.city;
      factory.conditions["state"] = conditionsShortcut.display_location.state;
      factory.conditions["currentDate"] = conditionsShortcut.local_time_rfc822;
    }

    function getCurrentTemp() {
      var conditionsShortcut = factory.rawConditions.current_observation;
      factory.conditions["currentTemp"] = conditionsShortcut.temp_f;
    }

    function getWeatherConditions() {
      var conditionsShortcut = factory.rawConditions.current_observation;
      factory.conditions["feelsLike"] = Number(conditionsShortcut.feelslike_f);
      factory.conditions["currentWeatherDesc"] = conditionsShortcut.weather;
      factory.conditions["pressure"] = Number(conditionsShortcut.pressure_in);
      factory.conditions["visibility"] = Number(conditionsShortcut.visibility_mi);
      factory.conditions["heatIndex"] = conditionsShortcut.heat_index_f;
      factory.conditions["dewPoint"] = conditionsShortcut.dewpoint_f;
      factory.conditions["humidity"] = conditionsShortcut.relative_humidity;
      factory.conditions["wind"] = conditionsShortcut.wind_string;
    }

    function getImageForCurrent() {
      var conditionsShortcut = factory.rawConditions.current_observation;
      factory.conditions["imageURLCurrent"] = conditionsShortcut.icon_url;
    }

    // function extractDataForForecast() {
    //   var forecastShortcut = factory.rawForecast.forecast.simpleforecast.forecastday;
    //   for (var i=1; i<=factory.rawForecast.forecast.simpleforecast.forecastday.length; i++) {
    //     factory.forecast[i] = {};
    //     factory.forecast[i]["Date"] = forecastShortcut[i].date.month.toString() + "/" + forecastShortcut[i].date.day.toString();
    //     factory.forecast[i]["High"] = forecastShortcut[i].high.fahrenheit;
    //     factory.forecast[i]["Low"] = forecastShortcut[i].low.fahrenheit;
    //     factory.forecast[i]["Condition"] = forecastShortcut[i].conditions;
    //     factory.forecast[i]["imageURL"] = forecastShortcut[i].icon_url;
    //   }
    // }

    function extractDataForForecast() {
      for (var i=1; i<=3; i++) {
        forecastDay(i);
      }
    }

    function forecastDay(day) {
      var forecastShortcut = factory.rawForecast.forecast.simpleforecast.forecastday[day];
      switch(day) {
        case 1:
          factory.forecast["dayOneDate"] = forecastShortcut.date.month.toString() + "/" + forecastShortcut.date.day.toString();
          factory.forecast["dayOneHigh"] = forecastShortcut.high.fahrenheit;
          factory.forecast["dayOneLow"] = forecastShortcut.low.fahrenheit;
          factory.forecast["dayOneCondition"] = forecastShortcut.conditions;
          factory.forecast["imageURLDayOne"] = forecastShortcut.icon_url;
          break;
        case 2:
          factory.forecast["dayTwoDate"] = forecastShortcut.date.month.toString() + "/" + forecastShortcut.date.day.toString();
          factory.forecast["dayTwoHigh"] = forecastShortcut.high.fahrenheit;
          factory.forecast["dayTwoLow"] = forecastShortcut.low.fahrenheit;
          factory.forecast["dayTwoCondition"] = forecastShortcut.conditions;
          factory.forecast["imageURLDayTwo"] = forecastShortcut.icon_url;
          break;
        case 3:
          factory.forecast["dayThreeDate"] = forecastShortcut.date.month.toString() + "/" + forecastShortcut.date.day.toString();
          factory.forecast["dayThreeHigh"] = forecastShortcut.high.fahrenheit;
          factory.forecast["dayThreeLow"] = forecastShortcut.low.fahrenheit;
          factory.forecast["dayThreeCondition"] = forecastShortcut.conditions;
          factory.forecast["imageURLDayThree"] = forecastShortcut.icon_url;
          break;
      }
    }

    return factory;
  }
})();