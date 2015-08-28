(function() {
  angular
    .module('weather-widget')
    .directive('weatherWidget', weatherWidget);

  function weatherWidget(WeatherFactory) {
    return {
      restrict: 'EA',
      templateUrl: '../../partials/weather.html',
    }
  }
})();