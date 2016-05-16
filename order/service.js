(function() {
  'use strict';

  angular
    .module('teaShop')
    .factory('getTea', getTea);

    function getTea($http) {
      let diffTeas = [];
      let allTeas = [];
      let shoppingCart = [];

      function teaBags() {
        return $http.get('../tea.json')
        .then( data => {
          allTeas = data.data;
          return allTeas;
        });
      };

      function teaCat() {
        return $http.get('../tea.json')
        .then( data => {
          let categories = data.data;
          let cat = [];
          let cats = [];

          for (var i = 1; i < categories.length; i++) {
            cat.push(categories[i].categories);
          }
          for (var i = 0; i < cat.length; i++) {
            for (var j = 0; j < cat[i].length; j++) {
              cats.push(cat[i][j])
            }
          }
          function uniq(a) {
            return a.sort().filter(function(item, pos, ary) {
              return !pos || item != ary[pos - 1];
            });
          }
          return uniq(cats);
        });
      }
      function addTea(total, qtys, indx) {
        if (!qtys) {
          qtys = 1;
        }
        shoppingCart.push({tea: allTeas[indx], qty: qtys});
        var teas = `${qtys},${indx}`;
        // var teas = { tea: id, howMany: qtys }
        // var temp = JSON.stringify(teas);
        diffTeas.push(teas);
        console.log(diffTeas);
        total += qtys;
        return {total: total, diffTeas: diffTeas}
      }
      return {
        qty: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        teaBags: teaBags,
        teaCat: teaCat,
        addTea: addTea,
        shoppingCart: shoppingCart
      }
    };


})();
