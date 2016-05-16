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
    vm.addQty = function (amt, id, indx) {
      let teaInfo = getTea.addTea(vm.qtyTotal, amt, id, indx);
      vm.qtyTotal = teaInfo.total;
      vm.buyIt = teaInfo.diffTeas;
      console.log(getTea.shoppingCart);
    }
    getTea.teaCat().then(cdata => {
      vm.cats = cdata;
    });
    getTea.teaBags().then(tdata => {
      vm.teas = tdata;
    });
    vm.advance= function() {
      $location.path(`/checkout/${ vm.buyIt }`);
    };
  };

})();
