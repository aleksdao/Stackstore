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
  // ngToast.create({
  //   className: 'success',
  //   content: '<h2>Order Confirmed</h2>'
  // });//end ngToast.create
  //
  // $scope.confirmation = confirmation;
  // $scope.user;
  //  $scope.date = new Date();
  //  $scope.total;
  //
  // var setUser = function () {
  //     AuthService.getLoggedInUser().then(function (user) {
  //         $scope.user = user;
  //     });
  // };// end setUser
  // setUser();
  //
  // function getTotal () {
  //   var total = 0;
  //   for (var i = 0; i < confirmation.cart.lineItems.length; i++) {
  //     total += (confirmation.cart.lineItems[i].price * confirmation.cart.lineItems[i].quantity);
  //   }
  //    $scope.total = total;
  // }
  // getTotal();

});
