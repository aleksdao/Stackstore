app.config(function ($stateProvider) {
  $stateProvider
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'js/checkout/checkout.html',
      controller: 'CheckoutCtrl',
      resolve: {
        cart: function (CartFactory) {
          return CartFactory.fetchCart();
        }
      }
    });
});
