(function() {
  'use strict';

  angular
    .module('teaShop')
    .factory('getTea', getTea);

    function getTea($http, $q) {
      let diffTeas = [];
      let allTeas = [];
      let shoppingCart = [];

      function teaBags() {
        if (!allTeas.length) {
          return $http.get('../tea.json')
          .then( data => {
            allTeas = data.data;
            return allTeas;
          });
        } else {
          return $q((resolve, reject)=> {
            resolve(allTeas); 
          });
        }
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
        allTeas[indx].qty = qtys;
        shoppingCart.push(allTeas[indx]);

        total += qtys;
        return { total: total, diffTeas: shoppingCart }
      }

      function getShoppingCart() {
        return shoppingCart;
      }

      return {
        qty: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        teaBags: teaBags,
        teaCat: teaCat,
        addTea: addTea,
        getShoppingCart: getShoppingCart
      }
    };


})();
