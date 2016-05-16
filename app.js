(function() {
  'use strict';

angular
  .module('teaShop', ['ngRoute'])
  .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'order/order.html',
      controllerAs: 'order',
      controller: 'OrderController'
    })
    .when('/checkout/:diffTeas', {
      templateUrl: 'checkout/checkout.html',
      controllerAs: 'checkout',
      controller: 'CheckoutController'
    })
  };

})();
