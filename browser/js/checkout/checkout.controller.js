app.controller('CheckoutCtrl', function($scope, cart, CheckoutFactory) {
  $scope.cart = cart
  $scope.checkout = function () {
    return CartFactory.checkout($scope.cart);
  };

});
