app.factory('CheckoutFactory', function ($http) {
  var factory = {};

  factory.order = function (payment, cart, billingAddress) {
    return $http.post('/api/checkout', {payment: payment, cart: cart, billingAddress: billingAddress })
      .then(function (response) {
        var order = response.data;
        return order;
      });
    };

  return factory;
});
