(function() {
  'use strict';

  angular
    .module('teaShop')
    .controller('CheckoutController', CheckoutController)

  function CheckoutController($routeParams, receipt, $location) {
    let vm = this;
    let finalPrice = [];
    let nearlyFinal = [];
    vm.diffTeas = $routeParams.diffTeas;
    console.log(vm.diffTeas);
    vm.orderedTea = receipt.orderedTea(vm.diffTeas);
    vm.amt = vm.orderedTea.howMany;
    vm.indx = vm.orderedTea.indx;
    receipt.teaBags(vm.indx, vm.amt).then(tdata => {
      vm.finalTea = tdata;
    });
    vm.change = function(amount, newIndex) {
      receipt.teaBags(vm.indx, vm.amt, amount, newIndex).then(tdata => {
        vm.finalTea = tdata;
      });
    };
    vm.delete = function (amount, newIndex) {
      vm.newTeas = receipt.deleteTea(vm.indx, vm.amt, amount, newIndex);
      $location.path(`/checkout/${ vm.newTeas }`);
        console.log('finalTea', vm.newTeas);
      };
  };

})();
