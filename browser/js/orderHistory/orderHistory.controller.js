app.controller('orderHistoryCtrl', function($scope, $state, orders, user) {
  $scope.user = user;
  $scope.orders = orders;


  $scope.getTotal = function (order) {
    var total = 0;
    for (var i = 0; i < order.lineItems.length; i++) {
      total += (order.lineItems[i].price * order.lineItems[i].quantity);
    }
     return total;
  };

});
