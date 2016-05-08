app.controller('CheckoutCtrl', function($scope, $state, cart, stripe, CartFactory, CheckoutFactory) {
  $scope.cart = cart;
  $scope.subtotal = function() {
    return CartFactory.getSubtotal(cart);
  };

  $scope.charge = function () {
    var amount = $scope.subtotal();
    stripe.card.createToken($scope.payment.card)
    .then(function(response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      payment.amount = amount;
      console.log(payment);
      return CheckoutFactory.order(payment, cart);
    })
    .then(function (orderConfirmation) {
      // console.log('orderConfirmation in here!', orderConfirmation);
      // console.log('Charged Here. Successfully submitted payment for $', orderConfirmation.stripeCharge.amount);
      $state.go('orderConfirmationPage', {confirmation: orderConfirmation});

    })
    .catch(function (err) {
      if (err.type && /^Stripe/.test(err.type)) {
        console.log('Stripe error: ', err.message);
      } else {
        console.log('Other error occurred, possibly with API', err.message);
      }
    });
  };


});
