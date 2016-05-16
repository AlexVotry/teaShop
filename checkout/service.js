(function() {
  'use strict';

  angular
    .module('teaShop')
    .factory('receipt', receipt);

  function receipt($http) {

    function orderedTea(string) {
      let teaId = [];
      let howMany = [];
      let indx = [];
      let finalTea = {};
      let sepearateTeas = string.split(',');  // separate into separate strings
      let len = sepearateTeas.length;
      for (var i = 0; i < len;) {
        howMany.push(sepearateTeas[i]);
        indx.push(sepearateTeas[i + 1]);
        i += 2;
      };
      finalTea = { howMany, indx };
      return finalTea;
    };

    function teaBags(indx, amt, newAmount, newIndex) {
      let nearlyFinal = [];
      let total = 0;
      return $http.get('../tea.json')
      .then( data => {
          for (var i = 0; i < indx.length; i++) {
            data.data[indx[i]].amt = amt[i];
            nearlyFinal.push(data.data[indx[i]]);
            total += ( nearlyFinal[i].price * nearlyFinal[i].amt/100 );
          }
          if (newAmount || newAmount == 0) {
            console.log('newAmount');
            data.data[indx[newIndex]].amt = newAmount;
            total = 0;
            for (var i = 0; i < indx.length; i++) {
              total += ( nearlyFinal[i].price * nearlyFinal[i].amt/100 );
            }
          }
          nearlyFinal[0].total = total;
        return nearlyFinal;
      });
    };

    function deleteTea (indx, amt, newAmount, newIndex) {
      console.log(indx, amt, newAmount, newIndex);
      let newIndx = [];
      let newAmt = [];
      let newFinal = [];
      newIndx = indx.split(',');
      newIndx.splice(newIndex, 1);
      indx = newIndx.join('');
      console.log('newI', indx);
      newAmt = amt.slice(newIndex, 1);
      console.log('newA', newAmt);
      newFinal = newAmt.concat(newIndx);
      console.log('data', newFinal);
        return newFinal;
    };
    return {
      teaBags: teaBags,
      orderedTea: orderedTea,
      deleteTea: deleteTea
    }
  };

})();
