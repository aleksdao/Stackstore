app.controller('CheckoutCtrl', function($scope, cart, CheckoutFactory) {
  $scope.cart = cart
  $scope.checkout = function () {
    return CartFactory.checkout($scope.cart)
      .then(function (order) {
          $scope.order = order;
          ngToast.create({
  					className: 'success',
  					content: 'Order successfully placed!'
  				});
      });
  };

});
