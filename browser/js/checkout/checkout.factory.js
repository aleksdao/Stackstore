app.factory('CheckoutFactory', function ($http) {
  var factory = {};

  factory.order = function (payment, cart) {
    return $http.post('/api/checkout', {payment: payment, cart: cart})
      .then(function (response) {
        var order = response.data;
        return order;
      });
    };

  return factory;
});
