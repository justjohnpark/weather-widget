(function() {
  angular
    .module('weather-widget')
    .controller('mainController', mainController);

  function mainController(WeatherFactory) {
    vm = this;
    vm.WeatherFactory = WeatherFactory;

    WeatherFactory.getConditions().then(function() {
      WeatherFactory.getForecast();
    });
  }
})();