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
    }

    function getCurrentTemp() {
    }

    function getWeatherConditions() {
    }

    return factory;
  }
})();