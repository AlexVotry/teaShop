(function() {
  'use strict';

  angular
    .module('teaShop')
    .controller('OrderController', OrderController);

  function OrderController(getTea, $location) {
    let vm = this;
    vm.qtyTotal = 0;
    vm.costs = ['higher', 'lower'];
    vm.qtys = getTea.qty;
    vm.addQty = function (amt, indx) {
      let teaInfo = getTea.addTea(vm.qtyTotal, amt, indx);
      vm.qtyTotal = teaInfo.total;
    }
    getTea.teaBags().then(tdata => {
      vm.teas = tdata;
    });
    getTea.teaCat().then(cdata => {
      vm.cats = cdata;
    });
    vm.advance= function() {
      $location.path(`/checkout`);
    };
  };

})();
