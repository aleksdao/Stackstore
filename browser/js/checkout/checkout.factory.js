app.factory('CheckoutFactory', function ($http) {
  var factory = {};

  factory.checkout = function (cart) {
    return $http.post('/api/checkout', cart)
      .then(function (response) {
        var order = response.data;
        return order;
      });
    };

  return factory;
});
