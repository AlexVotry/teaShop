(function() {
  'use strict';

  angular
    .module('teaShop')
    .factory('receipt', receipt);

  function receipt($http) {
    function teaTotals(total, allTeas) {
      for (var i = 0; i < allTeas.length; i++) {
        total += allTeas[i].qty * allTeas[i].price / 100
      }
      return total;
    };

    function teaBags(teas, newAmount, newIndex) {
      teas[newIndex].qty = newAmount;
    };
     function deleteTea(teas, newIndex ) {
       teas.splice(newIndex, 1);
       return teas;
     };

    return {
      teaBags: teaBags,
      teaTotals: teaTotals,
      deleteTea: deleteTea
    }
  };

})();
