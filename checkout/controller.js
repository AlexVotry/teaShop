(function() {
  'use strict';

  angular
    .module('teaShop')
    .controller('CheckoutController', CheckoutController)

  function CheckoutController($routeParams, getTea, receipt, $location) {
    let vm = this;
    vm.finalTea = getTea.getShoppingCart();
    vm.total = receipt.teaTotals(0, vm.finalTea);
    vm.change = function(amount, newIndex) {
      receipt.teaBags(vm.finalTea, amount, newIndex);
      vm.total = receipt.teaTotals(0, vm.finalTea);
    };
    vm.delete = function (amount, newIndex) {
      let currentTea = vm.finalTea;
      vm.finalTea = receipt.deleteTea(currentTea);
      vm.total = receipt.teaTotals(0, vm.finalTea);
      };
  };

})();
